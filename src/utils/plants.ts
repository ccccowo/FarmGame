import { Plant } from '../types/plants';

export const PLANTS: Record<string, Plant> = {
  wheat: {
    id: 'wheat',
    type: 'wheat',
    name: '小麦',
    growthTime: 2 * 60 * 1000,  // 2分钟
    price: 500,
    purchasePrice: 10,
    description: '小麦是基本的粮食作物，可以用来制作面包和面粉。',
  },
  corn: {
    id: 'corn',
    type: 'corn',
    name: '玉米',
    growthTime: 2 * 60 * 1000,  // 2分钟
    price: 700,
    purchasePrice: 50,
    description: '玉米是基本的玉米作物，可以用来制作玉米饼和玉米汤。',
  },
  vegetables: {
    id: 'vegetables',
    type: 'vegetables',
    name: '蔬菜',
    growthTime: 100000,  // 100秒
    price: 100,
    purchasePrice: 10,
    description: '蔬菜是基本的蔬菜作物，可以用来制作蔬菜沙拉和蔬菜汤。',
  },
  sugarcane: {
    id: 'sugarcane',
    type: 'sugarcane',
    name: '甘蔗',
    growthTime: 50000,  // 50秒
    price: 120,
    purchasePrice: 10,
    description: '甘蔗是基本的甘蔗作物，可以用来制作甘蔗糖和甘蔗汁。',
  },
  apple: {
    id: 'apple',
    type: 'apple',
    name: '苹果树',
    growthTime: 300000,  // 300秒
    price: 500,
    purchasePrice: 10,
    description: '苹果树是基本的苹果树作物，可以用来制作苹果派和苹果汁。',
  }
};
