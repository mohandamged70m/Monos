'use client';

import { useState } from 'react';
import { ScrollView, StatusBar, View, StyleSheet, Text, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import HeroCard from '@/components/home/HeroCard';
import AIInsightsCard from '@/components/home/AIInsightsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import TransactionsList from '@/components/home/TransactionsList';
import TransactionForm from '@/components/home/TransactionForm';
import { useTransactions } from '@/context/TransactionsContext';

export default function HomeScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();
  const [showAddForm, setShowAddForm] = useState(false);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <>
          <HeroCard />
          <View style={styles.section}>
            <AIInsightsCard
              insight="Food delivery up 3x vs last week — mostly Thursday nights."
              trendMultiplier={3}
              amount={340}
              category="Food"
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
            <TransactionsList transactions={recentTransactions} />
          </View>
          <View style={{ paddingBottom: 100 }} />
        </>
      </ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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