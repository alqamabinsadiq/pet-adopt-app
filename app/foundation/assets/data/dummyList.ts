export interface Pet {
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

export const dummyList: Pet[] = [
  {
    id: '1',
    name: 'Milo',
    species: 'Dog',
    breed: 'Beagle',
    age: 3,
    gender: 'Male',
    description:
      'Friendly and curious little beagle who loves to sniff out adventures. Milo is incredibly social and gets along well with children and other pets. He has a gentle temperament and loves going for walks.',
    image: 'pets/milo.jpg',
    price: 250,
    location: 'Downtown Rescue Center',
    healthStatus: 'Healthy',
    vaccinated: true,
    neutered: true,
    size: 'Medium',
    temperament: ['Friendly', 'Curious', 'Playful', 'Good with kids'],
    availableForAdoption: true,
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    age: 2,
    gender: 'Female',
    description:
      "Playful Siamese who enjoys chasing laser pointers and curling up in warm laps. Luna is very vocal and loves to communicate with her humans. She's independent but affectionate.",
    image: 'pets/luna.jpg',
    price: 180,
    location: 'Cat Haven Shelter',
    healthStatus: 'Healthy',
    vaccinated: true,
    neutered: true,
    size: 'Small',
    temperament: ['Playful', 'Vocal', 'Independent', 'Affectionate'],
    availableForAdoption: true,
  },
  {
    id: '3',
    name: 'Charlie',
    species: 'Rabbit',
    breed: 'Dutch',
    age: 1,
    gender: 'Male',
    description:
      "Gentle Dutch rabbit who loves fresh veggies and soft blankets. Charlie is very calm and enjoys being petted. He's perfect for families looking for a quiet companion.",
    image: 'pets/charlie.jpg',
    price: 75,
    location: 'Small Pets Sanctuary',
    healthStatus: 'Healthy',
    vaccinated: false,
    neutered: true,
    size: 'Small',
    temperament: ['Gentle', 'Calm', 'Quiet', 'Good with gentle handling'],
    availableForAdoption: true,
  },
  {
    id: '4',
    name: 'Bella',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 4,
    gender: 'Female',
    description:
      "Loyal and affectionate—perfect family companion who never meets a stranger. Bella is excellent with children and loves swimming. She's been trained in basic commands.",
    image: 'pets/bella.jpg',
    price: 350,
    location: 'Golden Hearts Rescue',
    healthStatus: 'Healthy',
    vaccinated: true,
    neutered: true,
    size: 'Large',
    temperament: ['Loyal', 'Affectionate', 'Great with kids', 'Trained'],
    availableForAdoption: true,
  },
];
