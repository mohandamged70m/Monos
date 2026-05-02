'use client';

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { useTransactions } from '@/context/TransactionsContext';

const incomeSources = [
  { name: 'Salary', icon: '💰', bg: '#DCFCE7' },
  { name: 'Freelance', icon: '💻', bg: '#DBEAFE' },
  { name: 'Investments', icon: '📈', bg: '#FEF3C7' },
  { name: 'Gifts', icon: '🎁', bg: '#FCE7F3' },
  { name: 'Refunds', icon: '🔄', bg: '#F3E8FF' },
  { name: 'Other', icon: '💵', bg: '#E0E7FF' },
];

const accounts = [
  { name: 'Main Account', currency: 'EGP' },
  { name: 'Savings', currency: 'EGP' },
  { name: 'Secondary', currency: 'USD' },
];

interface IncomeFormProps {
  onSave?: () => void;
}

export default function IncomeForm({ onSave }: IncomeFormProps) {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('Salary');
  const [accountName, setAccountName] = useState('Main Account');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    addTransaction({
      merchant: description.trim(),
      amount: Number(amount),
      category: source,
      type: 'income',
      account: accountName,
      description: description.trim(),
      note: note.trim() || undefined,
    });

    onSave?.();
  };

  const showAccountPicker = () => {
    Alert.alert(
      'Select Account',
      'Choose an account for this transaction',
      accounts.map(acc => ({
        text: `${acc.name} (${acc.currency})`,
        onPress: () => setAccountName(acc.name),
      }))
    );
  };

  return (
    <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
      <View style={styles.amountContainer}>
        <Text style={styles.currencyLabel}>EGP</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          placeholderTextColor={colors.text3}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Source</Text>
        <View style={styles.categoryGrid}>
          {incomeSources.map((s) => (
            <TouchableOpacity
              key={s.name}
              style={[styles.categoryBtn, source === s.name && styles.categoryBtnActive]}
              onPress={() => setSource(s.name)}
            >
              <Text style={styles.categoryIcon}>{s.icon}</Text>
              <Text style={[styles.categoryText, source === s.name && styles.categoryTextActive]}>
                {s.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.field} onPress={showAccountPicker}>
        <Text style={styles.label}>Account</Text>
        <View style={styles.accountRow}>
          <Text style={styles.accountName}>{accountName}</Text>
          <Text style={styles.accountCurrency}>
            {accounts.find(a => a.name === accountName)?.currency}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What is this income for?"
          placeholderTextColor={colors.text3}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Add a note or context..."
          placeholderTextColor={colors.text3}
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Add Income</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fields: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  currencyLabel: {
    color: theme.colors.textMuted,
    fontSize: 20,
    fontWeight: '600',
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text1,
    minWidth: 100,
    textAlign: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: colors.text2,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  categoryBtnActive: {
    backgroundColor: theme.colors.accent,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryText: {
    color: colors.text2,
    fontSize: 12,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  accountName: {
    color: colors.text1,
    fontSize: 16,
    flex: 1,
  },
  accountCurrency: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text1,
  },
  noteInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
