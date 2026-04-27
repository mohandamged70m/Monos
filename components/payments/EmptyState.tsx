import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Infinity, Receipt } from 'lucide-react-native';
import { theme } from '@/constants/theme';

type TabType = 'subscriptions' | 'installments';

interface EmptyStateProps {
  type: TabType;
  onAddPress: () => void;
}

export default function EmptyState({ type, onAddPress }: EmptyStateProps) {
  const isSubscription = type === 'subscriptions';
  const accentColor = isSubscription ? theme.colors.teal : theme.colors.accent;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
        {isSubscription ? (
          <Infinity color={accentColor} size={32} />
        ) : (
          <Receipt color={accentColor} size={32} />
        )}
      </View>

      <Text style={styles.headline}>
        {isSubscription ? 'Your bills, automated' : 'Your installments, tracked'}
      </Text>

      <View style={styles.exampleCard}>
        <View
          style={[styles.exampleLogo, { backgroundColor: isSubscription ? '#E50914' : '#8B5CF6' }]}
        >
          <Text style={styles.exampleLogoText}>
            {isSubscription ? 'N' : 'V'}
          </Text>
        </View>
        <View style={styles.exampleInfo}>
          <Text style={styles.exampleName}>
            {isSubscription ? 'Netflix' : 'ValU'}
          </Text>
          <Text style={styles.exampleDetail}>
            {isSubscription
              ? 'EGP 199.99/month'
              : 'EGP 1,500/month'}
          </Text>
        </View>
        <Text style={styles.exampleSubtitle}>
          {isSubscription
            ? 'Renews in 3 days'
            : '3 of 12 paid'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: accentColor }]}
        onPress={onAddPress}
        activeOpacity={0.85}
      >
        <Text style={styles.addButtonText}>
          + Add {isSubscription ? 'Subscription' : 'Installment'}
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
    color: theme.colors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
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