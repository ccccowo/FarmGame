import { Plant } from '../types/plants';

export const PLANTS: Record<string, Plant> = {
  wheat: {
    id: 'wheat',
    type: 'wheat',
    name: '小麦',
    growthTime: 2 * 60 * 1000, // 2分钟
    price: 25,
    purchasePrice: 5,
    description: '小麦是一种主要的谷物作物，用于制作面包、面条等食品。',
  },
  corn: {
    id: 'corn',
    type: 'corn',
    name: '玉米',
    growthTime: 5 * 60 * 1000, // 5分钟
    price: 150,
    purchasePrice: 100,
    description: '玉米是基本的玉米作物，可以用来制作玉米饼和玉米汤。',
  },
  vegetables: {
    id: 'vegetables',
    type: 'vegetables',
    name: '蔬菜',
    growthTime: 30 * 60 * 1000, // 30分钟
    price: 175,
    purchasePrice: 80,
    description: '包括各种叶类、根茎类蔬菜，是日常饮食中不可或缺的部分。',
  },
  sugarcane: {
    id: 'sugarcane',
    type: 'sugarcane',
    name: '甘蔗',
    growthTime: 10 * 60 * 1000, // 10分钟
    price: 100,
    purchasePrice: 80,
    description: '甘蔗主要用于制糖业副产品如糖蜜。',
  },
  apple: {
    id: 'apple',
    type: 'apple',
    name: '苹果',
    growthTime: 20 * 60 * 1000, // 20分钟
    price: 50,
    purchasePrice: 30,
    description: '苹果树生产的果实可以直接食用，也可以加工成果汁、果酱等。',
  },
  strawberry: {
    id: 'strawberry',
    type: 'strawberry',
    name: '草莓',
    growthTime: 20 * 60 * 1000, // 20分钟
    price: 240,
    purchasePrice: 100,
    description: '草莓生产的果实可以直接食用，也可以加工成果汁、果酱等。',
  },
  grape: {
    id: 'grape',
    type: 'grape',
    name: '葡萄',
    growthTime: 25 * 60 * 1000, // 25分钟
    price: 100,
    purchasePrice: 60,
    description: '葡萄树生产的果实可以直接食用，也可以加工成果汁、果酱等。',
  },
  rose: {
    id: 'rose',
    type: 'rose',
    name: '玫瑰花',
    growthTime: 10 * 60 * 1000, // 10分钟
    price: 20,
    purchasePrice: 10,
    description: '玫瑰花被广泛用于香料、精油及装饰用途。',
  },
};