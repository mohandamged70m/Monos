import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { SubscriptionItem } from '@/constants/billsData';

interface SubscriptionCardProps {
  item: SubscriptionItem;
  onPress?: () => void;
}

function formatCurrency(value: number): string {
  return `EGP ${new Intl.NumberFormat('en-EG').format(value)}`;
}

function getDaysLabel(days: number): string {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `in ${days} days`;
}

function getStatusDotColor(status: SubscriptionItem['status']): string {
  switch (status) {
    case 'active': return theme.colors.success;
    case 'warning': return theme.colors.warning;
    case 'inactive': return theme.colors.textMuted;
  }
}

export default function SubscriptionCard({ item, onPress }: SubscriptionCardProps) {
  const isWarning = item.status === 'warning';
  const hasUsageWarning = item.usageDaysUnused !== undefined;
  const isInstallment = item.installmentRemaining !== undefined;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.logo, { backgroundColor: item.logoColor }]}>
        <Text style={styles.logoText}>{item.logo}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusDotColor(item.status) }]} />
        </View>

        <Text style={styles.subtitle}>
          {getDaysLabel(item.daysUntilRenewal)} • {item.renewalDate}
        </Text>

        {isWarning && hasUsageWarning && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningText}>
              {item.usageDaysUnused} days unused • Consider cancelling
            </Text>
          </View>
        )}
      </View>

      <View style={styles.priceSection}>
        <Text style={[styles.price, isWarning && styles.priceWarning]}>
          {formatCurrency(item.amount)}
        </Text>
        
        {item.priceDelta && (
          <View style={[
            styles.deltaBadge,
            item.priceDelta.value > 0 ? styles.deltaIncrease : styles.deltaStable
          ]}>
            <Text style={[
              styles.deltaText,
              item.priceDelta.value > 0 ? styles.deltaTextIncrease : styles.deltaTextStable
            ]}>
              {item.priceDelta.value > 0 ? '↑' : '↔'} {item.priceDelta.label}
            </Text>
          </View>
        )}

        {isInstallment && item.installmentRemaining !== undefined && (
          <Text style={styles.installmentRemaining}>
            {formatCurrency(item.installmentRemaining)} left
          </Text>
        )}

        {isWarning && (
          <Text style={styles.wastedLabel}>wasted?</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  warningBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  warningText: {
    color: theme.colors.warning,
    fontSize: 10,
    fontWeight: '600',
  },
  priceSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  priceWarning: {
    color: theme.colors.destructive,
  },
  deltaBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deltaIncrease: {
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
  },
  deltaStable: {
    backgroundColor: theme.colors.accentSubtle,
  },
  deltaText: {
    fontSize: 10,
    fontWeight: '600',
  },
  deltaTextIncrease: {
    color: theme.colors.destructive,
  },
  deltaTextStable: {
    color: theme.colors.purple,
  },
  installmentRemaining: {
    color: theme.colors.textMuted,
    fontSize: 10,
  },
  wastedLabel: {
    color: theme.colors.destructive,
    fontSize: 11,
    fontWeight: '600',
  },
});