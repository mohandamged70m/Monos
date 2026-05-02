import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useBills } from '@/context/BillsContext';
import { useAuth } from '@clerk/clerk-expo';
import { createDB } from '@/utils/db';

type CycleType = 'daily' | 'weekly' | 'monthly' | 'yearly';
type StatusType = 'active' | 'paused';

const cycleLabels: Record<CycleType, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

export default function SubscriptionForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const { getToken, userId } = useAuth();
  const { refetch } = useBills();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [cycle, setCycle] = useState<CycleType>('monthly');
  const [nextRenewal, setNextRenewal] = useState('');
  const [status, setStatus] = useState<StatusType>('active');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a subscription name');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (!nextRenewal.trim()) {
      Alert.alert('Error', 'Please enter the next renewal date');
      return;
    }

    try {
      const db = createDB(async () => (await getToken()) || '');
      await db.subscriptions.create({
        user_id: userId || '',
        name: name.trim(),
        amount: Number(amount),
        cycle,
        next_renewal: nextRenewal,
        status,
      });

      await refetch();
      onSave?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to create subscription');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Subscription</Text>
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
      </View>

      <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Netflix"
            placeholderTextColor={theme.colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Billing Cycle</Text>
          <View style={styles.segmentedControl}>
            {(Object.keys(cycleLabels) as CycleType[]).map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.segment, cycle === c && styles.segmentActive]}
                onPress={() => setCycle(c)}
              >
                <Text style={[styles.segmentText, cycle === c && styles.segmentTextActive]}>
                  {cycleLabels[c]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Next Renewal Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.textMuted}
            value={nextRenewal}
            onChangeText={setNextRenewal}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[styles.segment, status === 'active' && styles.segmentActive]}
              onPress={() => setStatus('active')}
            >
              <Text style={[styles.segmentText, status === 'active' && styles.segmentTextActive]}>
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segment, status === 'paused' && styles.segmentActive]}
              onPress={() => setStatus('paused')}
            >
              <Text style={[styles.segmentText, status === 'paused' && styles.segmentTextActive]}>
                Paused
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Add Subscription</Text>
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
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentActive: {
    backgroundColor: theme.colors.teal,
  },
  segmentText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: theme.colors.teal,
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
