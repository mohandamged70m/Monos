import { components } from "@/constants/theme";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabs } from "@/constants/data";
import { colors } from "@/constants/colors";

const tabBar = components.tabBar;


const TabLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs 
      screenOptions={{ 
        headerShown : false,
        tabBarActiveTintColor: colors.text1,
        tabBarInactiveTintColor: colors.text3,
        tabBarStyle : {
          position : 'absolute',
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height : tabBar.height,
          marginHorizontal : tabBar.horizontalInset,
          borderRadius : tabBar.radius,
          backgroundColor : colors.primary,
          borderTopWidth : 0,
          elevation : 0,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen 
          key={tab.name} 
          name={tab.name} 
          options={{ 
            title : tab.title,
          }} />
      ))}
    </Tabs>
  );
}

export default TabLayout