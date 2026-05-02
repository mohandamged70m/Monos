'use client';

import { useMemo, useState } from 'react';
import { ScrollView, StatusBar, View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeroCard from '@/components/home/HeroCard';
import AIInsightsCard from '@/components/home/AIInsightsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import TransactionsList from '@/components/home/TransactionsList';
import TransactionForm from '@/components/home/TransactionForm';
import { useTransactions } from '@/context/TransactionsContext';
import { useBills } from '@/context/BillsContext';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { transactions, loading: txLoading } = useTransactions();
  const { subscriptions, loading: billsLoading } = useBills();
  const [showAddForm, setShowAddForm] = useState(false);
  const recentTransactions = transactions.slice(0, 5);

  const heroData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const monthTx = transactions.filter(tx => {
      if (!tx.date) return false;
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const prevMonthTx = transactions.filter(tx => {
      if (!tx.date) return false;
      const d = new Date(tx.date);
      return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
    });

    const income = monthTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const spent = monthTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    const prevSpent = prevMonthTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    const balance = income - spent;
    const prevBalance = prevMonthTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0) - prevSpent;

    const activeSubs = subscriptions.filter(s => s.status === 'active').length;

    return {
      month: `${MONTH_NAMES[currentMonth]} ${currentYear} ↓`,
      balance,
      previousBalance: prevBalance,
      income,
      spent,
      subscriptionsCount: activeSubs,
    };
  }, [transactions, subscriptions]);

  const aiInsight = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const categoryThisMonth: Record<string, number> = {};
    const categoryPrevMonth: Record<string, number> = {};

    transactions.forEach(tx => {
      if (!tx.date || tx.type !== 'expense') return;
      const d = new Date(tx.date);
      const key = tx.category;
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        categoryThisMonth[key] = (categoryThisMonth[key] || 0) + tx.amount;
      }
      if (d.getMonth() === prevMonth && d.getFullYear() === prevYear) {
        categoryPrevMonth[key] = (categoryPrevMonth[key] || 0) + tx.amount;
      }
    });

    let topCategory = '';
    let multiplier = 0;
    let amount = 0;

    for (const [cat, thisMonthVal] of Object.entries(categoryThisMonth)) {
      const prevVal = categoryPrevMonth[cat] || 0;
      if (prevVal > 0) {
        const ratio = thisMonthVal / prevVal;
        if (ratio > multiplier) {
          multiplier = ratio;
          topCategory = cat;
          amount = thisMonthVal;
        }
      } else if (thisMonthVal > 0 && multiplier === 0) {
        multiplier = 1;
        topCategory = cat;
        amount = thisMonthVal;
      }
    }

    if (topCategory && multiplier > 1.5) {
      return {
        insight: `${topCategory} spending up ${multiplier.toFixed(1)}x vs last month — totaling EGP ${amount}.`,
        trendMultiplier: multiplier,
        amount,
        category: topCategory,
      };
    }

    if (topCategory) {
      return {
        insight: `Your top category this month is ${topCategory} at EGP ${amount}.`,
        trendMultiplier: 1,
        amount,
        category: topCategory,
      };
    }

    return {
      insight: 'Start tracking transactions to get personalized insights.',
      trendMultiplier: 0,
      amount: 0,
      category: 'General',
    };
  }, [transactions]);

  const loadingData = txLoading || billsLoading;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <HeroCard data={heroData} />
          <View style={styles.section}>
            <AIInsightsCard
              insight={aiInsight.insight}
              trendMultiplier={aiInsight.trendMultiplier}
              amount={aiInsight.amount}
              category={aiInsight.category}
            />
          </View>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => router.push('/transactions/see-all')} style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>See All</Text>
                <Text style={[styles.viewAllText, { marginLeft: 4 }]}>→</Text>
              </TouchableOpacity>
            </View>
            {loadingData ? (
              <ActivityIndicator size="small" color={theme.colors.accent} style={{ paddingVertical: 20 }} />
            ) : (
              <TransactionsList transactions={recentTransactions} />
            )}
          </View>
          <View style={{ paddingBottom: 120 }} />
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity style={styles.fab} onPress={() => setShowAddForm(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddForm(false)}
      >
        <SafeAreaView edges={['top']} style={styles.modalContainer}>
          <TransactionForm onSave={() => setShowAddForm(false)} onCancel={() => setShowAddForm(false)} />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    paddingHorizontal: 4,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 120,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
