import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTransactions } from '@/context/TransactionsContext';
import { theme } from '@/constants/theme';

import InsightsHeader from '@/components/insights/InsightsHeader';
import SpendingHeroCard from '@/components/insights/SpendingHeroCard';
import SmartInsightCard from '@/components/insights/SmartInsightCard';
import DailySpendingChart from '@/components/insights/DailySpendingChart';
import CategoryBreakdown from '@/components/insights/CategoryBreakdown';
import TopExpensesList from '@/components/insights/TopExpensesList';
import ComparisonGrid from '@/components/insights/ComparisonGrid';
import SpendingTrendCard from '@/components/insights/SpendingTrendCard';
import SavingsRateCard from '@/components/insights/SavingsRateCard';
import PeriodComparisonCard from '@/components/insights/PeriodComparisonCard';
import StatBoxes from '@/components/insights/StatBoxes';
import DayOfWeekChart from '@/components/insights/DayOfWeekChart';
import MonthlyHeatmap from '@/components/insights/MonthlyHeatmap';
import CategoryDeepDive from '@/components/insights/CategoryDeepDive';

type TabType = 'overview' | 'trends' | 'details';

const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: '#F472B6',
  Food: '#FACC15',
  Transport: '#60A5FA',
  Grocery: '#34D399',
  Shopping: '#22C55E',
  Subscriptions: '#A78BFA',
  default: '#8B5CF6',
};

