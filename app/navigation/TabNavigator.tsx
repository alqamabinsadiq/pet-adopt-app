import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text } from 'react-native';
import { colors } from '../foundation/theme';
import PetListScreen from '../features/pets/screens/PetListScreen';
import LocationScreen from '../features/location/screens/LocationScreen';
import { TabParamList } from './RouteParamTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 16 + insets.bottom / 2 : 16,
          height: Platform.OS === 'ios' ? 60 + insets.bottom : 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={PetListScreen}
        options={{
          title: 'Available Pets',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          title: 'Location',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📍</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
