import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface PeriodData {
  month: string;
  amount: number;
  isCurrentMonth?: boolean;
}

interface PeriodComparisonCardProps {
  data: PeriodData[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function PeriodComparisonCard({ data }: PeriodComparisonCardProps) {
  const maxAmount = Math.max(...data.map(d => d.amount), 1);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Period Comparison</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>6 Months</Text>
        </View>
      </View>

      <View style={styles.list}>
        {data.map((item) => (
          <View key={item.month} style={styles.row}>
            <Text style={[styles.monthText, item.isCurrentMonth && styles.monthTextActive]}>
              {item.month}
            </Text>
            <View style={styles.barContainer}>
              <View style={[styles.bar, item.isCurrentMonth ? styles.barActive : styles.barInactive, { width: `${(item.amount / maxAmount) * 100}%` }]} />
            </View>
            <Text style={[styles.amountText, item.isCurrentMonth && styles.amountTextActive]}>
              {item.isCurrentMonth && 'EGP '}{formatCurrency(item.amount)}
            </Text>
          </View>
        ))}
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
  badge: {
    backgroundColor: '#3B82F6' + '20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    width: 36,
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  monthTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  barContainer: {
    flex: 1,
    height: 20,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
    minWidth: 4,
  },
  barActive: {
    backgroundColor: theme.colors.accent,
  },
  barInactive: {
    backgroundColor: theme.colors.accent,
    opacity: 0.4,
  },
  amountText: {
    width: 70,
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  amountTextActive: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
});