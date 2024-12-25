import { ANIMALS } from '../utils/animals';
import { PLANTS } from '../utils/plants';  
import { Plant, PlantedCrop } from '../types/plants';
import { OwnedAnimal } from '../types/animals';
import { GameState, GameAction } from '../types/game';

// 添加GameState与GameAction之间的映射关系
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    // case 'UPDATE_ANIMALS': {
    //   const now = Date.now();
    //   return {
    //     ...state,
    //     ownedAnimals: state.ownedAnimals.map(animal => ({
    //       ...animal,
    //       isMature: now >= animal.maturesAt
    //     }))
    //   };
    // }

    // case 'COLLECT_ANIMAL_PRODUCTS': {
    //   const matureAnimals = state.ownedAnimals.filter(animal => animal.isMature);
    //   const income = matureAnimals.reduce((total, animal) => {
    //     const animalInfo = ANIMALS[animal.type];
    //     return total + (animalInfo.income * (animal.happiness / 100));
    //   }, 0);

    //   return {
    //     ...state,
    //     money: state.money + income
    //   };
    // }
    
    case 'SELECT_SHOP':
      return {
        ...state,
        selectedShop: action.shop
      };

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
      const now = Date.now();
      const newAnimal: OwnedAnimal = {
        id: Math.random().toString(36),
        type: action.animalType,
        purchasedAt: now,
        maturesAt: now + animal.maturityTime,
        isMature: false,
        health: 100,
        happiness: 100
      };

      return {
        ...state,
        money: state.money - animal.price,
        ownedAnimals: [...state.ownedAnimals, newAnimal]
      };
    }

    // 购买植物
    case 'BUY_PLANT': {
      console.log('BUY_PLANT reducer called', action.plantType);
      const plant = PLANTS[action.plantType];
      if (!plant || state.money < plant.purchasePrice){
        return state;
      }

      const newPlant: Plant = {
        id: Math.random().toString(36),
        type: action.plantType,
        name: plant.name,
        price: plant.price,
        purchasePrice: plant.purchasePrice,
        growthTime: plant.growthTime,
        description: plant.description
      };

      // 创建新的 Map 而不是使用现有的 Map
      const newPlantsMap = new Map(state.plants);
      
      if (newPlantsMap.has(action.plantType)) {
        // 创建新数组而不是修改现有数组
        const existingPlants = [...newPlantsMap.get(action.plantType)!];
        existingPlants.push(newPlant);
        newPlantsMap.set(action.plantType, existingPlants);
      } else {
        newPlantsMap.set(action.plantType, [newPlant]);
      }

      return {
        ...state,
        money: state.money - plant.purchasePrice,
        plants: newPlantsMap
      };
    }

    default:
      return state;
  }
}