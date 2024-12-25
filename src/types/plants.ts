export interface Plant{
  id: string;
  type: PlantType;
  name: string;
  // 成熟价格
  price: number;
  // 购买价格（种子价格）
  purchasePrice: number;
  // 成熟时间
  growthTime: number;
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
  plantedAt: number;
}
