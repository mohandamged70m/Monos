import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface DayData {
  day: number;
  amount: number;
  type: 'normal' | 'spike' | 'highlight';
}

interface DailySpendingChartProps {
  data: DayData[];
  average: number;
  highest: number;
  total: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function DailySpendingChart({
  data,
  average,
  highest,
  total,
}: DailySpendingChartProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Daily Spending</Text>

      <View style={styles.chartContainer}>
        {data.map((dayData) => {
          const height = Math.max((dayData.amount / maxAmount) * 100, 4);
          const barColor = {
            normal: theme.colors.surfaceElevated,
            spike: theme.colors.destructive,
            highlight: theme.colors.accent,
          }[dayData.type];

          return (
            <View key={dayData.day} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    { height, backgroundColor: barColor },
                    dayData.type === 'highlight' && styles.barGlowing,
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{dayData.day}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Average</Text>
          <Text style={styles.statValue}>EGP {formatCurrency(average)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.colors.destructive }]}>Highest</Text>
          <Text style={[styles.statValue, { color: theme.colors.destructive }]}>
            EGP {formatCurrency(highest)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>EGP {formatCurrency(total)}</Text>
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
    gap: 16,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    height: 100,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 14,
    borderRadius: 6,
  },
  barGlowing: {
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  dayLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
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
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
});