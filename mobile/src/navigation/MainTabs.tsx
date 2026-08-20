import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import { CompareScreen } from '@/screens/CompareScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SavedScreen } from '@/screens/SavedScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { colors, fonts } from '@/theme';

import { TabIcon } from './TabIcons';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Aktif sekmenin üstündeki 3px belirteç çizgisi. */
function ActiveIndicator({ visible }: { visible: boolean }) {
  return (
    <View
      style={[styles.indicator, { backgroundColor: visible ? colors.primary : 'transparent' }]}
    />
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#5F6A63',
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarIcon: ({ color, focused }) => (
          <>
            <ActiveIndicator visible={focused} />
            <TabIcon route={route.name} color={color} />
          </>
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Ana Sayfa', tabBarAccessibilityLabel: 'Ana sayfa sekmesi' }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: 'Harita', tabBarAccessibilityLabel: 'Harita ve bina arama sekmesi' }}
      />
      <Tab.Screen
        name="CompareTab"
        component={CompareScreen}
        options={{ title: 'Kıyasla', tabBarAccessibilityLabel: 'Kıyaslama sekmesi' }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{ title: 'Kayıtlar', tabBarAccessibilityLabel: 'Kaydedilenler sekmesi' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profil', tabBarAccessibilityLabel: 'Profil sekmesi' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 74,
    paddingTop: 6,
    paddingBottom: 14,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  item: { paddingTop: 4 },
  label: { fontFamily: fonts.bodySemibold, fontSize: 10, letterSpacing: 0.1 },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 22,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
