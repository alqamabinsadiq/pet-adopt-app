import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../../foundation/theme';
import { Pet } from '../../../foundation/assets/data/dummyList';
import { getPetImage } from '../../../foundation/utils';

interface PetDetailsScreenProps {
  route: any;
  navigation: any;
}

const PetDetailsScreen: React.FC<PetDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { pet }: { pet: Pet } = route.params;

  const handleAdoptPress = () => {
    navigation.navigate('Adopt', { pet });
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const StatusBadge = ({ status }: { status: string }) => (
    <View style={[styles.statusBadge, { backgroundColor: colors.success }]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={getPetImage(pet)} style={styles.image} />
          <View style={styles.imageOverlay}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${pet.price}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.breed}>{pet.breed}</Text>
            </View>
            <StatusBadge status={pet.healthStatus} />
          </View>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.infoGrid}>
              <InfoRow
                label="Age"
                value={`${pet.age} year${pet.age !== 1 ? 's' : ''}`}
              />
              <InfoRow label="Gender" value={pet.gender} />
              <InfoRow label="Size" value={pet.size} />
              <InfoRow label="Species" value={pet.species} />
            </View>
          </View>

          {/* Health & Care */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health & Care</Text>
            <View style={styles.infoGrid}>
              <InfoRow
                label="Vaccinated"
                value={pet.vaccinated ? 'Yes' : 'No'}
              />
              <InfoRow label="Neutered" value={pet.neutered ? 'Yes' : 'No'} />
              <InfoRow label="Location" value={pet.location} />
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {pet.name}</Text>
            <Text style={styles.description}>{pet.description}</Text>
          </View>

          {/* Temperament */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Temperament</Text>
            <View style={styles.temperamentContainer}>
              {pet.temperament.map((trait, index) => (
                <View key={index} style={styles.temperamentBadge}>
                  <Text style={styles.temperamentText}>{trait}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Special Needs */}
          {pet.specialNeeds && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Needs</Text>
              <Text style={styles.description}>{pet.specialNeeds}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Adopt Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.adoptButton}
          onPress={handleAdoptPress}
          activeOpacity={0.8}
        >
          <Text style={styles.adoptButtonText}>Adopt {pet.name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  priceContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.accentDark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  price: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  breed: {
    fontSize: 18,
    color: colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
  },
  infoGrid: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: colors.textDark,
    lineHeight: 24,
  },
  temperamentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  temperamentBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  temperamentText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  adoptButton: {
    backgroundColor: colors.accentDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetDetailsScreen;
