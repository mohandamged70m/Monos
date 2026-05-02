'use client';

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import TransferForm from './TransferForm';

type TransactionType = 'expense' | 'income' | 'transfer';

const typeLabels: Record<TransactionType, string> = {
  expense: 'Expense',
  income: 'Income',
  transfer: 'Transfer',
};

export default function TransactionForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const [type, setType] = useState<TransactionType>('expense');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New {typeLabels[type]}</Text>
        <View style={styles.headerBtn} />
      </View>

      <View style={styles.tabs}>
        {(Object.keys(typeLabels) as TransactionType[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, type === t && styles.tabActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.tabText, type === t && styles.tabTextActive]}>
              {typeLabels[t]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {type === 'expense' && <ExpenseForm onSave={onSave} />}
      {type === 'income' && <IncomeForm onSave={onSave} />}
      {type === 'transfer' && <TransferForm onSave={onSave} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: {
    color: colors.text1,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.teal,
  },
  tabText: {
    color: colors.text2,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
});
