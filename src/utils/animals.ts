import { Animal, AnimalType, AnimalProductType, AnimalProduct } from '../types/animals';

export const ANIMALS: Record<AnimalType, Animal> = {
  pig: {
    id: 'pig',
    type: 'pig',
    name: '猪',
    price: 3000,
    purchasePrice: 500,
    description: '成熟后可以提供猪肉',
    maturityTime: 10 * 24 * 60 * 60 * 1000, // 10天
    product:'meat',
  },
  cow: {
    id: 'cow',
    type: 'cow',
    name: '牛',
    price: 3000,
    purchasePrice: 100,
    description: '成熟后每天产一次牛奶',
    maturityTime: 4 * 24 * 60 * 60 * 1000, // 10天
    product:'milk',
  },
  sheep: {
    id: 'sheep',
    type: 'sheep',
    name: '羊',
    price: 2500,
    purchasePrice: 750,
    description: '成熟后每三天产一次羊毛',
    maturityTime: 4 * 24 * 60 * 60 * 1000, // 4天
    product:'wool',
  },
  duck: {
    id: 'duck',
    type: 'duck',
    name: '鸭',
    price: 60,
    purchasePrice: 11,
    description: '成熟后每天生一个鸭蛋',
    maturityTime: 5 * 24 * 60 * 60 * 1000, // 5天
    product:'eggs',
  },
  chicken: {
    id: 'chicken',
    type: 'chicken',
    name: '鸡',
    price: 60,
    purchasePrice: 11,
    description: '成熟后每天生一个鸡蛋',
    maturityTime: 5 * 24 * 60 * 60 * 1000, // 5天
    product:'eggs',
  }
};

export const ANIMAL_PRODUCTS: Record<AnimalProductType, AnimalProduct> = {
  meat: {
    id: 'meat',
    name: '猪肉',
    price: 6000,
    description: '用来制作肉类食物和肉类酒',
    type: 'meat',
    producedAt: Date.now(),
    maturityTime: 10,
    isMature: false,
  },  
  milk: {
    id: 'milk',
    name: '牛奶',
    price: 10,
    description: '用来喂食和治疗疾病的食物',
    type: 'milk',
    producedAt: Date.now(),
    maturityTime: 24 * 60 * 60 * 1000, // 24小时
    isMature: false,
  },
  wool: {
    id: 'wool',
    name: '羊毛',
    price: 5,
    description: '用来制作毛绒服装和毛笔',
    type: 'wool',
    producedAt: Date.now(),
    maturityTime: 3 * 24 * 60 * 60 * 1000,
    isMature: false,
  },
  eggs: {
    id: 'eggs',
    name: '鸡蛋',
    price: 5, 
    description: '鸡蛋可以直接售卖',
    type: 'eggs',
    producedAt: Date.now(),
    maturityTime: 24 * 60 * 60 * 1000,
    isMature: false,
  },
  feathers: {
    id: 'feathers',
    name: '鸭蛋',
    price: 10,
    description: '鸭蛋可以直接售卖',
    type: 'feathers',
    producedAt: Date.now(),
    maturityTime: 24 * 60 * 60 * 1000,
    isMature: false,
  },
};