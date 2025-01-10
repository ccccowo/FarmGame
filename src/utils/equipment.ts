import { Equipment, EquipmentType } from '../types/equipment';

export const EQUIPMENT: Record<string, Equipment> = {
  lowFertilizer: {
    id: 'lowFertilizer',
    name: '低级化肥',
    description: '基础化肥，稍微提高作物生长速度和产量',
    purchasePrice: 30,
    price: 25,
    type: 'lowFertilizer',
    efficiency: 1.2,
    target: 'plant'
  },
  midFertilizer: {
    id: 'midFertilizer',
    name: '中级化肥',
    description: '提高作物生长速度和产量的化肥',
    purchasePrice: 60,
    price: 50,
    type: 'midFertilizer',
    efficiency: 1.5,
    target: 'plant'
  },
  highFertilizer: {
    id: 'highFertilizer',
    name: '高级化肥',
    description: '优质化肥，大幅提高作物生长速度和产量',
    purchasePrice: 120,
    price: 100,
    type: 'highFertilizer',
    efficiency: 2.0,
    target: 'plant'
  },
  lowFeed: {
    id: 'lowFeed',
    name: '低级饲料',
    description: '基础饲料，稍微提高动物生长速度',
    purchasePrice: 40,
    price: 35,
    type: 'lowFeed',
    efficiency: 1.2,
    target: 'animal'
  },
  midFeed: {
    id: 'midFeed',
    name: '中级饲料',
    description: '提高动物生长速度的饲料',
    purchasePrice: 80,
    price: 70,
    type: 'midFeed',
    efficiency: 1.5,
    target: 'animal'
  },
  highFeed: {
    id: 'highFeed',
    name: '高级饲料',
    description: '优质饲料，大幅提高动物生长速度',
    purchasePrice: 150,
    price: 120,
    type: 'highFeed',
    efficiency: 2.0,
    target: 'animal'
  }
};