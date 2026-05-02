'use client';

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { colors } from '@/constants/colors';
import { useTransactions } from '@/context/TransactionsContext';

const accounts = [
  { name: 'Main Account', currency: 'EGP' },
  { name: 'Savings', currency: 'EGP' },
  { name: 'Secondary', currency: 'USD' },
];

interface TransferFormProps {
  onSave?: () => void;
}

export default function TransferForm({ onSave }: TransferFormProps) {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('Main Account');
  const [toAccount, setToAccount] = useState('Savings');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (fromAccount === toAccount) {
      Alert.alert('Error', 'Please select different accounts for transfer');
      return;
    }

    addTransaction({
      merchant: description.trim() || `Transfer: ${fromAccount} → ${toAccount}`,
      amount: Number(amount),
      category: 'Transfer',
      type: 'transfer',
      account: fromAccount,
      description: `${fromAccount} → ${toAccount}`,
      note: note.trim() || undefined,
    });

    onSave?.();
  };

  const showFromAccountPicker = () => {
    Alert.alert(
      'From Account',
      'Select the source account',
      accounts.map(acc => ({
        text: `${acc.name} (${acc.currency})`,
        onPress: () => setFromAccount(acc.name),
      }))
    );
  };

  const showToAccountPicker = () => {
    Alert.alert(
      'To Account',
      'Select the destination account',
      accounts.filter(a => a.name !== fromAccount).map(acc => ({
        text: `${acc.name} (${acc.currency})`,
        onPress: () => setToAccount(acc.name),
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

      <TouchableOpacity style={styles.field} onPress={showFromAccountPicker}>
        <Text style={styles.label}>From Account</Text>
        <View style={styles.accountRow}>
          <View style={styles.accountIconContainer}>
            <Text style={styles.accountIcon}>📤</Text>
          </View>
          <Text style={styles.accountName}>{fromAccount}</Text>
          <Text style={styles.accountCurrency}>
            {accounts.find(a => a.name === fromAccount)?.currency}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.transferArrow}>
        <Text style={styles.transferArrowIcon}>↓</Text>
      </View>

      <TouchableOpacity style={styles.field} onPress={showToAccountPicker}>
        <Text style={styles.label}>To Account</Text>
        <View style={styles.accountRow}>
          <View style={styles.accountIconContainer}>
            <Text style={styles.accountIcon}>📥</Text>
          </View>
          <Text style={styles.accountName}>{toAccount}</Text>
          <Text style={styles.accountCurrency}>
            {accounts.find(a => a.name === toAccount)?.currency}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.field}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="What is this transfer for?"
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
        <Text style={styles.saveBtnText}>Add Transfer</Text>
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
    marginBottom: 8,
  },
  label: {
    color: colors.text2,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
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
  accountIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountIcon: {
    fontSize: 16,
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
  transferArrow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  transferArrowIcon: {
    fontSize: 20,
    color: colors.teal,
    fontWeight: '700',
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
