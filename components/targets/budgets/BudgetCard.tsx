import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface BudgetData {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
  icon?: string;
}

interface BudgetCardProps {
  budget: BudgetData;
  onPress?: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const percentUsed = Math.round((budget.spent / budget.limit) * 100);
  const remaining = budget.limit - budget.spent;
  const isOverBudget = remaining < 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconBadge, { backgroundColor: budget.color + '20' }]}>
          <Text style={[styles.icon, { color: budget.color }]}>{budget.icon || '💳'}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.categoryName}>{budget.category}</Text>
          <Text style={styles.categorySubtext}>
            {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
          </Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: isOverBudget ? theme.colors.destructive + '20' : budget.color + '20' }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: isOverBudget ? theme.colors.destructive : budget.color }
          ]}>
            {isOverBudget ? 'OVER' : `${percentUsed}%`}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${Math.min(percentUsed, 100)}%`,
                backgroundColor: isOverBudget ? theme.colors.destructive : budget.color,
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SPENT</Text>
          <Text style={[styles.statValue, { color: isOverBudget ? theme.colors.destructive : theme.colors.warning }]}>
            {formatCurrency(budget.spent)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>LIMIT</Text>
          <Text style={styles.statValue}>{formatCurrency(budget.limit)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{isOverBudget ? 'OVER' : 'LEFT'}</Text>
          <Text style={[styles.statValue, { color: isOverBudget ? theme.colors.destructive : theme.colors.success }]}>
            {formatCurrency(Math.abs(remaining))}
          </Text>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  categorySubtext: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressSection: {
    marginBottom: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: theme.colors.border,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
});