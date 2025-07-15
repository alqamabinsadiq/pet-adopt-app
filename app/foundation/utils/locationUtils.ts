import Geolocation from '@react-native-community/geolocation';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface LocationError {
  code: number;
  message: string;
}

/**
 * Get current device location with proper error handling
 * @param onSuccess - Callback when location is successfully retrieved
 * @param onError - Callback when location retrieval fails
 * @param options - Geolocation options
 */
export const getCurrentLocation = (
  onSuccess: (location: LocationData) => void,
  onError: (error: LocationError) => void,
  options: {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  } = {},
) => {
  const defaultOptions = {
    enableHighAccuracy: false, // Changed to false for faster response
    timeout: 8000, // Reduced from 15000ms to 8000ms
    maximumAge: 30000, // Increased from 10000ms to 30000ms for better caching
    ...options,
  };

  console.log('Requesting location with options:', defaultOptions);

  Geolocation.getCurrentPosition(
    position => {
      console.log('Location success:', position);
      const location: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };
      onSuccess(location);
    },
    error => {
      console.log('Location error:', error);
      const locationError: LocationError = {
        code: error.code,
        message: getErrorMessage(error.code),
      };
      onError(locationError);
    },
    defaultOptions,
  );
};

/**
 * Get mock location for simulator testing
 * @returns Mock location data
 */
export const getMockLocation = (): LocationData => {
  // Generate random coordinates around San Francisco for testing
  const baseLat = 37.7749;
  const baseLng = -122.4194;
  const randomOffset = (Math.random() - 0.5) * 0.01; // ±0.005 degrees (~500m)

  return {
    latitude: baseLat + randomOffset,
    longitude: baseLng + randomOffset,
    accuracy: 10,
    timestamp: Date.now(),
  };
};

/**
 * Check if geolocation is available
 * @returns Promise that resolves to boolean
 */
export const isGeolocationAvailable = (): Promise<boolean> => {
  return new Promise(resolve => {
    console.log('Checking geolocation availability...');

    // First try a quick check
    Geolocation.getCurrentPosition(
      () => {
        console.log('Geolocation is available');
        resolve(true);
      },
      error => {
        console.log('Geolocation check failed:', error);
        // If permission denied, we still consider it "available" but denied
        if (error.code === 1) {
          console.log('Permission denied but geolocation is available');
          resolve(true);
        } else {
          console.log('Geolocation not available');
          resolve(false);
        }
      },
      {
        timeout: 3000, // Reduced from 5000ms to 3000ms for faster check
        enableHighAccuracy: false,
        maximumAge: 60000, // Use cached location if available
      },
    );
  });
};

/**
 * Get human-readable error message for geolocation errors
 * @param errorCode - Geolocation error code
 * @returns Error message string
 */
const getErrorMessage = (errorCode: number): string => {
  switch (errorCode) {
    case 1:
      return 'Location permission denied. Please enable location services in your device settings.';
    case 2:
      return 'Location unavailable. Please check your GPS and try again.';
    case 3:
      return 'Location request timed out. Please try again.';
    default:
      return 'Unable to get your location. Please try again.';
  }
};

/**
 * Format coordinates for display
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @param precision - Number of decimal places (default: 6)
 * @returns Formatted coordinate string
 */
export const formatCoordinates = (
  latitude: number,
  longitude: number,
  precision: number = 6,
): string => {
  return `${latitude.toFixed(precision)}, ${longitude.toFixed(precision)}`;
};

/**
 * Calculate distance between two coordinates in kilometers
 * @param lat1 - First latitude
 * @param lon1 - First longitude
 * @param lat2 - Second latitude
 * @param lon2 - Second longitude
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
