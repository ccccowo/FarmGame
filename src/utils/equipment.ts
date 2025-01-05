import { Equipment, EquipmentType } from '../types/equipment';

export const EQUIPMENT: Record<string, Equipment> = {
  // harvester: {
  //   id: 'harvester',
  //   name: '收割机',
  //   description: '快速收获农作物，提高收获效率',
  //   purchasePrice: 8000,
  //   price: 6000,
  //   type: 'machine',
  // },
  feed: {
    id: 'feed',
    name: '饲料',
    description: '优质动物饲料，提高动物生长速度',
    purchasePrice: 100,
    price: 80,
    type: 'feed',
    efficiency: 1.5
  },
  fertilizer: {
    id: 'fertilizer',
    name: '化肥',
    description: '提高作物产量和生长速度',
    purchasePrice: 50,
    price: 40,
    type: 'fertilizer',
    efficiency: 1.8
  }
};