import { Equipment, EquipmentType } from '../types/equipment';

export const EQUIPMENT: Record<string, Equipment> = {
  feed: {
    id: 'feed',
    name: '饲料',
    description: '优质动物饲料，提高动物生长速度',
    purchasePrice: 100,
    price: 80,
    type: 'feed',
    efficiency: 1.5,
    target:'animal'
  },
  fertilizer: {
    id: 'fertilizer',
    name: '化肥',
    description: '提高作物产量和生长速度',
    purchasePrice: 50,
    price: 40,
    type: 'fertilizer',
    efficiency: 1.8,
    target:'plant'
  }
};