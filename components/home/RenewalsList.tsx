import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { theme } from '@/constants/theme';

export interface Subscription {
  id: string;
  name: string;
  logo: string;
  amount: number;
  renewalDate: string;
  daysUntilRenewal: number;
}

interface RenewalsListProps {
  subscriptions: Subscription[];
}

function formatCurrency(value: number): string {
  return `EGP ${new Intl.NumberFormat('en-EG').format(value)}`;
}

function getDaysLabel(days: number): string {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `in ${days} days`;
}

function getRenewalColor(days: number): string {
  if (days <= 1) return theme.colors.destructive;
  if (days <= 3) return theme.colors.warning;
  return theme.colors.textMuted;
}

export default function RenewalsList({ subscriptions }: RenewalsListProps) {
  if (!subscriptions || subscriptions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Renewals</Text>
      <View style={styles.list}>
        {subscriptions.map((sub) => (
          <TouchableOpacity key={sub.id} style={styles.row}>
            <View style={[styles.logo, { backgroundColor: getLogoColor(sub.name) }]}>
              <Text style={styles.logoText}>{sub.logo.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{sub.name}</Text>
              <Text style={[styles.renewalLabel, { color: getRenewalColor(sub.daysUntilRenewal) }]}>
                renew {getDaysLabel(sub.daysUntilRenewal)}
              </Text>
            </View>
            <Text style={styles.amount}>{formatCurrency(sub.amount)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function getLogoColor(name: string): string {
  const colors = ['#E50914', '#7c3aed', '#3b82f6', '#10b981', '#f59e0b'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  list: {
    gap: 8,
  },
  row: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.textPrimary,
    fontWeight: '800',
    fontSize: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  renewalLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  amount: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});