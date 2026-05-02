import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

type AutoTagRule = {
  id: string;
  vendor: string;
  tag: string;
  tagColor: string;
};

const mockRules: AutoTagRule[] = [
  { id: '1', vendor: 'Starbucks', tag: 'Food', tagColor: '#EF4444' },
  { id: '2', vendor: 'Uber', tag: 'Transport', tagColor: '#3B82F6' },
  { id: '3', vendor: 'Netflix', tag: 'Entertainment', tagColor: '#8B5CF6' },
];

export default function VendorAutoTagsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Vendor Auto-Tags" />
        
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 16 }}>
          Automatically assign tags to transactions based on vendor name
        </Text>

        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          {mockRules.map((rule, index) => (
            <View key={rule.id}>
              {index > 0 && <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 12 }} />}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>{rule.vendor}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ fontSize: 13, color: colors.textSecondary }}>→</Text>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: rule.tagColor, marginHorizontal: 6 }} />
                    <Text style={{ fontSize: 13, color: colors.textSecondary }}>{rule.tag}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 14,
            marginTop: 20,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Ionicons name="add" size={20} color={colors.accent} />
          <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '600', marginLeft: 8 }}>Add New Rule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
