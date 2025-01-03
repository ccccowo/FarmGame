import { Leaf, Store, Wheat, Tractor } from 'lucide-react';
import type { GameAction } from '../types/game';

type MenuItem = {
  icon: typeof Store | typeof Wheat | typeof Leaf | typeof Tractor;
  label: string;
  action: string;
};

export const getActionMenuItems = (): MenuItem[] => [
  { icon: Store, label: '购买动物', action: 'BUY_ANIMAL' },
  { icon: Wheat, label: '购买种子', action: 'BUY_SEEDS' },
  { icon: Leaf, label: '仓库', action: 'MANAGE_WAREHOUSE' },
  { icon: Tractor, label: '购买设备', action: 'BUY_EQUIPMENT' },
];