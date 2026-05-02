import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface TopExpense {
  rank: number;
  merchant: string;
  category: string;
  categoryIcon: string;
  amount: number;
  transactions: number;
  percentage: number;
  color: string;
}

interface TopExpensesListProps {
  expenses: TopExpense[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function TopExpensesList({ expenses }: TopExpensesListProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Expenses</Text>
        <View style={styles.viewAllBadge}>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
      </View>
      <View style={styles.expensesList}>
        {expenses.map((expense) => {
          const isTopRank = expense.rank <= 2;
          return (
            <View key={expense.rank} style={styles.expenseRow}>
              <View style={styles.leftSection}>
                <View style={[styles.rankBadge, isTopRank ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.surfaceElevated }]}>
                  <Text style={[styles.rankText, isTopRank && styles.rankTextActive]}>{expense.rank}</Text>
                </View>
                <View style={styles.merchantInfo}>
                  <Text style={styles.merchantName}>{expense.merchant}</Text>
                  <Text style={styles.categoryInfo}>
                    {expense.categoryIcon} {expense.category} · {expense.transactions} trans
                  </Text>
                </View>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.amount}>EGP {formatCurrency(expense.amount)}</Text>
                <View style={styles.proportionBarBg}>
                  <View style={[styles.proportionBarFill, { width: `${expense.percentage}%`, backgroundColor: expense.color }]} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: 20,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllBadge: {
    backgroundColor: theme.colors.accent + '20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  viewAllText: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  expensesList: {
    gap: 14,
  },
  expenseRow: {
    gap: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  rankTextActive: {
    color: theme.colors.textPrimary,
  },
  merchantInfo: {
    gap: 2,
  },
  merchantName: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryInfo: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 38,
  },
  amount: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  proportionBarBg: {
    width: 80,
    height: 4,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  proportionBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});