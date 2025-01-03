// 植物
export interface Plant{
  id: string;
  type: PlantType;
  name: string;
  // 购买价格（种子价格）
  purchasePrice: number;
  // 成熟价格
  price: number;
  // 成熟时间（毫秒）
  growthTime: number;
  // 描述
  description: string;
}

export type PlantType = 
  | 'wheat'
  | 'corn'
  | 'vegetables'
  | 'sugarcane'
  | 'apple'
  | 'osmanthus'
  | 'ginkgo'
  | 'rose'
  | 'lily';


// 种植的作物
export interface PlantedCrop {
  id: string;
  type: PlantType;
  name: string;
  // 种下的时间
  plantedAt: number;
  // 种下的位置
  position: number;
  // 成熟时间（毫秒）
  growthTime: number;
  // 是否成熟
  isReady: boolean;
}

// 收获的作物
export interface HarvestedCrop {
  id: string;
  type: PlantType;
  name: string;
  // 收获时间
  harvestedAt: number;
  // 成熟价格
  price: number;
  // 描述
  description: string;
}
