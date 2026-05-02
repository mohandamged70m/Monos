import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

type Tag = {
  id: string;
  name: string;
  color: string;
};

const mockTags: Tag[] = [
  { id: '1', name: 'Food', color: '#EF4444' },
  { id: '2', name: 'Transport', color: '#3B82F6' },
  { id: '3', name: 'Entertainment', color: '#8B5CF6' },
  { id: '4', name: 'Shopping', color: '#F59E0B' },
];

export default function TagsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Tags & Labels" />
        
        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 16 }}>Your Tags</Text>
          
          {mockTags.map((tag) => (
            <View key={tag.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: tag.color, marginRight: 12 }} />
                <Text style={{ fontSize: 15, color: colors.textPrimary }}>{tag.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
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
          <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '600', marginLeft: 8 }}>Add New Tag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
