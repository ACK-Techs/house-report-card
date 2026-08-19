import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 16,
          height: 64,
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
          borderRadius: 32,
          elevation: 12,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: 'Arama',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="compare"
        options={{
          href: null,
          title: 'Karşılaştır',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="git-compare" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          href: null,
          title: 'Kayıtlar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
