import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '@/constants/theme';

const { colors } = theme;

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: colors.textMuted,
          marginBottom: 8,
          marginLeft: 4,
          letterSpacing: 0.8,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 18,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {children}
      </View>
    </View>
  );
}
