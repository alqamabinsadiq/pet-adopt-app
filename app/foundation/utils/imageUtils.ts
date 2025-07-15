import { Pet } from '../assets/data/dummyList';

/**
 * Get the require statement for a pet image based on the image path
 * @param imagePath - The image path from the pet data
 * @returns The require statement for the image
 */
export const getPetImageSource = (imagePath: string) => {
  switch (imagePath) {
    case 'pets/milo.jpg':
      return require('../assets/images/pets/milo.jpg');
    case 'pets/luna.jpg':
      return require('../assets/images/pets/luna.jpg');
    case 'pets/charlie.jpg':
      return require('../assets/images/pets/charlie.jpg');
    case 'pets/bella.jpg':
      return require('../assets/images/pets/bella.jpg');
    default:
      return require('../assets/images/pets/milo.jpg');
  }
};

/**
 * Get the require statement for a pet image using the Pet object
 * @param pet - The pet object containing the image path
 * @returns The require statement for the image
 */
export const getPetImage = (pet: Pet) => {
  return getPetImageSource(pet.image);
};
