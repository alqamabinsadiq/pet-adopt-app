import { Pet } from '../foundation/assets/data/dummyList';

export type AppParamList = {
  Home: undefined;
  PetDetails: { pet: Pet };
  Adopt: { pet: Pet };
};

export type TabParamList = {
  Home: undefined;
  Location: undefined;
};
