import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import SettingsHeader from '@/components/settings/SettingsHeader';

const { colors } = theme;

type ChangelogItem = {
  version: string;
  date: string;
  features: string[];
};

const changelog: ChangelogItem[] = [
  {
    version: '2.4.1',
    date: 'April 2026',
    features: [
      'Improved transaction categorization',
      'Bug fixes and performance improvements',
      'New vendor auto-tagging feature',
    ],
  },
  {
    version: '2.4.0',
    date: 'March 2026',
    features: [
      'Auto-rules for automation',
      'Enhanced insights dashboard',
      'Dark mode improvements',
    ],
  },
  {
    version: '2.3.0',
    date: 'February 2026',
    features: [
      'SMS import feature',
      'New tag management system',
      'Bank account integration',
    ],
  },
];

export default function WhatsNewScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}>
        <SettingsHeader title="What's New" />
        
        {changelog.map((item) => (
          <View
            key={item.version}
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>v{item.version}</Text>
              <Text style={{ fontSize: 13, color: colors.textMuted }}>{item.date}</Text>
            </View>
            {item.features.map((feature, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} style={{ marginTop: 2, marginRight: 8 }} />
                <Text style={{ fontSize: 14, color: colors.textSecondary, flex: 1 }}>{feature}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
