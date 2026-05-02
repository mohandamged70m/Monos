import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  isCurrentMonth?: boolean;
}

interface SpendingTrendCardProps {
  data: MonthData[];
}

type TimeRange = '3M' | '6M';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function SpendingTrendCard({ data }: SpendingTrendCardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('6M');
  
  const filteredData = timeRange === '3M' ? data.slice(-3) : data;
  const maxValue = Math.max(...filteredData.map(d => d.income), 1);
  
  const totalIncome = filteredData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = filteredData.reduce((sum, d) => sum + d.expenses, 0);
  const net = totalIncome - totalExpenses;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Spending Trend</Text>
        <View style={styles.toggleContainer}>
          {(['3M', '6M'] as TimeRange[]).map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.toggleButton, timeRange === range && styles.toggleButtonActive]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[styles.toggleText, timeRange === range && styles.toggleTextActive]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.success }]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.colors.accent }]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {filteredData.map((monthData) => {
          const incomeHeight = (monthData.income / maxValue) * 100;
          const expenseHeight = (monthData.expenses / maxValue) * 100;
          const opacity = monthData.isCurrentMonth ? 1 : 0.5;

          return (
            <View key={monthData.month} style={[styles.barGroup, { opacity }]}>
              <View style={styles.barsContainer}>
                <View style={[styles.incomeBar, { height: incomeHeight }]} />
                <View style={[styles.expenseBar, { height: expenseHeight }]} />
              </View>
              <Text style={[styles.monthLabel, monthData.isCurrentMonth && styles.monthLabelActive]}>
                {monthData.month}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>This Period</Text>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            EGP {formatCurrency(totalIncome)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={[styles.statValue, { color: theme.colors.accent }]}>
            EGP {formatCurrency(totalExpenses)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Net</Text>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            EGP {formatCurrency(net)}
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.accent,
  },
  toggleText: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: theme.colors.textPrimary,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 20,
  },
  barGroup: {
    alignItems: 'center',
    gap: 8,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 100,
    justifyContent: 'center',
  },
  incomeBar: {
    width: 16,
    backgroundColor: theme.colors.success,
    borderRadius: 6,
    minHeight: 4,
  },
  expenseBar: {
    width: 16,
    backgroundColor: theme.colors.accent,
    borderRadius: 6,
    minHeight: 4,
  },
  monthLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  monthLabelActive: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});