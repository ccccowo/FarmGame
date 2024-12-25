import { Equipment } from '../types/game';

export const EQUIPMENT: Record<string, Equipment> = {
  tractor: {
    id: 'tractor',
    name: '拖拉机',
    description: '提高耕地效率，减少人力消耗',
    price: 5000,
    type: 'machine',
    efficiency: 2.5
  },
  harvester: {
    id: 'harvester',
    name: '收割机',
    description: '快速收获农作物，提高收获效率',
    price: 8000,
    type: 'machine',
    efficiency: 3.0
  },
  drone: {
    id: 'drone',
    name: '农用无人机',
    description: '用于农药喷洒和农田监控',
    price: 3000,
    type: 'machine',
    efficiency: 2.0
  },
  feed: {
    id: 'feed',
    name: '饲料',
    description: '优质动物饲料，提高动物生长速度',
    price: 100,
    type: 'feed',
    efficiency: 1.5
  },
  fertilizer: {
    id: 'fertilizer',
    name: '化肥',
    description: '提高作物产量和生长速度',
    price: 50,
    type: 'fertilizer',
    efficiency: 1.8
  },
  pesticide: {
    id: 'pesticide',
    name: '农药',
    description: '防治病虫害，保护农作物',
    price: 80,
    type: 'medicine',
    efficiency: 1.3
  },
  veterinary: {
    id: 'veterinary',
    name: '兽药',
    description: '预防和治疗动物疾病',
    price: 120,
    type: 'medicine',
    efficiency: 1.4
  }
};