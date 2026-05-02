import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useAuth } from '@clerk/clerk-expo';
import { createDB } from '@/utils/db';

const COLORS = [
  '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#3B82F6', '#EC4899', '#14B8A6', '#F97316',
];

const EMOJIS = ['🎯', '🏠', '🚗', '✈️', '💻', '📱', '🎓', '💍', '🏖️', '🎮'];

export default function GoalForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const { getToken, userId } = useAuth();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('0');
  const [emoji, setEmoji] = useState('🎯');
  const [deadline, setDeadline] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }
    if (!target || isNaN(Number(target)) || Number(target) <= 0) {
      Alert.alert('Error', 'Please enter a valid target amount');
      return;
    }

    try {
      const db = createDB(async () => (await getToken()) || '');
      await db.goals.create({
        user_id: userId || '',
        name: name.trim(),
        target: Number(target),
        saved: Number(saved) || 0,
        emoji,
        deadline: deadline.trim() || null,
        color,
        monthly_contribution: Number(monthlyContribution) || 0,
      });

      console.log('Goal saved successfully, calling onSave...');
      onSave?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to create goal');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Goal</Text>
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
          value={target}
          onChangeText={setTarget}
          keyboardType="numeric"
        />
        <Text style={styles.perMonthLabel}>target</Text>
      </View>

      <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. New Laptop"
            placeholderTextColor={theme.colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Emoji</Text>
          <View style={styles.emojiGrid}>
            {EMOJIS.map((e) => (
              <TouchableOpacity
                key={e}
                style={[styles.emojiBtn, emoji === e && styles.emojiBtnActive]}
                onPress={() => setEmoji(e)}
              >
                <Text style={styles.emojiText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Saved Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={theme.colors.textMuted}
            value={saved}
            onChangeText={setSaved}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Monthly Contribution</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={theme.colors.textMuted}
            value={monthlyContribution}
            onChangeText={setMonthlyContribution}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Deadline (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme.colors.textMuted}
            value={deadline}
            onChangeText={setDeadline}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorGrid}>
            {COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.colorBtn, { backgroundColor: c }, color === c && styles.colorBtnActive]}
                onPress={() => setColor(c)}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Add Goal</Text>
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
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBtnActive: {
    backgroundColor: theme.colors.accent,
  },
  emojiText: {
    fontSize: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  colorBtnActive: {
    borderWidth: 3,
    borderColor: '#fff',
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
