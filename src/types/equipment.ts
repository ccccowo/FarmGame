export type Equipment = {
  id: string;
  type: EquipmentType;
  name: string;
  // 购买价格
  purchasePrice: number;
  // 出售价格
  price: number;
  description: string;
  // 加快植物/动物成长速度多少倍
  efficiency?: number
};

export type EquipmentType = 'machine' | 'feed' | 'fertilizer'
