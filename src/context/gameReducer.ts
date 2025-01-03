import { ANIMALS, ANIMAL_PRODUCTS } from '../utils/animals';
import { PLANTS } from '../utils/plants';  
import { PlantedCrop } from '../types/plants';
import { GrazingAnimal, AnimalProduct, AnimalProductType } from '../types/animals';
import { GameState, GameAction } from '../types/game';

// 添加GameState与GameAction之间的映射关系
export function gameReducer(state: GameState, action: GameAction): GameState {
  console.log("gameReducer")
  switch (action.type) {
    // 选择商店
    case 'SELECT_SHOP':
      return {
        ...state,
        selectedShop: action.shop
      };
    // 选择种植的植物
    case 'SELECT_PLANT':
      return {
        ...state,
        selectedPlant: action.plant
      };

    case 'SELECT_ANIMAL':
      return {
        ...state,
        selectedAnimal: action.animal
      }

    // 购买动物
    case 'BUY_ANIMAL': {
      console.log(action.animalType);
      
      // 获取到被购买的动物
      const animal = ANIMALS[action.animalType];
      if (!animal || state.money < animal.price){
        return state;
      }

      // 创建新的ownedAnimals对象
      const newOwnedAnimals = {...state.warehouse.ownedAnimals};
      newOwnedAnimals[action.animalType] = (newOwnedAnimals[action.animalType] || 0) + 1;

      return {
        ...state,
        money: state.money - animal.price,
        warehouse: {
          ...state.warehouse,
          ownedAnimals: newOwnedAnimals
        }
      };
    }

    // 购买植物
    case 'BUY_PLANT': {
      const plant = PLANTS[action.plantType];
      if (!plant || state.money < plant.purchasePrice){
        return state;
      }

      // 创建新的seeds对象
      const newSeeds = {...state.warehouse.seeds};
      newSeeds[action.plantType] = (newSeeds[action.plantType] || 0) + 1;
      
      return {
        ...state,
        money: state.money - plant.purchasePrice,
        warehouse:{
          ...state.warehouse,
          seeds: newSeeds
        }
      };
    }

    // 种植植物
    case 'PLANT_PLANT': {
      const position = action.position
      // 如果已经有选择了的种子并且该种子数量不为0
      if(state.selectedPlant && state.warehouse.seeds[state.selectedPlant] > 0){
        // 已经种植下的植物+1
        const newPlantedCrop: PlantedCrop = {
          id: Math.random().toString(36),
          type: state.selectedPlant,
          name: PLANTS[state.selectedPlant].name,
          plantedAt:Date.now(),
          position,
          growthTime: PLANTS[state.selectedPlant].growthTime,
          isReady:false
        }
        const newPlantedCrops = [...state.plantedCrops,newPlantedCrop]

        // 植物种子-1
        const newSeeds = {...state.warehouse.seeds}
        newSeeds[state.selectedPlant] = (newSeeds[state.selectedPlant] || 0) - 1;
        
        return {
          ...state,
          warehouse:{
            ...state.warehouse,
            seeds: newSeeds
          },
          plantedCrops: newPlantedCrops
        }
      }
    
       return {
        ...state
       }
    }
    // 更新作物的成熟状态
    case 'UPDATE_PLANT_GROWTH_TIME': {
      const now = Date.now();
      return {
        ...state,
        plantedCrops: state.plantedCrops.map(crop => ({
          ...crop,
          isReady: now >= crop.plantedAt + crop.growthTime
        }))
      };
    }
    // 收获作物
    case 'HARVEST_PLANT': {
      const newPlantedCrops = state.plantedCrops.filter(crop => crop.id !== action.id)
      // 对应仓库植物数量+1
      const type = state.plantedCrops.find(crop => crop.id === action.id)?.type
      const newPlants = {...state.warehouse.plants}
      if(type){
        newPlants[type] = (newPlants[type] || 0) + 1
      }
      return {
        ...state,
        plantedCrops: newPlantedCrops,
        warehouse: {
          ...state.warehouse,
          plants: newPlants
        }
      }
    }
    // 养殖动物
    case 'GRAZE_ANIMAL': {
      const position = action.position
      // 如果已经有选择了的动物并且该动物数量不为0
      if(state.selectedAnimal && state.warehouse.ownedAnimals[state.selectedAnimal] > 0){
        // 已经养殖下的动物+1
        const animal = ANIMALS[state.selectedAnimal]
        const product = ANIMAL_PRODUCTS[animal.product as AnimalProductType]

        const newGrazingAnimal: GrazingAnimal = {
          id: Math.random().toString(36),
          type: state.selectedAnimal,
          name: ANIMALS[state.selectedAnimal].name,
          position,
          grazedAt:Date.now(),
          maturityTime: ANIMALS[state.selectedAnimal].maturityTime,
          isMature:false,
          product: {
            id: Math.random().toString(36),
            name: product.name,
            type: product.type,
            price: product.price,
            description: product.description,
            producedAt: Date.now(),
            maturityTime: product.maturityTime,
            isMature: false
          }
        }

        // 仓库中的动物数量-1
        const newOwnedAnimals = {...state.warehouse.ownedAnimals}
        newOwnedAnimals[state.selectedAnimal] = (newOwnedAnimals[state.selectedAnimal] || 0) - 1;
        return {
          ...state,
          grazingAnimals: [...state.grazingAnimals, newGrazingAnimal],
          warehouse: {
            ...state.warehouse,
            ownedAnimals: newOwnedAnimals
          }
        }
      }
    }
    // 更新动物or动物产品的状态
    case 'UPDATE_ANIMAL_MATURE_TIME': {
      const now = Date.now();
      return {
        ...state,
        grazingAnimals: state.grazingAnimals.map(animal => ({
          ...animal,
          isMature: now >= animal.grazedAt + animal.maturityTime,
          product: animal.product && {
            ...animal.product,
            isMature: now >= animal.product.producedAt + animal.product.maturityTime
          }
        }))
      };
    }
    // 收获动物产品
    case 'COLLECT_ANIMAL_PRODUCTS': {
      // 对应仓库动物产品数量+1
      const product = state.grazingAnimals.find(animal => animal.id === action.id)?.product;
      const type = product?.type;
      const newAnimalProducts = {...state.warehouse.animalProducts};
      let newGrazingAnimals: GrazingAnimal[] = state.grazingAnimals;
      if (product && type) {
        // 重置该动物产品开始产生的时间
        newGrazingAnimals = state.grazingAnimals.map(animal => {
          if(animal.id === action.id && animal.product){
            return {
              ...animal,
              product:{
                ...animal.product,
                producedAt: Date.now()
              }
            }
          }else{
            return animal
          }
        });
        newAnimalProducts[type] = (newAnimalProducts[type] || 0) + 1;
      }
      return {
        ...state,
        grazingAnimals: newGrazingAnimals,
        warehouse: {
          ...state.warehouse,
          animalProducts: newAnimalProducts
        }
      }
    }
   
    default:
      return state;
  }
}