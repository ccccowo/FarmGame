import { Animal, AnimalType, OwnedAnimal } from '../types/animals';

export const ANIMALS: Record<AnimalType, Animal> = {
  pig: {
    id: 'pig',
    type: 'pig',
    name: '小猪',
    price: 1000,
    purchasePrice: 100,
    description: '成长快速，产出丰富',
    maturityTime: 5 * 60 * 1000, // 5分钟
  },
  cow: {
    id: 'cow',
    type: 'cow',
    name: '小牛',
    price: 3000,
    purchasePrice: 100,
    description: '产奶量丰富，收益稳定',
    maturityTime: 10 * 60 * 1000,
  },
  sheep: {
    id: 'sheep',
    type: 'sheep',
    name: '小羊',
    price: 1500,
    purchasePrice: 100,
    description: '可提供羊毛和羊奶',
    maturityTime: 7 * 60 * 1000,
  },
  duck: {
    id: 'duck',
    type: 'duck',
    name: '小鸭',
    price: 500,
    purchasePrice: 100,
    description: '产蛋量稳定',
    maturityTime: 3 * 60 * 1000,
  },
  goose: {
    id: 'goose',
    type: 'goose',
    name: '小鹅',
    price: 800,
    purchasePrice: 100,
    description: '产蛋价值较高',
    maturityTime: 4 * 60 * 1000,
  },
  alpaca: {
    id: 'alpaca',
    type: 'alpaca',
    name: '小羊驼',
    price: 5000,
    purchasePrice: 100,
    description: '可爱的毛茸茸伙伴，羊毛价值高',
    maturityTime: 15 * 60 * 1000,
  },
  horse: {
    id: 'horse',
    type: 'horse',
    name: '小马',
    price: 8000,
    purchasePrice: 100,
    description: '可供游客骑行，创造额外收入',
    maturityTime: 20 * 60 * 1000,
    abilities: ['tourism'],
  },
  dog: {
    id: 'dog',
    type: 'dog',
    name: '牧羊犬',
    price: 2000,
    purchasePrice: 100,
    description: '保护牧场安全，预防狼群袭击',
    maturityTime: 5 * 60 * 1000,
    abilities: ['protect'],
  },
};

// export const calculateWolfAttackRisk = (ownedAnimals: OwnedAnimal[]): number => {
//   const hasDog = ownedAnimals.some(animal => animal.type === 'dog' && animal.isMature);
//   const sheepCount = ownedAnimals.filter(animal => animal.type === 'sheep').length;
  
//   if (hasDog) return 0;
//   return Math.min(sheepCount * 0.1, 0.8); // 每只羊增加10%风险，最高80%
// };