import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from '@/constants/theme';
import { useAuth } from '@clerk/clerk-expo';
import { createDB } from '@/utils/db';

const CATEGORIES = [
  'Food & Dining', 'Transport', 'Entertainment', 'Shopping',
  'Grocery', 'Personal', 'Bills', 'Health',
];

const COLORS = [
  '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#3B82F6', '#EC4899', '#14B8A6', '#F97316',
];

export default function BudgetForm({ onSave, onCancel }: { onSave?: () => void; onCancel?: () => void }) {
  const { getToken, userId } = useAuth();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [limit, setLimit] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleSave = async () => {
    if (!limit || isNaN(Number(limit)) || Number(limit) <= 0) {
      Alert.alert('Error', 'Please enter a valid budget limit');
      return;
    }

    try {
      const db = createDB(async () => (await getToken()) || '');
      await db.budgets.create({
        user_id: userId || '',
        category,
        limit: Number(limit),
        color,
      });

      onSave?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to create budget');
      console.error(error);
    }
  };

  const handleCategoryPress = () => {
    setShowCategoryPicker(true);
    Alert.alert(
      'Select Category',
      'Choose a category for this budget',
      CATEGORIES.map(cat => ({
        text: cat,
        onPress: () => {
          setCategory(cat);
          setShowCategoryPicker(false);
        },
      }))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => onCancel?.()}>
          <Text style={styles.headerBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Budget</Text>
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
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
        />
        <Text style={styles.perMonthLabel}>limit</Text>
      </View>

      <ScrollView style={styles.fields} showsVerticalScrollIndicator={false}>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity style={styles.categorySelector} onPress={handleCategoryPress}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
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
          <Text style={styles.saveBtnText}>Add Budget</Text>
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
  categorySelector: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  categoryText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
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
