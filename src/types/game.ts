import { AnimalType, OwnedAnimal, Animal } from './animals';
import { PlantType, PlantedCrop, Plant } from './plants'; 


export interface GameState {
  money: number;
  // 商店打开选择
  selectedShop: string | null;
  // 种植选择
  selectedPlant: PlantType | null;
  // 动物选择
  selectedAnimal: AnimalType | null;
  // 购买了的植物【key:植物类型，value:植物数组】
  plants: Map<PlantType, Plant[]>;
  // 动物
  animals: Animal[];
  // 种植的作物
  plantedCrops: PlantedCrop[];
  // 拥有的动物
  ownedAnimals: OwnedAnimal[]; 
  lastPurchaseTime?: {
    [key: string]: number;
  };
}

// ... 其他现有的类型定义 ...

export type GameAction = 
  // | { type: 'UPDATE_ANIMALS' }
  // | { type: 'COLLECT_ANIMAL_PRODUCTS' }
  | { type: 'SELECT_SHOP'; shop: string | null }
  | { type: 'SELECT_PLANT'; plant: PlantType | null }
  | { type: 'SELECT_ANIMAL'; animal: AnimalType | null } 
  | { type: 'BUY_PLANT'; plantType: PlantType }
  | { type: 'BUY_ANIMAL'; animalType: AnimalType }
  | { type: 'PLANT_PLANT'; position: number }
  | { type: 'HARVEST_PLANT'; id: string }
