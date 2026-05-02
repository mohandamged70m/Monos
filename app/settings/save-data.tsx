import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

export default function SaveDataScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Save a Copy of My Data" />
        
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 20 }}>
          Export your data in your preferred format
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 12,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#22C55E' + '20', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
            <Ionicons name="document-outline" size={20} color="#22C55E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Export as CSV</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>Compatible with Excel and Google Sheets</Text>
          </View>
          <Ionicons name="download-outline" size={20} color={colors.accent} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 12,
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#3B82F6' + '20', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
            <Ionicons name="code-outline" size={20} color="#3B82F6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>Export as JSON</Text>
            <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>Full data with all details</Text>
          </View>
          <Ionicons name="download-outline" size={20} color={colors.accent} />
        </TouchableOpacity>

        <View style={{ marginTop: 20, padding: 16, backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center' }}>
            Last export: Never
          </Text>
        </View>
      </View>
    </View>
  );
}
