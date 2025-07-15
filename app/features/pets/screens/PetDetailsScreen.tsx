// PetDetailsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const PetDetailsScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Test</Text>
      <Text>Test</Text>
      <Button
        title="Adopt"
        onPress={() => navigation.navigate('Adopt', { pet })}
      />
      <Button
        title="Show My Location"
        onPress={() => navigation.navigate('Location')}
      />
    </View>
  );
};

export default PetDetailsScreen;
