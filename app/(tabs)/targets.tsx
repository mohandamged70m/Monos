'use client';

import { useState } from 'react';
import { ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import GoalCard from '@/components/targets/goals/GoalCard';
import GoalsHero from '@/components/targets/goals/GoalsHero';
import BudgetCard from '@/components/targets/budgets/BudgetCard';
import BudgetHero from '@/components/targets/budgets/BudgetHero';

const mockGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 50000,
    savedAmount: 32500,
    monthlyContribution: 2500,
    color: '#8B5CF6',
    icon: '🛡️',
  },
  {
    id: '2',
    name: 'New MacBook Pro',
    targetAmount: 80000,
    savedAmount: 45000,
    monthlyContribution: 5000,
    color: '#14B8A6',
    icon: '💻',
  },
  {
    id: '3',
    name: 'Trip to Japan',
    targetAmount: 35000,
    savedAmount: 12000,
    monthlyContribution: 2000,
    color: '#F59E0B',
    icon: '✈️',
  },
  {
    id: '4',
    name: 'Home Down Payment',
    targetAmount: 150000,
    savedAmount: 68000,
    monthlyContribution: 6000,
    color: '#EC4899',
    icon: '🏠',
  },
];

const mockBudgets = [
  {
    id: '1',
    category: 'Food & Dining',
    limit: 3000,
    spent: 2400,
    color: '#F59E0B',
    icon: '🍔',
  },
  {
    id: '2',
    category: 'Transport',
    limit: 1500,
    spent: 1200,
    color: '#14B8A6',
    icon: '🚗',
  },
  {
    id: '3',
    category: 'Entertainment',
    limit: 2000,
    spent: 2100,
    color: '#EC4899',
    icon: '🎬',
  },
  {
    id: '4',
    category: 'Shopping',
    limit: 2000,
    spent: 800,
    color: '#8B5CF6',
    icon: '🛍️',
  },
];

const totalSaved = mockGoals.reduce((sum, g) => sum + g.savedAmount, 0);
const totalTarget = mockGoals.reduce((sum, g) => sum + g.targetAmount, 0);
const monthlyTotal = mockGoals.reduce((sum, g) => sum + g.monthlyContribution, 0);

const totalBudget = mockBudgets.reduce((sum, b) => sum + b.limit, 0);
const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
const remaining = totalBudget - totalSpent;

export default function TargetsScreen() {
  const [activeView, setActiveView] = useState<'goals' | 'budget'>('goals');

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
        <GoalsHero
          data={{
            totalSaved,
            totalTarget,
            goalsCount: mockGoals.length,
            monthlyTotal,
          }}
          budgetData={{
            totalBudget,
            totalSpent,
            categoriesCount: mockBudgets.length,
            remaining,
          }}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {activeView === 'goals' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>YOUR GOALS</Text>
            {mockGoals.map((goal) => (
              <View key={goal.id} style={styles.cardWrapper}>
                <GoalCard goal={goal} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>YOUR BUDGETS</Text>
            {mockBudgets.map((budget) => (
              <View key={budget.id} style={styles.cardWrapper}>
                <BudgetCard budget={budget} />
              </View>
            ))}
          </View>
        )}
        
        <View style={{ paddingBottom: 120 }} />
      </ScrollView>
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
    marginTop: 24,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  cardWrapper: {
    marginBottom: 12,
  },
});