export type EquipmentType = 'machine' | 'feed' | 'fertilizer' | 'medicine';

export type Equipment = {
  type: EquipmentType;
  name: string;
  price: number;
  description: string;
};
