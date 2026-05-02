import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

type AutoRule = {
  id: string;
  condition: string;
  action: string;
  enabled: boolean;
};

const mockRules: AutoRule[] = [
  { id: '1', condition: 'Amount > $100', action: 'Tag as "Large Purchase"', enabled: true },
  { id: '2', condition: 'Vendor contains "Coffee"', action: 'Tag as "Food"', enabled: true },
  { id: '3', condition: 'Weekend transaction', action: 'Tag as "Leisure"', enabled: false },
];

export default function AutoRulesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="Auto-Rules" />
        
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 16 }}>
          Set up automation flows to track transactions automatically
        </Text>

        <View style={{ backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border }}>
          {mockRules.map((rule, index) => (
            <View key={rule.id}>
              {index > 0 && <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 16 }} />}
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ backgroundColor: colors.accentSubtle, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 8 }}>
                      <Text style={{ color: colors.accent, fontSize: 11, fontWeight: '600' }}>IF</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: colors.textPrimary, flex: 1 }}>{rule.condition}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: colors.success + '30', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 8 }}>
                      <Text style={{ color: colors.success, fontSize: 11, fontWeight: '600' }}>THEN</Text>
                    </View>
                    <Text style={{ fontSize: 14, color: colors.textPrimary, flex: 1 }}>{rule.action}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={{ marginTop: 8 }} />
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
          <Text style={{ color: colors.accent, fontSize: 15, fontWeight: '600', marginLeft: 8 }}>Create New Rule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
