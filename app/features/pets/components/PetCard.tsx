import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../foundation/theme';
import { Pet } from '../../../foundation/assets/data/dummyList';
import { getPetImage } from '../../../foundation/utils';

interface PetCardProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(pet)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={getPetImage(pet)} style={styles.image} />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${pet.price}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pet.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pet.species}</Text>
          </View>
        </View>

        <Text style={styles.breed}>{pet.breed}</Text>

        <View style={styles.details}>
          <Text style={styles.detailText}>
            {pet.age} year{pet.age !== 1 ? 's' : ''} • {pet.gender} • {pet.size}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {pet.description}
        </Text>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>📍 {pet.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accentDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  breed: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default PetCard;
