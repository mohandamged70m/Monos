import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useBills } from '@/context/BillsContext';
import { useAuth } from '@clerk/clerk-expo';
import { createDB } from '@/utils/db';

export default function InstallmentForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const { getToken, userId } = useAuth();
  const { refetch } = useBills();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [totalMonths, setTotalMonths] = useState('');
  const [paidMonths, setPaidMonths] = useState('0');
  const [nextPaymentDate, setNextPaymentDate] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an installment name');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid monthly amount');
      return;
    }
    if (!totalMonths || isNaN(Number(totalMonths)) || Number(totalMonths) <= 0) {
      Alert.alert('Error', 'Please enter a valid total months');
      return;
    }
    if (!paidMonths || isNaN(Number(paidMonths)) || Number(paidMonths) < 0) {
      Alert.alert('Error', 'Please enter a valid paid months count');
      return;
    }
    if (!nextPaymentDate.trim()) {
      Alert.alert('Error', 'Please enter the next payment date');
      return;
    }

    const total = Number(totalMonths);
    const paid = Number(paidMonths);
    const remainingAmount = Number(amount) * (total - paid);
    
    let status: 'active' | 'warning' | 'completed' = 'active';
    if (paid >= total) {
      status = 'completed';
    }

    try {
      const db = createDB(async () => (await getToken()) || '');
      await db.installments.create({
        user_id: userId || '',
        name: name.trim(),
        amount: Number(amount),
        total_months: total,
        paid_months: paid,
        remaining_amount: remainingAmount,
        next_payment_date: nextPaymentDate,
        status,
      });

      await refetch();
      onSave?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to create installment');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Installment</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={handleSave}>
          <Text style={styles.headerBtnText}>✓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.currencyLabel}>EGP</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0"
          placeholderTextColor={theme.colors.textMuted}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Text style={styles.perMonthLabel}>/month</Text>
      </View>

      <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. ValU"
            placeholderTextColor={theme.colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Total Months</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 12"
            placeholderTextColor={theme.colors.textMuted}
            value={totalMonths}
            onChangeText={setTotalMonths}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Paid Months</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={theme.colors.textMuted}
            value={paidMonths}
            onChangeText={setPaidMonths}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Next Payment Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.textMuted}
            value={nextPaymentDate}
            onChangeText={setNextPaymentDate}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Add Installment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
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
    color: theme.colors.textPrimary,
    minWidth: 100,
    textAlign: 'center',
  },
  perMonthLabel: {
    color: theme.colors.textMuted,
    fontSize: 16,
    fontWeight: '500',
  },
  fields: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.textPrimary,
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
