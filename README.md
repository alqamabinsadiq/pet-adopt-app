# PetWatch - Pet Adoption App

A beautiful React Native app for pet adoption with a modern UI design inspired by the PetWatch brand colors.

## Features

### ✅ Completed Features

1. **Pet Listing Screen**

   - Beautiful card-based design with pet images
   - Shows pet name, breed, age, gender, and price
   - Smooth scrolling with FlatList
   - Theme-consistent design with coral-orange primary color

2. **Pet Details Screen**

   - Comprehensive pet information display
   - Health status, vaccination, and neutering details
   - Temperament badges
   - Beautiful hero image with price overlay
   - Adopt button for easy adoption process

3. **Adoption Process**

   - Mock payment screen with adoption confirmation
   - Processing animation and success feedback
   - Detailed breakdown of adoption fees
   - What's included section (health certificate, vaccination records, etc.)
   - Step-by-step next steps guide

4. **Location Screen**

   - Simulated location services
   - Displays user coordinates
   - Map placeholder for Google Maps integration
   - Nearby pet shelters list
   - Refresh and share location functionality

5. **Navigation**
   - Bottom tab navigation with Home and Location tabs
   - Stack navigation for pet details and adoption flow
   - Modal presentation for adoption screen
   - Consistent theming throughout

### 🎨 Design Features

- **Theme Colors**: Based on PetWatch brand colors
  - Primary: Coral-orange (#FF6B5B)
  - Accent Dark: Dark blue/purple (#333B5C)
  - Accent Purple: (#8A4D9F)
  - Accent Teal: (#34C7D8)
- **Modern UI**: Clean, card-based design with shadows and rounded corners
- **Responsive**: Works on different screen sizes
- **Accessible**: Proper contrast ratios and touch targets

## Project Structure

```
app/
├── features/
│   ├── adoption/
│   │   └── screens/
│   │       └── AdoptScreen.tsx
│   ├── location/
│   │   └── screens/
│   │       └── LocationScreen.tsx
│   └── pets/
│       ├── components/
│       │   ├── PetCard.tsx
│       │   └── index.ts
│       ├── screens/
│       │   ├── PetListScreen.tsx
│       │   └── PetDetailsScreen.tsx
│       └── types.ts
├── foundation/
│   ├── assets/
│   │   ├── data/
│   │   │   └── dummyList.ts
│   │   └── images/
│   │       └── pets/
│   ├── theme/
│   │   ├── colors.ts
│   │   └── index.ts
│   └── utils/
│       ├── imageUtils.ts
│       └── index.ts
└── navigation/
    ├── AppNavigator.tsx
    ├── TabNavigator.tsx
    ├── RouteParamTypes.ts
    └── index.tsx
```

## Code Quality & Best Practices

### 🛠️ Utility Functions

- **Centralized Image Handling**: `getPetImage()` and `getPetImageSource()` functions eliminate code duplication
- **Type Safety**: Full TypeScript support with proper interfaces
- **Modular Architecture**: Feature-based folder structure for better organization
- **Reusable Components**: PetCard component can be used across different screens

### 📦 Key Utilities

```typescript
// Centralized image loading utility
import { getPetImage, getPetImageSource } from '../foundation/utils';

// Usage examples:
const imageSource = getPetImage(pet); // Using Pet object
const imageSource = getPetImageSource('pets/milo.jpg'); // Using image path
```

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:

```bash
yarn install
```

2. For iOS, install pods:

```bash
cd ios && pod install && cd ..
```

3. Start the app:

```bash
# For iOS
yarn ios

# For Android
yarn android
```

## Data Structure

The app uses a comprehensive Pet interface with the following properties:

```typescript
interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Fish';
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  description: string;
  image: string;
  price: number;
  location: string;
  healthStatus: 'Healthy' | 'Needs Care' | 'Recovering';
  vaccinated: boolean;
  neutered: boolean;
  size: 'Small' | 'Medium' | 'Large';
  temperament: string[];
  specialNeeds?: string;
  availableForAdoption: boolean;
}
```

## Navigation Flow

1. **Home Tab** → Pet List Screen
2. **Pet Card** → Pet Details Screen
3. **Adopt Button** → Adoption Modal
4. **Location Tab** → Location Screen

## Future Enhancements

- Real Google Maps integration
- User authentication
- Real payment processing
- Push notifications
- Pet filtering and search
- User profiles and favorites
- Real-time chat with shelters

## Technologies Used

- React Native 0.80.1
- React Navigation 7.x
- TypeScript
- React Native Gesture Handler
- React Native Safe Area Context

## Contributing

This is a demo project showcasing modern React Native development practices with beautiful UI/UX design and clean, maintainable code architecture.
