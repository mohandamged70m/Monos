import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

const { colors } = theme;

type SettingsRowProps = {
  icon: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
};

export default function SettingsRow({
  icon,
  iconColor,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: iconColor + '30',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 14,
        }}
      >
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, color: colors.textPrimary, fontWeight: '500' }}>{title}</Text>
        {subtitle && (
          <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>{subtitle}</Text>
        )}
      </View>
      <View style={{ marginLeft: 10, minWidth: 60, alignItems: 'flex-end' }}>
        {rightElement}
        {showChevron && !rightElement && (
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );
}
