import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { InstallmentItem } from '@/constants/billsData';
import InstallmentCard from './InstallmentCard';

interface InstallmentListProps {
  installments: InstallmentItem[];
}

export default function InstallmentList({ installments }: InstallmentListProps) {
  if (installments.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>YOUR INSTALLMENTS</Text>
      <View style={styles.list}>
        {installments.map((item) => (
          <InstallmentCard key={item.id} item={item} />
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