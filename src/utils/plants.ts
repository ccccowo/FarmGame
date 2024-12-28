import { Plant } from '../types/plants';

export const PLANTS: Record<string, Plant> = {
  wheat: {
    id: 'wheat',
    type: 'wheat',
    name: '小麦',
    growthTime: 30000,  // 30秒
    price: 50,
    purchasePrice: 10,
    description: '小麦是基本的粮食作物，可以用来制作面包和面粉。',
  },
  corn: {
    id: 'corn',
    type: 'corn',
    name: '玉米',
    growthTime: 40000,  // 40秒
    price: 75,
    purchasePrice: 10,
    description: '玉米是基本的玉米作物，可以用来制作玉米饼和玉米汤。',
  },
  vegetables: {
    id: 'vegetables',
    type: 'vegetables',
    name: '蔬菜',
    growthTime: 20000,  // 20秒
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
  },
  osmanthus: {
    id: 'osmanthus',
    type: 'osmanthus',
    name: '桂花树',
    growthTime: 400000,  // 400秒
    price: 800,
    purchasePrice: 10,
    description: '桂花树是基本的桂花树作物，可以用来制作桂花糕和桂花酒。',
  },
  ginkgo: {
    id: 'ginkgo',
    type: 'ginkgo',
    name: '银杏树',
    growthTime: 450000,  // 450秒
    price: 1000,
    purchasePrice: 10,
    description: '银杏树是基本的银杏树作物，可以用来制作银杏茶和银杏酒。',
  },
  rose: {
    id: 'rose',
    type: 'rose',
    name: '玫瑰花',
    growthTime: 70000,  // 70秒
    price: 200,
    purchasePrice: 10,
    description: '玫瑰花是基本的玫瑰花作物，可以用来制作玫瑰花茶和玫瑰花酒。',
  },
  lily: {
    id: 'lily',
    type: 'lily',
    name: '百合花',
    growthTime: 60000,  // 60秒
    price: 180,
    purchasePrice: 10,
    description: '百合花是基本的百合花作物，可以用来制作百合花茶和百合花酒。',
  }
};
