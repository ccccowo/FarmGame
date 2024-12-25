export interface Animal {
  id: string;
  type: AnimalType;
  name: string;
  // 成熟价格
  price: number;
  // 购买价格
  purchasePrice: number;
  // 描述
  description: string;
  // 成熟时间（毫秒）
  maturityTime: number; 
  abilities?: string[];
}

export type AnimalType = 
  | 'pig' 
  | 'cow' 
  | 'sheep' 
  | 'duck' 
  | 'goose' 
  | 'alpaca' 
  | 'horse' 
  | 'dog';

// 拥有的动物
export interface OwnedAnimal {
  id: string;
  type: AnimalType;
  purchasedAt: number;
  maturesAt: number;
  isMature: boolean;
  health: number;
  happiness: number;
}

// 动物事件
export interface AnimalIncident {
  type: 'wolf_attack' | 'disease_outbreak';
  affectedType: AnimalType;
  damage: number;
  timestamp: number;
}