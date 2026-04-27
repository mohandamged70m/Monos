'use client';

import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { useTransactions } from '@/context/TransactionsContext';

const categoryIcons: Record<string, { icon: string; bg: string }> = {
  Food: { icon: '🍔', bg: '#FFEDD5' },
  Transport: { icon: '🚌', bg: '#DBEAFE' },
  Grocery: { icon: '🛒', bg: '#DCFCE7' },
  Entertainment: { icon: '🎬', bg: '#F3E8FF' },
  Shopping: { icon: '🛍️', bg: '#FCE7F3' },
  Personal: { icon: '💇', bg: '#FEE2E2' },
  Bills: { icon: '💡', bg: '#FEF3C7' },
  Health: { icon: '💊', bg: '#FECACA' },
};

const categories = Object.keys(categoryIcons);

const accounts = [
  { name: 'Main Account', currency: 'EGP' },
  { name: 'Savings', currency: 'EGP' },
  { name: 'Secondary', currency: 'USD' },
];

type TransactionType = 'expense' | 'income' | 'transfer';

const typeLabels: Record<TransactionType, string> = {
  expense: 'Expense',
  income: 'Income',
  transfer: 'Transfer',
};

export default function TransactionForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [accountName, setAccountName] = useState('Main Account');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  const amountInputRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    const cat = categoryIcons[category];
    const account = accounts.find(a => a.name === accountName) || accounts[0];

    addTransaction({
      merchant: description.trim(),
      amount: Number(amount),
      category,
      type,
      account: accountName,
      description: description.trim(),
      note: note.trim() || undefined,
      icon: cat.icon,
      iconBg: cat.bg,
    });

    setAmount('');
    setCategory('Food');
    setAccountName('Main Account');
    setDescription('');
    setNote('');
    setType('expense');

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={handleSave}>
          <Text style={styles.headerBtnText}>✓</Text>
        </TouchableOpacity>
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

      <View style={styles.amountContainer}>
        <Text style={styles.currencyLabel}>EGP</Text>
        <TextInput
          ref={amountInputRef}
          style={styles.amountInput}
          placeholder="0"
          placeholderTextColor={colors.text3}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, category === cat && styles.categoryBtnActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={styles.categoryIcon}>{categoryIcons[cat].icon}</Text>
                <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                  {cat}
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
            placeholder="What did you spend on?"
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
          <Text style={styles.saveBtnText}>Add Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
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
  fields: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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