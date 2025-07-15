import React from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { PetCard } from '../components';
import { dummyList, Pet } from '../../../foundation/assets/data/dummyList';
import { colors } from '../../../foundation/theme';

interface PetListScreenProps {
  navigation: any;
}

const PetListScreen: React.FC<PetListScreenProps> = ({ navigation }) => {
  const handlePetPress = (pet: Pet) => {
    navigation.navigate('PetDetails', { pet });
  };

  const renderPetCard = ({ item }: { item: Pet }) => (
    <PetCard pet={item} onPress={handlePetPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyList}
        renderItem={renderPetCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  listContainer: {
    paddingVertical: 12,
    paddingBottom: 20, // Extra padding at bottom for better scrolling
  },
});

export default PetListScreen;
