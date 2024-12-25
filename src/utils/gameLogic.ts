import { AnimalCount, CropCount, GameState } from '../types/game';

export const ANIMAL_PRICES = {
  cattle: 2000,
  sheep: 1000,
  chickens: 100,
} as const;

export const CROP_PRICES = {
  wheat: 50,
  corn: 75,
  vegetables: 100,
} as const;

export const canAffordAnimal = (state: GameState, animal: keyof AnimalCount): boolean => {
  return state.money >= ANIMAL_PRICES[animal];
};

export const canAffordCrop = (state: GameState, crop: keyof CropCount): boolean => {
  return state.money >= CROP_PRICES[crop];
};

export const calculateDailyIncome = (state: GameState): number => {
  const animalIncome = 
    state.animals.cattle * 200 +
    state.animals.sheep * 100 +
    state.animals.chickens * 10;
    
  const cropIncome = 
    state.crops.wheat * 25 +
    state.crops.corn * 35 +
    state.crops.vegetables * 50;
    
  return animalIncome + cropIncome;
};