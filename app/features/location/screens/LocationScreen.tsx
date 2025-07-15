import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../../../foundation/theme';

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate getting user location
  const getUserLocation = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock coordinates (you can replace with actual location service)
      const mockLocation = {
        latitude: 37.7749 + (Math.random() - 0.5) * 0.01, // San Francisco area
        longitude: -122.4194 + (Math.random() - 0.5) * 0.01,
      };

      setLocation(mockLocation);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleRefreshLocation = () => {
    getUserLocation();
  };

  const handleShareLocation = () => {
    if (location) {
      Alert.alert(
        'Share Location',
        `Your coordinates: ${location.latitude.toFixed(
          6,
        )}, ${location.longitude.toFixed(6)}`,
        [
          { text: 'Copy', onPress: () => console.log('Location copied') },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Location</Text>
          <Text style={styles.subtitle}>
            Find nearby pet shelters and adoption centers
          </Text>
        </View>

        {/* Location Display */}
        <View style={styles.locationCard}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Getting your location...</Text>
            </View>
          ) : location ? (
            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesLabel}>Current Coordinates</Text>
              <Text style={styles.coordinates}>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </Text>

              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>🗺️</Text>
                <Text style={styles.mapPlaceholderTitle}>Map View</Text>
                <Text style={styles.mapPlaceholderSubtitle}>
                  Google Maps integration would be here
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Unable to get location</Text>
            </View>
          )}
        </View>

        {/* Nearby Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Pet Shelters</Text>
          <View style={styles.placesList}>
            <View style={styles.placeItem}>
              <Text style={styles.placeIcon}>🏠</Text>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>Downtown Rescue Center</Text>
                <Text style={styles.placeDistance}>0.5 miles away</Text>
              </View>
            </View>
            <View style={styles.placeItem}>
              <Text style={styles.placeIcon}>🐾</Text>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>Cat Haven Shelter</Text>
                <Text style={styles.placeDistance}>1.2 miles away</Text>
              </View>
            </View>
            <View style={styles.placeItem}>
              <Text style={styles.placeIcon}>🏥</Text>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>Golden Hearts Rescue</Text>
                <Text style={styles.placeDistance}>2.1 miles away</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefreshLocation}
            activeOpacity={0.8}
          >
            <Text style={styles.refreshButtonText}>Refresh Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareLocation}
            activeOpacity={0.8}
            disabled={!location}
          >
            <Text style={styles.shareButtonText}>Share Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
  locationCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  coordinatesContainer: {
    alignItems: 'center',
  },
  coordinatesLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapPlaceholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  mapPlaceholderSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
  },
  placesList: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  placeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  placeDistance: {
    fontSize: 14,
    color: colors.textMuted,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  refreshButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.accentDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationScreen;
