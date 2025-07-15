import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import { colors } from '../../../foundation/theme';
import {
  getCurrentLocation,
  getMockLocation,
  isGeolocationAvailable,
  formatCoordinates,
  calculateDistance,
  type LocationData,
} from '../../../foundation/utils';

// Request Android runtime permission
async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Pet App Location Permission',
        message:
          'Pet Adoption App needs access to your location while you use the app to show nearby shelters.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    console.log('Android location permission:', granted);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission error', err);
    return false;
  }
}

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSimulator, setIsSimulator] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const locationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're running on simulator
  useEffect(() => {
    const checkEnvironment = async () => {
      const isAvailable = await isGeolocationAvailable();
      setIsSimulator(!isAvailable);
      setHasPermission(isAvailable);
    };
    checkEnvironment();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locationTimeoutRef.current) clearTimeout(locationTimeoutRef.current);
    };
  }, []);

  const requestPermissionAndGetLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLocation(null);
    setPermissionRequested(true);

    // Clear any existing timeout
    if (locationTimeoutRef.current) {
      clearTimeout(locationTimeoutRef.current);
    }

    if (isSimulator) {
      // Use mock location for simulator with shorter delay
      locationTimeoutRef.current = setTimeout(() => {
        const mockLocation = getMockLocation();
        setLocation(mockLocation);
        setIsLoading(false);
      }, 500);
      return;
    }

    // Request permission first (Android)
    if (Platform.OS === 'android') {
      const granted = await requestLocationPermission();
      if (!granted) {
        setError('Location permission denied. Please enable it in Settings.');
        setHasPermission(false);
        setIsLoading(false);
        return;
      }
      setHasPermission(true);
    }

    // Now fetch location after permission is granted
    getCurrentLocation(
      locationData => {
        console.log('Location fetched successfully:', locationData);
        setLocation(locationData);
        setIsLoading(false);
        setHasPermission(true);
      },
      locationError => {
        console.log('Location error:', locationError);
        setError(locationError.message);
        setIsLoading(false);

        // Handle different error cases
        if (locationError.code === 1) {
          // Permission denied
          setHasPermission(false);
        } else if (locationError.code === 2) {
          // Location unavailable - could be GPS off
          setHasPermission(true); // Permission might be granted but GPS off
        } else if (locationError.code === 3) {
          // Timeout - could be slow GPS
          setHasPermission(true); // Permission likely granted
        }
      },
      {
        enableHighAccuracy: false, // Changed to false for faster response
        timeout: 8000, // Reduced from 10000ms to 8000ms
        maximumAge: 30000, // Increased from 5000ms to 30000ms for better caching
      },
    );
  }, [isSimulator]);

  // Reset state when component mounts (fresh start)
  useEffect(() => {
    setLocation(null);
    setError(null);
    setIsLoading(false);
    setPermissionRequested(false);
    // Don't auto-start location fetching - wait for user action or manual refresh
  }, []);

  const handleRefreshLocation = () => {
    if (!isLoading) {
      requestPermissionAndGetLocation();
    }
  };

  const handleShareLocation = () => {
    if (location && !isLoading) {
      const coordinates = formatCoordinates(
        location.latitude,
        location.longitude,
      );
      Alert.alert('Share Location', `Your coordinates: ${coordinates}`, [
        { text: 'Copy', onPress: () => console.log('Location copied') },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };

  // Calculate distances to nearby shelters
  const getNearbyShelters = () => {
    if (!location) return [];

    const shelters = [
      { name: 'Downtown Rescue Center', lat: 37.7749, lng: -122.4194 },
      { name: 'Cat Haven Shelter', lat: 37.7849, lng: -122.4094 },
      { name: 'Golden Hearts Rescue', lat: 37.7649, lng: -122.4294 },
    ];

    return shelters
      .map(shelter => ({
        ...shelter,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          shelter.lat,
          shelter.lng,
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  const nearbyShelters = getNearbyShelters();

  // Show different content based on state
  const renderLocationContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Getting your location...</Text>
          <Text style={styles.loadingSubtext}>
            {isSimulator
              ? 'Simulating location data...'
              : !permissionRequested
              ? 'Requesting location permission...'
              : 'Please wait while we get your GPS coordinates'}
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {hasPermission === false && (
            <Text style={styles.errorSubtext}>
              Please enable location services in your device settings and try
              again.
            </Text>
          )}
        </View>
      );
    }

    if (location) {
      return (
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesLabel}>Current Coordinates</Text>
          <Text style={styles.coordinates}>
            {formatCoordinates(location.latitude, location.longitude)}
          </Text>

          {location.accuracy && (
            <Text style={styles.accuracyText}>
              Accuracy: ±{Math.round(location.accuracy)} meters
            </Text>
          )}

          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>🗺️</Text>
            <Text style={styles.mapPlaceholderTitle}>Map View</Text>
            <Text style={styles.mapPlaceholderSubtitle}>
              {isSimulator
                ? 'Simulated location for testing'
                : 'Google Maps integration would be here'}
            </Text>
          </View>
        </View>
      );
    }

    // Initial state - no location, no error, not loading
    return (
      <View style={styles.initialContainer}>
        <Text style={styles.initialText}>📍</Text>
        <Text style={styles.initialTitle}>Get Your Location</Text>
        <Text style={styles.initialSubtitle}>
          Tap the refresh button below to get your current location and find
          nearby pet shelters.
        </Text>
        <TouchableOpacity
          style={styles.getLocationButton}
          onPress={requestPermissionAndGetLocation}
          activeOpacity={0.8}
        >
          <Text style={styles.getLocationButtonText}>Get My Location</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Location</Text>
          <Text style={styles.subtitle}>
            Find nearby pet shelters and adoption centers
          </Text>
          {isSimulator && (
            <View style={styles.simulatorBadge}>
              <Text style={styles.simulatorText}>Simulator Mode</Text>
            </View>
          )}
        </View>

        {/* Location Display */}
        <View style={styles.locationCard}>{renderLocationContent()}</View>

        {/* Nearby Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Pet Shelters</Text>
          <View style={styles.placesList}>
            {nearbyShelters.map((shelter, index) => (
              <View key={index} style={styles.placeItem}>
                <Text style={styles.placeIcon}>🏠</Text>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{shelter.name}</Text>
                  <Text style={styles.placeDistance}>
                    {shelter.distance.toFixed(1)} km away
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.refreshButton, isLoading && styles.disabledButton]}
            onPress={handleRefreshLocation}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.textLight} />
            ) : (
              <Text style={styles.refreshButtonText}>Refresh Location</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shareButton,
              (!location || isLoading) && styles.disabledButton,
            ]}
            onPress={handleShareLocation}
            activeOpacity={0.8}
            disabled={!location || isLoading}
          >
            <Text style={styles.shareButtonText}>Share Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Extra padding at bottom for better scrolling
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
    marginBottom: 8,
  },
  simulatorBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  simulatorText: {
    color: colors.textDark,
    fontSize: 12,
    fontWeight: '600',
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
  initialContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  initialText: {
    fontSize: 64,
    marginBottom: 16,
  },
  initialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  initialSubtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  getLocationButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  getLocationButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  accuracyText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 20,
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
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
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
    justifyContent: 'center',
    minHeight: 56,
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
    justifyContent: 'center',
    minHeight: 56,
  },
  shareButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default LocationScreen;
