import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PetListScreen from '../features/pets/screens/PetListScreen';
import PetDetailsScreen from '../features/pets/screens/PetDetailsScreen';
import AdoptScreen from '../features/adoption/screens/AdoptScreen';
import LocationScreen from '../features/location/screens/LocationScreen';
import { AppParamList } from './RouteParamTypes';

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PetList"
      screenOptions={{ headerLargeTitle: true }}
    >
      <Stack.Screen
        name="PetList"
        component={PetListScreen}
        options={{ title: 'Available Pets' }}
      />

      <Stack.Screen
        name="PetDetails"
        component={PetDetailsScreen}
        options={({ route }) => ({ title: route.params?.petId })}
      />

      {/* present payment as a modal */}
      <Stack.Screen
        name="Adopt"
        component={AdoptScreen}
        options={{ presentation: 'modal', title: 'Confirm Adoption' }}
      />

      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{ title: 'Your Coordinates' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
