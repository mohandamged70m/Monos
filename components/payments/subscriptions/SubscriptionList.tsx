import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { SubscriptionItem } from '@/constants/billsData';
import SubscriptionCard from './SubscriptionCard';

interface SubscriptionListProps {
  subscriptions: SubscriptionItem[];
}

export default function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>YOUR SUBSCRIPTIONS</Text>
      <View style={styles.list}>
        {subscriptions.map((item) => (
          <SubscriptionCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    gap: 10,
  },
});