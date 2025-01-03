import { Animal, AnimalType, AnimalProductType} from '../types/animals';

export const ANIMALS: Record<AnimalType, Animal> = {
  pig: {
    id: 'pig',
    type: 'pig',
    name: '猪',
    price: 1000,
    purchasePrice: 100,
    description: '成长快速，产出丰富',
    maturityTime: 5 * 60 * 1000, // 5分钟
    product:'meat',
  },
  cow: {
    id: 'cow',
    type: 'cow',
    name: '牛',
    price: 3000,
    purchasePrice: 100,
    description: '产奶量丰富，收益稳定',
    maturityTime: 10 * 60 * 1000,
    product:'milk',
  },
  sheep: {
    id: 'sheep',
    type: 'sheep',
    name: '羊',
    price: 1500,
    purchasePrice: 100,
    description: '可提供羊毛和羊奶',
    maturityTime: 7 * 60 * 1000,
    product:'wool',
  },
  duck: {
    id: 'duck',
    type: 'duck',
    name: '鸭',
    price: 500,
    purchasePrice: 100,
    description: '产蛋量稳定',
    maturityTime: 3 * 60 * 1000,
    product:'eggs',
  },
  chicken: {
    id: 'chicken',
    type: 'chicken',
    name: '鸡',
    price: 800,
    purchasePrice: 100,
    description: '产蛋价值较高',
    maturityTime: 4 * 60 * 1000,
    product:'eggs',
  },
  dog: {
    id: 'dog',
    type: 'dog',
    name: '牧羊犬',
    price: 2000,
    purchasePrice: 100,
    description: '保护牧场安全，预防狼群袭击',
    maturityTime: 5 * 60 * 1000,
  },
};

export const ANIMAL_PRODUCTS: Record<AnimalProductType, any> = {
  meat: {
    id: 'meat',
    name: '肉',
    price: 20,
    description: '用来制作肉类食物和肉类酒',
  },  
  milk: {
    id: 'milk',
    name: '牛奶',
    price: 10,
    description: '用来喂食和治疗疾病的食物',
  },
  wool: {
    id: 'wool',
    name: '羊毛',
    price: 5,
    description: '用来制作毛绒服装和毛笔',
  },
  eggs: {
    id: 'eggs',
    name: '鸡蛋',
    price: 5, 
    description: '用来制作鸡蛋糕和鸡蛋酒',
  },
  feathers: {
    id: 'feathers',
    name: '鸭毛',
    price: 10,
    description: '用来制作羽毛服装和羽毛帽子',
  },
  fur: {
    id: 'fur',
    name: '毛皮',
    price: 15,
    description: '用来制作毛皮服装和毛皮帽子',
  }
};