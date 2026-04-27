import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface BudgetHeroData {
  totalBudget: number;
  totalSpent: number;
  categoriesCount: number;
  remaining: number;
}

interface BudgetHeroProps {
  data?: BudgetHeroData;
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

export default function BudgetHero({ data }: BudgetHeroProps) {
  const totalBudget = data?.totalBudget ?? 8500;
  const totalSpent = data?.totalSpent ?? 6200;
  const categoriesCount = data?.categoriesCount ?? 4;
  const remaining = totalBudget - totalSpent;

  const percentUsed = Math.round((totalSpent / totalBudget) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.monthPill}>
          <Text style={styles.monthText}>Budget</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>TOTAL BUDGET</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(totalBudget)}</Text>
        <Text style={styles.balanceChange}>
          {percentUsed}% used of {formatCurrency(totalBudget)}
        </Text>
      </View>

      <View style={styles.statsRow}>
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
          <Text style={[styles.statValue, { color: remaining < 0 ? theme.colors.destructive : theme.colors.success }]}>
            {formatCurrency(remaining)}
          </Text>
          <Text style={styles.statLabel}>LEFT</Text>
        </View>
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