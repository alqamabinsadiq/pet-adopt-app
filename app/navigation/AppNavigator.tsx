import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import PetDetailsScreen from '../features/pets/screens/PetDetailsScreen';
import AdoptScreen from '../features/adoption/screens/AdoptScreen';
import { AppParamList } from './RouteParamTypes';

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      <Stack.Screen
        name="PetDetails"
        component={PetDetailsScreen}
        options={{
          headerShown: true,
          presentation: 'card',
          headerStyle: {
            backgroundColor: '#FF6B5B',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      {/* present payment as a modal */}
      <Stack.Screen
        name="Adopt"
        component={AdoptScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
