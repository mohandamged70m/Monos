import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface GoalData {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  monthlyContribution: number;
  color: string;
  icon?: string;
}

interface GoalCardProps {
  goal: GoalData;
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

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-EG').format(value);
}

export default function GoalCard({ goal }: GoalCardProps) {
  const percentComplete = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  const remaining = goal.targetAmount - goal.savedAmount;
  const monthsLeft = goal.monthlyContribution > 0 
    ? Math.ceil(remaining / goal.monthlyContribution)
    : 0;
  const isComplete = percentComplete >= 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconBadge, { backgroundColor: goal.color + '20' }]}>
          <Text style={[styles.icon, { color: goal.color }]}>{goal.icon || '🎯'}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.goalName}>{goal.name}</Text>
          <Text style={styles.goalSubtext}>
            {isComplete ? '🎉 Goal achieved!' : `${monthsLeft} months left`}
          </Text>
        </View>
        <View style={styles.percentBadge}>
          <Text style={[styles.percentText, { color: goal.color }]}>{percentComplete}%</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${Math.min(percentComplete, 100)}%`,
                backgroundColor: goal.color,
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SAVED</Text>
          <Text style={[styles.statValue, { color: theme.colors.success }]}>
            {formatCurrency(goal.savedAmount)}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>TARGET</Text>
          <Text style={styles.statValue}>{formatCurrency(goal.targetAmount)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>LEFT</Text>
          <Text style={[styles.statValue, { color: theme.colors.warning }]}>
            {formatCurrency(remaining)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>
          Monthly: {formatCurrency(goal.monthlyContribution)}/mo
        </Text>
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
  goalName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  goalSubtext: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  percentBadge: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  percentText: {
    fontSize: 14,
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
    marginBottom: 12,
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
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
  },
  footerLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
  },
});