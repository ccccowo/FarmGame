export type Equipment = {
  id: string;
  type: EquipmentType;
  name: string;
  price: number;
  description: string;
  efficiency?: number
};

export type EquipmentType = 'machine' | 'feed' | 'fertilizer'
