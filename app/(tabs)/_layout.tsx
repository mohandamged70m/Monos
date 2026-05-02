import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs as tabData } from "@/constants/data";
import { colors } from "@/constants/colors";
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { AnimatedTabBar } from '@/components/navigation/AnimatedTabBar';

const tabs = tabData.map(tab => ({
  name: tab.name,
  icon: tab.ionicon as 'home' | 'wallet' | 'flag' | 'analytics' | 'settings',
}));

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      console.log('[Tabs] Not authenticated, redirecting to sign-in');
      router.replace('/(auth)/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accentLight,
        tabBarInactiveTintColor: colors.text3,
      }}
      tabBar={(props) => (
        <AnimatedTabBar
          {...props}
          tabs={tabs}
        />
      )}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.name.charAt(0).toUpperCase() + tab.name.slice(1),
          }}
        />
      ))}
    </Tabs>
  );
}

export default TabLayout;
