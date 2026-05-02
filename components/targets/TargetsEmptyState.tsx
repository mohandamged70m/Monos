import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Target, Wallet } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type TargetsTabType = 'goals' | 'budget';

interface TargetsEmptyStateProps {
  type: TargetsTabType;
  onAddPress: () => void;
}

export default function TargetsEmptyState({ type, onAddPress }: TargetsEmptyStateProps) {
  const isGoal = type === 'goals';
  const accentColor = isGoal ? theme.colors.teal : theme.colors.accent;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
        {isGoal ? (
          <Target color={accentColor} size={32} />
        ) : (
          <Wallet color={accentColor} size={32} />
        )}
      </View>

      <Text style={styles.headline}>
        {isGoal ? 'Your goals, visualized' : 'Your spending, controlled'}
      </Text>

      <View style={styles.exampleCard}>
        <View
          style={[styles.exampleLogo, { backgroundColor: isGoal ? '#10B981' : '#F59E0B' }]}
        >
          <Text style={styles.exampleLogoText}>
            {isGoal ? '🏠' : '🍔'}
          </Text>
        </View>
        <View style={styles.exampleInfo}>
          <Text style={styles.exampleName}>
            {isGoal ? 'New Laptop' : 'Food & Dining'}
          </Text>
          <Text style={styles.exampleDetail}>
            {isGoal
              ? 'EGP 1,500/month'
              : 'EGP 2,000/month'}
          </Text>
        </View>
        <Text style={styles.exampleSubtitle}>
          {isGoal
            ? '45% saved'
            : 'EGP 1,200 spent'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: accentColor }]}
        onPress={onAddPress}
        activeOpacity={0.85}
      >
        <Text style={styles.addButtonText}>
          + Add {isGoal ? 'Goal' : 'Budget'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headline: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  exampleLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleLogoText: {
    fontSize: 20,
  },
  exampleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exampleName: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  exampleDetail: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  exampleSubtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});
