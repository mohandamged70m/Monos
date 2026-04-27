import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface GoalsHeroData {
  totalSaved: number;
  totalTarget: number;
  goalsCount: number;
  monthlyTotal: number;
}

interface BudgetHeroData {
  totalBudget: number;
  totalSpent: number;
  categoriesCount: number;
  remaining: number;
}

interface GoalsHeroProps {
  data?: GoalsHeroData;
  budgetData?: BudgetHeroData;
  activeView?: 'goals' | 'budget';
  onViewChange?: (view: 'goals' | 'budget') => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function GoalsHero({ data, budgetData, activeView = 'goals', onViewChange }: GoalsHeroProps) {
  const totalSaved = data?.totalSaved ?? 24500;
  const totalTarget = data?.totalTarget ?? 85000;
  const goalsCount = data?.goalsCount ?? 4;
  const monthlyTotal = data?.monthlyTotal ?? 3500;

  const totalBudget = budgetData?.totalBudget ?? 8500;
  const totalSpent = budgetData?.totalSpent ?? 6200;
  const categoriesCount = budgetData?.categoriesCount ?? 4;
  const remaining = budgetData?.remaining ?? 2300;

  const percentComplete = activeView === 'goals' 
    ? Math.round((totalSaved / totalTarget) * 100)
    : Math.round((totalSpent / totalBudget) * 100);

  const isOverBudget = remaining < 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => onViewChange?.('goals')}>
            <Text style={[styles.menuText, activeView === 'goals' && styles.menuTextActive]}>
              Goals
            </Text>
          </TouchableOpacity>
          <Text style={styles.menuDivider}>|</Text>
          <TouchableOpacity onPress={() => onViewChange?.('budget')}>
            <Text style={[styles.menuText, activeView === 'budget' && styles.menuTextActive]}>
              Budget
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{activeView === 'goals' ? 'G' : 'B'}</Text>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>
          {activeView === 'goals' ? 'TOTAL SAVED' : 'TOTAL BUDGET'}
        </Text>
        <Text style={styles.balanceAmount}>
          {activeView === 'goals' ? formatCurrency(totalSaved) : formatCurrency(totalBudget)}
        </Text>
        <Text style={styles.balanceChange}>
          {activeView === 'goals' 
            ? `${percentComplete}% of ${formatCurrency(totalTarget)} target`
            : `${percentComplete}% used`
          }
        </Text>
      </View>

      <View style={styles.statsRow}>
        {activeView === 'goals' ? (
          <>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                {goalsCount}
              </Text>
              <Text style={styles.statLabel}>GOALS</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: theme.colors.teal }]}>
                {formatNumber(monthlyTotal)}
              </Text>
              <Text style={styles.statLabel}>MONTHLY</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: theme.colors.warning }]}>
                {formatCurrency(totalTarget - totalSaved)}
              </Text>
              <Text style={styles.statLabel}>LEFT</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: theme.colors.warning }]}>
                {formatNumber(totalSpent)}
              </Text>
              <Text style={styles.statLabel}>SPENT</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                {categoriesCount}
              </Text>
              <Text style={styles.statLabel}>CATEGORIES</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={[styles.statValue, { color: isOverBudget ? theme.colors.destructive : theme.colors.success }]}>
                {formatCurrency(Math.abs(remaining))}
              </Text>
              <Text style={styles.statLabel}>{isOverBudget ? 'OVER' : 'LEFT'}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: -16,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: theme.colors.textMuted,
    fontSize: 18,
    fontWeight: '400',
  },
  menuTextActive: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  menuDivider: {
    color: theme.colors.textMuted,
    fontSize: 18,
    marginHorizontal: 8,
  },
  monthPill: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  monthText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  balanceSection: {
    alignItems: 'center',
    gap: 4,
  },
  balanceLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  balanceAmount: {
    color: theme.colors.textPrimary,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1,
  },
  balanceChange: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statPill: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '600',
  },
});