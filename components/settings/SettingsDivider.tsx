import React from 'react';
import { View } from 'react-native';
import { theme } from '@/constants/theme';

const { colors } = theme;

export default function SettingsDivider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginLeft: 64,
        marginRight: 14,
      }}
    />
  );
}
