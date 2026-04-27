import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface InflationAlertProps {
  label?: string;
  message?: string;
}

export default function InflationAlert({ 
  label = '↑ EGP inflation alert', 
  message = 'USD-priced subscriptions cost 42% more since Jan 2024' 
}: InflationAlertProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBadge}>
        <TrendingUp color={theme.colors.warning} size={14} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(251, 191, 36, 0.08)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.15)',
  },
  iconBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  label: {
    color: theme.colors.warning,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  message: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
});