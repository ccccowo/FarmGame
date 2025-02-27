import { ANIMALS, ANIMAL_PRODUCTS } from "../utils/animals";
import { PLANTS } from "../utils/plants";
import { EQUIPMENT } from "../utils/equipment";
import { PlantedCrop } from "../types/plants";
import {
  GrazingAnimal,
  AnimalProductType,
  AnimalProduct,
} from "../types/animals";
import { GameState, GameAction } from "../types/game";
import { message } from "antd";

const GAME_STATE_KEY = "farm_game_state";

// 保存游戏状态
const saveGameState = (state: GameState) => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save game state:", error);
  }
};

// 添加GameState与GameAction之间的映射关系
export function gameReducer(state: GameState, action: GameAction): GameState {
  console.log("gameReducer");
  const newState = (() => {
    switch (action.type) {
      // 选择商店
      case "SELECT_ACTION":
        return {
          ...state,
          selectedAction: action.action,
        };
      // 选择种植的植物
      case "SELECT_PLANT":
        return {
          ...state,
          selectedPlant: action.plant,
        };

      case "SELECT_ANIMAL":
        return {
          ...state,
          selectedAnimal: action.animal,
        };

      // 购买动物
      case "BUY_ANIMAL": {
        // 获取到被购买的动物
        const animal = ANIMALS[action.animalType];
        if (!animal || state.money < animal.price) {
          return state;
        }

        // 创建新的ownedAnimals对象
        const newOwnedAnimals = { ...state.warehouse.ownedAnimals };
        newOwnedAnimals[action.animalType] =
          (newOwnedAnimals[action.animalType] || 0) + 1;
        message.success("购买成功");
        return {
          ...state,
          money: Number((state.money - animal.price).toFixed(2)), // 使用 toFixed(2) 确保金额计算的精度
          warehouse: {
            ...state.warehouse,
            ownedAnimals: newOwnedAnimals,
          },
        };
      }

      // 购买植物
      case "BUY_PLANT": {
        const plant = PLANTS[action.plantType];
        if (!plant || state.money < plant.purchasePrice) {
          return state;
        }

        // 创建新的seeds对象
        const newSeeds = { ...state.warehouse.seeds };
        newSeeds[action.plantType] = (newSeeds[action.plantType] || 0) + 1;

        message.success("购买成功");

        return {
          ...state,
          money: state.money - plant.purchasePrice,
          warehouse: {
            ...state.warehouse,
            seeds: newSeeds,
          },
        };
      }

      // 种植植物
      case "PLANT_PLANT": {
        const position = action.position;
        // 如果已经有选择了的种子并且该种子数量不为0
        if (
          state.selectedPlant &&
          state.warehouse.seeds[state.selectedPlant] > 0
        ) {
          // 已经种植下的植物+1
          const newPlantedCrop: PlantedCrop = {
            id: Math.random().toString(36),
            type: state.selectedPlant,
            name: PLANTS[state.selectedPlant].name,
            plantedAt: Date.now(),
            position,
            growthTime: PLANTS[state.selectedPlant].growthTime,
            isReady: false,
          };
          const newPlantedCrops = [...state.plantedCrops, newPlantedCrop];

          // 植物种子-1
          const newSeeds = { ...state.warehouse.seeds };
          newSeeds[state.selectedPlant] =
            (newSeeds[state.selectedPlant] || 0) - 1;

          message.success("种植成功");
          return {
            ...state,
            warehouse: {
              ...state.warehouse,
              seeds: newSeeds,
            },
            plantedCrops: newPlantedCrops,
          };
        }

        return {
          ...state,
        };
      }
      // 更新作物的成熟状态
      case "UPDATE_PLANT_GROWTH_TIME": {
        const now = Date.now();
        return {
          ...state,
          plantedCrops: state.plantedCrops.map((crop) => ({
            ...crop,
            isReady: now >= crop.plantedAt + crop.growthTime,
          })),
        };
      }
      // 收获作物
      case "HARVEST_PLANT": {
        const newPlantedCrops = state.plantedCrops.filter(
          (crop) => crop.id !== action.id
        );
        // 对应仓库植物数量+1
        const type = state.plantedCrops.find(
          (crop) => crop.id === action.id
        )?.type;
        const newPlants = { ...state.warehouse.plants };
        if (type) {
          newPlants[type] = (newPlants[type] || 0) + 1;
        }
        message.success("收获成功");
        return {
          ...state,
          plantedCrops: newPlantedCrops,
          warehouse: {
            ...state.warehouse,
            plants: newPlants,
          },
        };
      }
      // 养殖动物
      case "GRAZE_ANIMAL": {
        const position = action.position;
        // 如果已经有选择了的动物并且该动物数量不为0
        if (
          state.selectedAnimal &&
          state.warehouse.ownedAnimals[state.selectedAnimal] > 0
        ) {
          // 已经养殖下的动物+1
          const animal = ANIMALS[state.selectedAnimal];
          const product = ANIMAL_PRODUCTS[animal.product as AnimalProductType];

          const animalProduct: AnimalProduct = {
            id: Math.random().toString(36),
            name: product.name,
            type: product.type,
            price: product.price,
            description: product.description,
            producedAt: Date.now(),
            maturityTime: product.maturityTime,
            isMature: false,
          };

          const newGrazingAnimal: GrazingAnimal = {
            id: Math.random().toString(36),
            type: state.selectedAnimal,
            name: ANIMALS[state.selectedAnimal].name,
            price: ANIMALS[state.selectedAnimal].price,
            description: ANIMALS[state.selectedAnimal].description,
            position,
            grazedAt: Date.now(),
            maturityTime: ANIMALS[state.selectedAnimal].maturityTime,
            isMature: false,
            product: animalProduct,
          };

          // 仓库中的动物数量-1
          const newOwnedAnimals = { ...state.warehouse.ownedAnimals };
          newOwnedAnimals[state.selectedAnimal] =
            (newOwnedAnimals[state.selectedAnimal] || 0) - 1;
          message.success("养殖成功");
          return {
            ...state,
            grazingAnimals: [...state.grazingAnimals, newGrazingAnimal],
            warehouse: {
              ...state.warehouse,
              ownedAnimals: newOwnedAnimals,
            },
          };
        }
        return state;
      }
      // 更新动物or动物产品的状态
      case "UPDATE_ANIMAL_MATURE_TIME": {
        const now = Date.now();
        return {
          ...state,
          grazingAnimals: state.grazingAnimals.map((animal) => ({
            ...animal,
            isMature: now >= animal.grazedAt + animal.maturityTime,
            product: animal.product && {
              ...animal.product,
              producedAt:
                now >= animal.grazedAt + animal.maturityTime
                  ? animal.product.producedAt
                  : now,
              isMature:
                now >= animal.grazedAt + animal.maturityTime
                  ? animal.product.producedAt + animal.product.maturityTime <=
                    Date.now()
                  : false,
            },
          })),
        };
      }
      // 收获动物产品
      case "COLLECT_ANIMAL_PRODUCTS": {
        const product = state.grazingAnimals.find(
          (animal) => animal.id === action.id
        )?.product;
        const type = product?.type;
        const newAnimalProducts = { ...state.warehouse.animalProducts };
        let newGrazingAnimals: GrazingAnimal[] = state.grazingAnimals;

        if (product && type) {
          newGrazingAnimals = state.grazingAnimals.filter((animal) => {
            if (animal.id === action.id && animal.type === "pig") {
              // 如果是猪，只允许收获一次，从 grazingAnimals 中移除
              newAnimalProducts[type] = (newAnimalProducts[type] || 0) + 1;
              return false; // 从数组中移除该猪对象
            } else if (animal.id === action.id) {
              // 如果是其他动物，刷新下一次收获时间
              newAnimalProducts[type] = (newAnimalProducts[type] || 0) + 1;
              return {
                ...animal,
                product: {
                  ...animal.product,
                  maturityTime: animal.product.maturityTime,
                  producedAt: Date.now(),
                },
              };
            }
            return true; // 保留其他动物
          });
        }

        message.success("收获成功");
        return {
          ...state,
          grazingAnimals: newGrazingAnimals,
          warehouse: {
            ...state.warehouse,
            animalProducts: newAnimalProducts,
          },
        };
      }
      // 购买道具
      case "BUY_EQUIPMENT": {
        const equipment = EQUIPMENT[action.equipmentType];
        if (!equipment || state.money < equipment.purchasePrice) {
          message.error("购买失败，金币不足");
          return state;
        }
        // 仓库中对应数量的道具++
        const newEquipments = { ...state.warehouse.equipments };
        if (newEquipments[equipment.type]) {
          newEquipments[equipment.type]++;
        } else {
          newEquipments[equipment.type] = 1;
        }
        return {
          ...state,
          money: state.money - equipment.purchasePrice,
          warehouse: {
            ...state.warehouse,
            equipments: newEquipments,
          },
        };
      }
      // 选择道具
      case "SELECT_EQUIPMENT": {
        return {
          ...state,
          selectedEquipment: action.equipmentType,
        };
      }
      // 对植物使用道具
      case "USE_EQUIPMENT_TO_PLANT": {
        const equipment = EQUIPMENT[action.equipmentType];
        const efficiency = equipment.efficiency;
        const plantedCrop = state.plantedCrops.find(
          (crop) => crop.id === action.id
        );
        let newPlantedCrops: PlantedCrop[] = [...state.plantedCrops];
        const now = Date.now();
        // 如果植物已经成熟，不能使用
        if (plantedCrop && plantedCrop.isReady) {
          message.error("植物已经成熟，不能使用");
          return state;
        }
        // 植物已经生长时间缩短
        plantedCrop.growthTime = plantedCrop.growthTime / efficiency;

        // 更新植物成熟状态
        if (now >= plantedCrop.plantedAt + plantedCrop.growthTime) {
          plantedCrop.isReady = true;
        }

        // 更新PlantedCrops
        newPlantedCrops = state.plantedCrops.map((crop) => {
          if (crop.id === action.id) {
            return plantedCrop;
          }
          return crop;
        });
        // 道具数量--
        const newEquipments = { ...state.warehouse.equipments };
        newEquipments[equipment.type] =
          (newEquipments[equipment.type] || 0) - 1;

        message.success("使用成功");
        return {
          ...state,
          plantedCrops: newPlantedCrops,
          warehouse: {
            ...state.warehouse,
            equipments: newEquipments,
          },
        };
      }
      // 对动物使用道具
      case "USE_EQUIPMENT_TO_ANIMAL": {
        const equipment = EQUIPMENT[action.equipmentType];
        const efficiency = equipment.efficiency;
        const animal = state.grazingAnimals.find((a) => a.id === action.id);
        const now = Date.now();
        let newGrazingAnimals: GrazingAnimal[] = state.grazingAnimals;
        // 如果动物已经成熟并且动物产品也成熟，不能使用
        if (
          animal &&
          animal.isMature &&
          animal.product &&
          animal.product.isMature
        ) {
          message.error("动物产品已经成熟，不能使用");
          return state;
        }
        // 如果动物没有成熟，缩短动物的生长时间
        if (!animal.isMature) {
          animal.maturityTime = animal.maturityTime / efficiency;
          // 更新动物成熟状态
          if (now >= animal.grazedAt + animal.maturityTime) {
            animal.isMature = true;
          }
        }
        // 如果动物已经成熟，缩短动物产品的成熟时间
        if (animal.product && !animal.product.isMature) {
          animal.product.maturityTime =
            animal.product.maturityTime / efficiency;
          // 更新动物产品成熟状态
          if (now >= animal.product.producedAt + animal.product.maturityTime) {
            animal.product.isMature = true;
          }
        }

        // 更新GrazingAnimals
        newGrazingAnimals = state.grazingAnimals.map((a) => {
          if (a.id === action.id) {
            return animal;
          }
          return a;
        });

        // 道具数量--
        const newEquipments = { ...state.warehouse.equipments };
        newEquipments[equipment.type] =
          (newEquipments[equipment.type] || 0) - 1;
        message.success("使用成功");

        return {
          ...state,
          grazingAnimals: newGrazingAnimals,
          warehouse: {
            ...state.warehouse,
            equipments: newEquipments,
          },
        };
      }
      // 出售种子
      case "SELL_SEED": {
        const newSeeds = { ...state.warehouse.seeds };
        newSeeds[action.seedType] =
          (newSeeds[action.seedType] || 0) - action.count;
        message.success("出售成功");
        return {
          ...state,
          money:
            state.money + PLANTS[action.seedType].purchasePrice * action.count,
          warehouse: {
            ...state.warehouse,
            seeds: newSeeds,
          },
        };
      }
      // 出售成熟作物
      case "SELL_PLANT": {
        const newPlants = { ...state.warehouse.plants };
        newPlants[action.plantType] =
          (newPlants[action.plantType] || 0) - action.count;
        message.success("出售成功");
        return {
          ...state,
          money: state.money + PLANTS[action.plantType].price * action.count,
          warehouse: {
            ...state.warehouse,
            plants: newPlants,
          },
        };
      }
      // 出售动物幼崽
      case "SELL_ANIMAL": {
        const newOwnedAnimals = { ...state.warehouse.ownedAnimals };
        newOwnedAnimals[action.animalType] =
          (newOwnedAnimals[action.animalType] || 0) - action.count;
        message.success("出售成功");
        return {
          ...state,
          money: state.money + ANIMALS[action.animalType].price * action.count,
          warehouse: {
            ...state.warehouse,
            ownedAnimals: newOwnedAnimals,
          },
        };
      }
      // 出售动物产品
      case "SELL_ANIMAL_PRODUCT": {
        const newAnimalProducts = { ...state.warehouse.animalProducts };
        newAnimalProducts[action.animalProductType] =
          (newAnimalProducts[action.animalProductType] || 0) - action.count;
        message.success("出售成功");
        return {
          ...state,
          money:
            state.money +
            ANIMAL_PRODUCTS[action.animalProductType].price * action.count,
          warehouse: {
            ...state.warehouse,
            animalProducts: newAnimalProducts,
          },
        };
      }
      case "REMOVE_PLANT": {
        const plant = state.plantedCrops.find((crop) => crop.id === action.id);
        if (!plant) return state;

        const removeCost = Math.ceil(PLANTS[plant.type].purchasePrice * 0.1);
        if (state.money < removeCost) {
          message.error("金币不足，无法铲除");
          return state;
        }
        message.success("铲除成功");
        return {
          ...state,
          money: state.money - removeCost,
          plantedCrops: state.plantedCrops.filter(
            (crop) => crop.id !== action.id
          ),
        };
      }
      case "REMOVE_ANIMAL": {
        const animal = state.grazingAnimals.find((a) => a.id === action.id);
        if (!animal) return state;
        if (state.money < Math.ceil(ANIMALS[animal.type].purchasePrice * 0.1)) {
          message.error("金币不足，无法取消放牧");
          return state;
        }
        // 将动物返回仓库
        const newOwnedAnimals = { ...state.warehouse.ownedAnimals };
        newOwnedAnimals[animal.type] = (newOwnedAnimals[animal.type] || 0) + 1;
        message.success("取消放牧成功");
        return {
          ...state,
          money:
            state.money - Math.ceil(ANIMALS[animal.type].purchasePrice * 0.1),
          grazingAnimals: state.grazingAnimals.filter(
            (a) => a.id !== action.id
          ),
          warehouse: {
            ...state.warehouse,
            ownedAnimals: newOwnedAnimals,
          },
        };
      }
      case "RESET_GAME": {
        message.success("游戏已重置");
        return {
          money: 10000,
          selectedAction: null,
          selectedPlant: null,
          selectedAnimal: null,
          selectedEquipment: null,
          plantedCrops: [],
          grazingAnimals: [],
          warehouse: {
            seeds: {},
            ownedAnimals: {},
            plants: {},
            animalProducts: {},
            equipments: {},
          },
        };
      }
      default:
        return state;
    }
  })();

  // 添加最后执行的动作类型
  const finalState = {
    ...newState,
    lastAction: action.type,
  };

  // 在重要操作后立即保存状态
  const importantActions = [
    "PLANT_PLANT",
    "HARVEST_PLANT",
    "REMOVE_PLANT",
    "GRAZE_ANIMAL",
    "COLLECT_ANIMAL_PRODUCTS",
    "REMOVE_ANIMAL",
    "BUY_PLANT",
    "BUY_ANIMAL",
    "SELL_PLANT",
    "SELL_ANIMAL",
    "SELL_SEED",
    "SELL_ANIMAL_PRODUCT",
    "BUY_EQUIPMENT",
    "USE_EQUIPMENT_TO_PLANT",
    "USE_EQUIPMENT_TO_ANIMAL",
    "RESET_GAME",
  ];

  if (importantActions.includes(action.type)) {
    saveGameState(finalState);
  }

  return finalState;
}
