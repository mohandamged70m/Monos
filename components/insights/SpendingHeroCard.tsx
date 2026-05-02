import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

interface SpendingHeroCardProps {
  totalSpent: number;
  saved: number;
  income: number;
  dailyAvg: number;
  vsLastMonth: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

function formatPercent(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value}%`;
}

export default function SpendingHeroCard({
  totalSpent,
  saved,
  income,
  dailyAvg,
  vsLastMonth,
}: SpendingHeroCardProps) {
  const vsLastMonthColor = vsLastMonth > 0 ? theme.colors.destructive : theme.colors.success;

  return (
    <LinearGradient
      colors={[theme.colors.surface, '#1E1B2F', theme.colors.surface]}
      style={styles.card}
    >
      <View style={styles.glowOrbPurple} />
      <View style={styles.glowOrbGreen} />

      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Total Spent</Text>
          <Text style={styles.amount}>EGP {formatCurrency(totalSpent)}</Text>
        </View>
        <View style={styles.savedBadge}>
          <Text style={styles.savedText}>+EGP {formatCurrency(saved)} saved</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statChip}>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            EGP {formatCurrency(income)}
          </Text>
          <Text style={styles.statLabel}>Income</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={[styles.statValue, { color: theme.colors.warning }]}>
            EGP {formatCurrency(dailyAvg)}
          </Text>
          <Text style={styles.statLabel}>Daily avg</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={[styles.statValue, { color: vsLastMonthColor }]}>
            {formatPercent(vsLastMonth)}
          </Text>
          <Text style={styles.statLabel}>vs Last mo</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    marginHorizontal: 20,
    gap: 20,
  },
  glowOrbPurple: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.accent,
    opacity: 0.15,
  },
  glowOrbGreen: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.success,
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  amount: {
    color: theme.colors.textPrimary,
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
  },
  savedBadge: {
    backgroundColor: theme.colors.success + '20',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  savedText: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    zIndex: 1,
  },
  statChip: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});