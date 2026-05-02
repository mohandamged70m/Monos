import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface DayData {
  day: string;
  amount: number;
  isPeak?: boolean;
}

interface DayOfWeekChartProps {
  data: DayData[];
  weekdaysTotal: number;
  weekendsTotal: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function DayOfWeekChart({ data, weekdaysTotal, weekendsTotal }: DayOfWeekChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount), 1);
  const peakDay = data.find(d => d.isPeak)?.day || 'Sunday';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Spending by Day</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>📅 Weekly</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {data.map((item) => {
          const height = Math.max((item.amount / maxAmount) * 80, 4);
          const isSunday = item.day === 'Sun';

          return (
            <View key={item.day} style={styles.dayContainer}>
              <View style={[styles.barWrapper, isSunday && styles.barWrapperPeak]}>
                {isSunday ? (
                  <LinearGradient
                    colors={[theme.colors.accent, theme.colors.purple]}
                    style={[styles.bar, { height }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  />
                ) : (
                  <View style={[styles.bar, { height, backgroundColor: theme.colors.surfaceElevated }]} />
                )}
              </View>
              <Text style={[styles.dayLabel, isSunday && styles.dayLabelActive]}>{item.day}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.insightStrip}>
        <Text style={styles.insightText}>💡 {peakDay} is your busiest spending day</Text>
      </View>

      <View style={styles.splitRow}>
        <View style={styles.splitItem}>
          <Text style={styles.splitLabel}>Weekdays</Text>
          <Text style={styles.splitValue}>EGP {formatCurrency(weekdaysTotal)}</Text>
        </View>
        <View style={styles.splitDivider} />
        <View style={styles.splitItem}>
          <Text style={styles.splitLabel}>Weekends</Text>
          <Text style={[styles.splitValue, { color: theme.colors.warning }]}>
            EGP {formatCurrency(weekendsTotal)}
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
  badge: {
    backgroundColor: theme.colors.accent + '20',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    height: 80,
    justifyContent: 'flex-end',
  },
  barWrapperPeak: {
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  dayLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  dayLabelActive: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  insightStrip: {
    backgroundColor: theme.colors.warning + '15',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  insightText: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: '600',
  },
  splitRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 12,
    padding: 12,
  },
  splitItem: {
    flex: 1,
    alignItems: 'center',
  },
  splitDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  splitLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  splitValue: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
});