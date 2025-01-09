import { AnimalType, AnimalProductType, GrazingAnimal } from "./animals";
import { PlantType, PlantedCrop } from "./plants";
import { EquipmentType } from "./equipment";

export interface GameState {
  money: number;
  // 商店打开选择
  selectedAction: string | null;
  // 种植选择
  selectedPlant: PlantType | null;
  // 动物选择
  selectedAnimal: AnimalType | null;
  selectedEquipment: EquipmentType | null;
  // 种植的作物
  plantedCrops: PlantedCrop[];
  // 正在放牧的动物
  grazingAnimals: GrazingAnimal[];
  // 仓库（植物，动物产物）
  warehouse: {
    // 购买了的种子
    seeds: {
      [key: string]: number;
    };
    // 购买了的动物
    ownedAnimals: {
      [key: string]: number;
    };
    // 收获了的植物，对应数量
    plants: {
      [key: string]: number;
    };
    // 收获了的动物产品，对应数量
    animalProducts: {
      [key: string]: number;
    };
    equipments: {
      [key: string]: number;
    };
  };
}

export type GameAction =
  | { type: "SELECT_ACTION"; action: string | null }
  // 植物种植相关
  | { type: "BUY_PLANT"; plantType: PlantType }
  | { type: "SELECT_PLANT"; plant: PlantType | null }
  | { type: "PLANT_PLANT"; position: number }
  | { type: "UPDATE_PLANT_GROWTH_TIME" }
  | { type: "HARVEST_PLANT"; id: string }
  | { type: "SELL_SEED" }
  | { type: "SELL_PLANT"; id: string }
  | { type: "REMOVE_PLANT"; id: string }
  // 动物养殖相关
  | { type: "BUY_ANIMAL"; animalType: AnimalType }
  | { type: "SELECT_ANIMAL"; animal: AnimalType | null }
  | { type: "GRAZE_ANIMAL"; position: number }
  | { type: "UPDATE_ANIMAL_MATURE_TIME" }
  | { type: "COLLECT_ANIMAL_PRODUCTS"; id: string }
  | { type: "SELL_ANIMAL"; id: string }
  | { type: "SELL_GRAZED_ANIMAL"; id: string }
  | { type: "SELL_ANIMAL_PRODUCT" }
  // 设备相关
  | { type: "BUY_EQUIPMENT"; equipmentType: EquipmentType }
  | { type: "SELECT_EQUIPMENT"; equipmentType: EquipmentType | null }
  | { type: "USE_EQUIPMENT_TO_PLANT"; equipmentType: EquipmentType; id: string }
  | {
      type: "USE_EQUIPMENT_TO_ANIMAL";
      equipmentType: EquipmentType;
      id: string;
    }
  // 出售
  | { type: "SELL_SEED"; seedType: string; count: number }
  | { type: "SELL_PLANT"; plantType: PlantType | string; count: number }
  | { type: "SELL_ANIMAL"; animalType: AnimalType | string; count: number }
  | { type: "SELL_ANIMAL_PRODUCT"; animalProductType: AnimalProductType | string; count: number }
  | { type: "SELL_EQUIPMENT"; equipmentType: EquipmentType | string; count: number }


