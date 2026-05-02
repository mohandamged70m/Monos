import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '@/constants/theme';
import { InstallmentItem } from '@/constants/billsData';

interface InstallmentCardProps {
  item: InstallmentItem;
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

function getStatusDotColor(status: InstallmentItem['status']): string {
  switch (status) {
    case 'active':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'completed':
      return theme.colors.teal;
    case 'inactive':
      return theme.colors.textMuted;
  }
}

export default function InstallmentCard({ item, onPress }: InstallmentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const progress = (item.paidMonths / item.totalMonths) * 100;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleExpand}
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
          {getDaysLabel(item.daysUntilPayment)} • {item.renewalDate}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: theme.colors.accent },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {item.paidMonths} of {item.totalMonths} paid
          </Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.price}>{formatCurrency(item.amount)}</Text>
        <Text style={styles.priceLabel}>/month</Text>
        <Text style={styles.remaining}>
          {formatCurrency(item.remainingAmount)} left
        </Text>
        <Text style={styles.expandHint}>{expanded ? 'Less' : 'Details'}</Text>
      </View>

      <Animated.View style={[
        styles.expandedSection,
        {
          maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300],
          }),
          opacity: animation,
        }
      ]}>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={[styles.detailValue, { color: getStatusDotColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Renewal Date</Text>
          <Text style={styles.detailValue}>{item.renewalDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Days Until Payment</Text>
          <Text style={styles.detailValue}>{getDaysLabel(item.daysUntilPayment)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Progress</Text>
          <Text style={styles.detailValue}>{item.paidMonths} of {item.totalMonths} months</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Remaining Amount</Text>
          <Text style={styles.detailValue}>{formatCurrency(item.remainingAmount)}</Text>
        </View>
      </Animated.View>
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
    flexWrap: 'wrap',
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
  progressContainer: {
    marginTop: 8,
    gap: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  priceSection: {
    alignItems: 'flex-end',
    gap: 2,
  },
  price: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  priceLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
  },
  remaining: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  expandHint: {
    color: theme.colors.accent,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  expandedSection: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderSubtle,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  detailValue: {
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
});