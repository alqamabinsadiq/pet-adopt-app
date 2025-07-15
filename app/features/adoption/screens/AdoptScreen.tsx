import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { colors } from '../../../foundation/theme';
import { Pet } from '../../../foundation/assets/data/dummyList';
import { getPetImage } from '../../../foundation/utils';
import { InfoRow } from '../components';

interface AdoptScreenProps {
  route: any;
  navigation: any;
}

const AdoptScreen: React.FC<AdoptScreenProps> = ({ route, navigation }) => {
  const { pet }: { pet: Pet } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmAdoption = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Adoption Successful! 🎉',
        `Congratulations! You've successfully adopted ${pet.name}. You'll receive a confirmation email with next steps.`,
        [
          {
            text: 'Great!',
            onPress: () => {
              // Navigate back to the main tabs to show the pet list
              navigation.navigate('MainTabs');
            },
          },
        ],
      );
    }, 2000);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Confirm Adoption</Text>
          <Text style={styles.headerSubtitle}>
            You're about to give {pet.name} a forever home!
          </Text>
        </View>

        {/* Pet Preview */}
        <View style={styles.petPreview}>
          <Image source={getPetImage(pet)} style={styles.petImage} />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
            <Text style={styles.petAge}>
              {pet.age} year{pet.age !== 1 ? 's' : ''} old • {pet.gender}
            </Text>
          </View>
        </View>

        {/* Adoption Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adoption Details</Text>
          <View style={styles.detailsCard}>
            <InfoRow label="Adoption Fee" value={`$${pet.price}`} />
            <InfoRow label="Processing Fee" value="$25" />
            <View style={styles.divider} />
            <InfoRow label="Total Amount" value={`$${pet.price + 25}`} />
          </View>
        </View>

        {/* What's Included */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.includedCard}>
            <View style={styles.includedItem}>
              <Text style={styles.includedIcon}>🏥</Text>
              <Text style={styles.includedText}>Health Certificate</Text>
            </View>
            <View style={styles.includedItem}>
              <Text style={styles.includedIcon}>💉</Text>
              <Text style={styles.includedText}>Vaccination Records</Text>
            </View>
            <View style={styles.includedItem}>
              <Text style={styles.includedIcon}>📋</Text>
              <Text style={styles.includedText}>Adoption Papers</Text>
            </View>
            <View style={styles.includedItem}>
              <Text style={styles.includedIcon}>🏠</Text>
              <Text style={styles.includedText}>Home Visit Support</Text>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <View style={styles.stepsCard}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Complete payment</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Schedule pickup</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Welcome {pet.name} home!</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            isProcessing && styles.processingButton,
          ]}
          onPress={handleConfirmAdoption}
          activeOpacity={0.8}
          disabled={isProcessing}
        >
          <Text style={styles.confirmButtonText}>
            {isProcessing
              ? 'Processing...'
              : `Adopt ${pet.name} - $${pet.price + 25}`}
          </Text>
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
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  petPreview: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.backgroundLight,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 4,
  },
  petAge: {
    fontSize: 14,
    color: colors.textMuted,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  includedCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  includedIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  includedText: {
    fontSize: 16,
    color: colors.textDark,
  },
  stepsCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: colors.textDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: colors.accentDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  processingButton: {
    backgroundColor: colors.textMuted,
  },
  confirmButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdoptScreen;
