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
  // 动物产出的产品类型
  product?: AnimalProductType
}
// 动物产品
export interface AnimalProduct {
  id: string;
  type: AnimalProductType;
  name: string;
  price: number;
  description: string;
  // 动物产物开始产出时间
  producedAt: number;
  // 成熟时间（毫秒）
  maturityTime: number;
  // 动物产物是否成熟
  isMature: boolean;
}

export type AnimalProductType = 
  | 'meat' 
  | 'milk' 
  | 'wool' 
  | 'eggs' 
  | 'feathers'
  | 'fur'

export type AnimalType = 
  | 'pig' 
  | 'cow' 
  | 'sheep' 
  | 'chicken'
  | 'duck' 
  | 'dog';

// 养殖的动物
export interface GrazingAnimal {
  id: string;
  type: AnimalType;
  name: string;
  grazedAt: number;
  position: number;
  maturityTime: number;
  // 动物本身是否成熟
  isMature: boolean;
  // 动物产物
  product?: AnimalProduct;
}
