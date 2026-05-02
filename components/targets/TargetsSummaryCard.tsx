import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { TargetsTab } from '@/context/TargetsContext';

interface GoalsSummaryData {
  totalSaved: number;
  totalTarget: number;
  goalsCount: number;
  monthlyTotal: number;
}

interface BudgetsSummaryData {
  totalBudget: number;
  totalSpent: number;
  categoriesCount: number;
  remaining: number;
}

interface TargetsSummaryCardProps {
  type: TargetsTab;
  goalsData?: GoalsSummaryData;
  budgetData?: BudgetsSummaryData;
}

function formatCurrency(value: number): string {
  return `EGP ${new Intl.NumberFormat('en-EG').format(value)}`;
}

export default function TargetsSummaryCard({
  type,
  goalsData,
  budgetData,
}: TargetsSummaryCardProps) {
  const isGoal = type === 'goals';
  const accentColor = isGoal ? theme.colors.teal : theme.colors.accent;

  const goals = goalsData ?? {
    totalSaved: 0,
    totalTarget: 0,
    goalsCount: 0,
    monthlyTotal: 0,
  };

  const budget = budgetData ?? {
    totalBudget: 0,
    totalSpent: 0,
    categoriesCount: 0,
    remaining: 0,
  };

  const percentComplete = isGoal
    ? Math.round((goals.totalSaved / goals.totalTarget) * 100) || 0
    : Math.round((budget.totalSpent / budget.totalBudget) * 100) || 0;

  return (
    <LinearGradient
      colors={['#1A1A2E', '#16161F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.heroSection}>
        <Text style={styles.heroLabel}>
          {isGoal ? 'TOTAL SAVED' : 'TOTAL BUDGET'}
        </Text>
        <Text style={styles.heroValue}>
          {isGoal ? formatCurrency(goals.totalSaved) : formatCurrency(budget.totalBudget)}
        </Text>
        <Text style={styles.heroSubtext}>
          {isGoal
            ? `${percentComplete}% of ${formatCurrency(goals.totalTarget)} target`
            : `${percentComplete}% used`}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: accentColor }]}>
            {isGoal ? goals.goalsCount : budget.categoriesCount}
          </Text>
          <Text style={styles.statLabel}>
            {isGoal ? 'goals' : 'categories'}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: accentColor }]}>
            {isGoal
              ? formatCurrency(goals.monthlyTotal)
              : formatCurrency(budget.totalSpent)}
          </Text>
          <Text style={styles.statLabel}>
            {isGoal ? 'monthly' : 'spent'}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            {isGoal
              ? formatCurrency(goals.totalTarget - goals.totalSaved)
              : formatCurrency(budget.remaining)}
          </Text>
          <Text style={styles.statLabel}>
            {isGoal ? 'left' : budget.remaining < 0 ? 'over' : 'left'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heroLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroValue: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  heroSubtext: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});
