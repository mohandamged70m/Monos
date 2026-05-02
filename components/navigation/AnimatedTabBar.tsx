import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { components } from '@/constants/theme';
import { colors } from '@/constants/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TAB_COUNT = 5;
const tabBar = components.tabBar;

interface TabItem {
  name: string;
  icon: string;
}

interface AnimatedTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  tabs: TabItem[];
}

export function AnimatedTabBar({ state, descriptors, navigation, tabs }: AnimatedTabBarProps) {
  const insets = useSafeAreaInsets();

  const pillPosition = useSharedValue(state.index);
  const prevIndex = useSharedValue(-1);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const triggerHaptic = useCallback(() => {
    Haptics.selectionAsync();
  }, []);

  useEffect(() => {
    const currentIndex = state.index;
    const previousIndex = prevIndex.value;

    if (previousIndex >= 0 && previousIndex !== currentIndex) {
      runOnJS(triggerHaptic)();
    }

    pillPosition.value = withSpring(currentIndex, {
      damping: 16,
      stiffness: 250,
      mass: 0.5,
    });

    prevIndex.value = currentIndex;
  }, [state.index]);

  const pillAnimatedStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / TAB_COUNT;
    return {
      transform: [{ translateX: pillPosition.value * tabWidth }],
    };
  });

  const handleTabPress = (index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(state.routes[index].name, state.routes[index].params);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
        },
      ]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.tabsRow}>
        {/* Sliding pill */}
        <Animated.View
          style={[
            pillAnimatedStyle,
            styles.pillWrapper,
            {
              width: containerWidth / TAB_COUNT,
            },
          ]}
        >
          <View style={styles.pillInner}>
            <LinearGradient
              colors={[
                'rgba(108, 92, 231, 0.20)',
                'rgba(167, 139, 250, 0.12)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.activeIndicator} />
          </View>
        </Animated.View>

        {/* Tab icons */}
        {tabs.map((tab, index) => {
          const isActive = state.index === index;
          return (
            <Pressable
              key={tab.name}
              style={styles.tabButton}
              onPress={() => handleTabPress(index)}
              android_ripple={{ color: 'rgba(108, 92, 231, 0.08)', borderless: true }}
            >
              <Ionicons
                name={tab.icon as any}
                size={isActive ? 24 : 22}
                color={isActive ? colors.accentLight : colors.text3}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  pillWrapper: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillInner: {
    width: 42,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.25)',
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    width: 12,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.accentLight,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