const CATEGORY_ICONS: Record<string, string> = {
  Entertainment: '🎬',
  Food: '🍔',
  Transport: '🚌',
  Grocery: '🛒',
  Shopping: '🛍️',
  Subscriptions: '📱',
  default: '💳',
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function InsightsPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>('overview');
  const { transactions } = useTransactions();

  const expenses = transactions.filter(tx => tx.type === 'expense');
  const incomeTransactions = transactions.filter(tx => tx.type === 'income');

  const analytics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthExpenses = expenses.filter(tx => {
      if (!tx.date) return false;
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalSpent = monthExpenses.reduce((sum, tx) => sum + tx.amount, 0);
    const dailyAvg = daysInMonth > 0 ? Math.round(totalSpent / daysInMonth) : 0;
    const highest = Math.max(...monthExpenses.map(tx => tx.amount), 0);
    const transactionCount = monthExpenses.length;
    const avgPerTransaction = transactionCount > 0 ? Math.round(totalSpent / transactionCount) : 0;

    const categoryMap = monthExpenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.entries(categoryMap).map(([name, amount]) => ({
      name,
      amount,
      percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
      color: CATEGORY_COLORS[name] || CATEGORY_COLORS.default,
      icon: CATEGORY_ICONS[name] || CATEGORY_ICONS.default,
    })).sort((a, b) => b.amount - a.amount);

    const topExpenses = [...monthExpenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4)
      .map((tx, i) => ({
        rank: i + 1,
        merchant: tx.merchant,
        category: tx.category,
        categoryIcon: CATEGORY_ICONS[tx.category] || CATEGORY_ICONS.default,
        amount: tx.amount,
        transactions: 1,
        percentage: totalSpent > 0 ? Math.round((tx.amount / totalSpent) * 100) : 0,
        color: CATEGORY_COLORS[tx.category] || CATEGORY_COLORS.default,
      }));

    const dailySpendingByDay: Record<number, number> = {};
    monthExpenses.forEach(tx => {
      if (!tx.date) return;
      const d = new Date(tx.date);
      const day = d.getDate();
      dailySpendingByDay[day] = (dailySpendingByDay[day] || 0) + tx.amount;
    });

    const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const amount = dailySpendingByDay[day] || 0;
      let type: 'normal' | 'spike' | 'highlight' = amount === 0 ? 'normal' : 'normal';
      if (amount > dailyAvg * 2) type = 'spike';
      if (amount > dailyAvg * 3) type = 'highlight';
      return { day, amount, type };
    });

    const monthlyHeatmapData = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      amount: dailySpendingByDay[i + 1] || 0,
      isSpike: (dailySpendingByDay[i + 1] || 0) > dailyAvg * 2,
    }));

    const monthlyTrendData: { month: string; income: number; expenses: number; isCurrentMonth?: boolean }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      const m = d.getMonth();
      const y = d.getFullYear();
      const monthExp = expenses.filter(tx => {
        if (!tx.date) return false;
        const td = new Date(tx.date);
        return td.getMonth() === m && td.getFullYear() === y;
      }).reduce((sum, tx) => sum + tx.amount, 0);
      const monthInc = incomeTransactions.filter(tx => {
        if (!tx.date) return false;
        const td = new Date(tx.date);
        return td.getMonth() === m && td.getFullYear() === y;
      }).reduce((sum, tx) => sum + tx.amount, 0);
      monthlyTrendData.push({
        month: MONTH_NAMES[m],
        income: monthInc,
        expenses: monthExp,
        isCurrentMonth: i === 0,
      });
    }

    const periodComparisonData = monthlyTrendData.map(t => ({
      month: t.month,
      amount: t.expenses,
      isCurrentMonth: t.isCurrentMonth,
    }));

    const dayOfWeekTotals: Record<number, number> = {};
    expenses.forEach(tx => {
      if (!tx.date) return;
      const d = new Date(tx.date);
      const dayOfWeek = d.getDay();
      dayOfWeekTotals[dayOfWeek] = (dayOfWeekTotals[dayOfWeek] || 0) + tx.amount;
    });

    const dayOfWeekData = DAY_NAMES.map((day, idx) => ({
      day,
      amount: dayOfWeekTotals[idx] || 0,
    }));

    return {
      totalSpent,
      dailyAvg,
      highest,
      categories,
      topExpenses,
      dailyData,
      transactionCount,
      avgPerTransaction,
      categoriesCount: categories.length,
      monthlyHeatmapData,
      monthlyTrendData,
      periodComparisonData,
      dayOfWeekData,
    };
  }, [expenses, incomeTransactions]);

  const totalIncome = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return incomeTransactions
      .filter(tx => {
        if (!tx.date) return false;
        const d = new Date(tx.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [incomeTransactions]);

  const saved = totalIncome - analytics.totalSpent;
  const savingsRate = totalIncome > 0 ? Math.round((saved / totalIncome) * 100) : 0;

  const vsLastMonth = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = new Date(now.getFullYear(), currentMonth - 1, 1);
    const lastMonthExpenses = expenses
      .filter(tx => {
        if (!tx.date) return false;
        const d = new Date(tx.date);
        return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
      })
      .reduce((sum, tx) => sum + tx.amount, 0);
    if (lastMonthExpenses === 0) return 0;
    return Math.round(((analytics.totalSpent - lastMonthExpenses) / lastMonthExpenses) * 100);
  }, [expenses, analytics.totalSpent]);

  const smartInsight = useMemo(() => {
    const topCategory = analytics.categories[0];
    if (topCategory) {
      return {
        text: `You spent the most on ${topCategory.name} this month.`,
        category: topCategory.name,
        savings: Math.round(topCategory.amount * 0.3),
      };
    }
    return {
      text: 'Track your spending to get personalized insights.',
      category: undefined,
      savings: undefined,
    };
  }, [analytics.categories]);

  const comparisonData = useMemo(() => {
    const foodSpent = analytics.categories.find(c => c.name === 'Food')?.amount || 0;
    const transportSpent = analytics.categories.find(c => c.name === 'Transport')?.amount || 0;
    return [
      { label: 'Total Spent', value: `EGP ${analytics.totalSpent}`, change: vsLastMonth, isGoodWhenUp: false },
      { label: 'Saved', value: `EGP ${saved}`, change: savingsRate, isGoodWhenUp: true },
      { label: 'Food & Delivery', value: `EGP ${foodSpent}`, change: 0, isGoodWhenUp: false },
      { label: 'Transport', value: `EGP ${transportSpent}`, change: 0, isGoodWhenUp: false },
    ];
  }, [analytics.totalSpent, analytics.categories, saved, vsLastMonth, savingsRate]);

  const statBoxes = [
    { label: 'Transactions', value: analytics.transactionCount.toString(), color: theme.colors.accent, icon: '🔢' },
    { label: 'Avg / Txn', value: `EGP ${analytics.avgPerTransaction}`, color: theme.colors.success, icon: '💚' },
    { label: 'Daily Avg', value: `EGP ${analytics.dailyAvg}`, color: theme.colors.warning, icon: '💛' },
    { label: 'Categories', value: analytics.categoriesCount.toString(), color: theme.colors.textSecondary, icon: '⚪' },
  ];

  const weekdaysTotal = analytics.dayOfWeekData
    .filter(d => !['Sun', 'Sat'].includes(d.day))
    .reduce((sum, d) => sum + d.amount, 0);
  const weekendsTotal = analytics.dayOfWeekData
    .filter(d => ['Sun', 'Sat'].includes(d.day))
    .reduce((sum, d) => sum + d.amount, 0);

  const streak = useMemo(() => {
    if (expenses.length === 0) return 0;
    const now = new Date();
    let streakCount = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const hasTransaction = expenses.some(tx => {
        if (!tx.date) return false;
        const td = new Date(tx.date);
        return td.toDateString() === d.toDateString();
      });
      if (hasTransaction) {
        streakCount++;
      } else if (i > 0) {
        break;
      }
    }
    return streakCount;
  }, [expenses]);

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <>
            <SpendingHeroCard
              totalSpent={analytics.totalSpent}
              saved={saved}
              income={totalIncome}
              dailyAvg={analytics.dailyAvg}
              vsLastMonth={vsLastMonth}
            />

            <SmartInsightCard
              insight={smartInsight.text}
              category={smartInsight.category}
              savingsAmount={smartInsight.savings}
            />

            <DailySpendingChart
              data={analytics.dailyData}
              average={analytics.dailyAvg}
              highest={analytics.highest}
              total={analytics.totalSpent}
            />

            <CategoryBreakdown
              categories={analytics.categories}
              totalSpent={analytics.totalSpent}
            />

            <TopExpensesList expenses={analytics.topExpenses} />

            <ComparisonGrid data={comparisonData} />
          </>
        );

      case 'trends':
        return (
          <>
            <SpendingTrendCard data={analytics.monthlyTrendData} />
            <SavingsRateCard
              savingsRate={savingsRate}
              savedAmount={saved}
              totalIncome={totalIncome}
            />
            <PeriodComparisonCard data={analytics.periodComparisonData} />
          </>
        );

      case 'details':
        return (
          <>
            <StatBoxes stats={statBoxes} />
            <DayOfWeekChart
              data={analytics.dayOfWeekData}
              weekdaysTotal={weekdaysTotal}
              weekendsTotal={weekendsTotal}
            />
            <MonthlyHeatmap
              data={analytics.monthlyHeatmapData}
              month={MONTH_NAMES[new Date().getMonth()]}
            />
            <CategoryDeepDive
              categories={analytics.categories}
              totalSpent={analytics.totalSpent}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <InsightsHeader
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        streak={streak}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    gap: 16,
  },
  bottomPadding: {
    height: 100,
  },
});
