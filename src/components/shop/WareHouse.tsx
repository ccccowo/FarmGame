import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { PLANTS } from '../../utils/plants';
import { ANIMALS } from '../../utils/animals';
import { EQUIPMENT } from '../../utils/equipment';
import { Wheat, Baby, Milk, Wrench, Sprout } from 'lucide-react';

type TabType = 'seeds' | 'crops' | 'babies' | 'products' | 'tools';

const Warehouse = () => {
  const [activeTab, setActiveTab] = useState<TabType>('seeds');
  const { state } = useGameState();

  const tabs = [
    { id: 'seeds', label: '种子', icon: Sprout },
    { id: 'crops', label: '成熟作物', icon: Wheat },
    { id: 'babies', label: '动物幼崽', icon: Baby },
    { id: 'products', label: '动物产品', icon: Milk },
    { id: 'tools', label: '道具', icon: Wrench },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'seeds':
        return (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.warehouse.seeds).map(([type, count]) => (
              <div key={type} className="bg-green-50 p-3 rounded-lg">
                <div className="font-medium">{PLANTS[type].name}</div>
                <div className="text-sm text-gray-600">数量: {count}</div>
              </div>
            ))}
          </div>
        );

      case 'crops':
        return (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.warehouse.plants || {}).map(([type, count]) => (
              <div key={type} className="bg-amber-50 p-3 rounded-lg">
                <div className="font-medium">{PLANTS[type].name}</div>
                <div className="text-sm text-gray-600">数量: {count}</div>
                <div className="text-sm text-green-600">售价: ¥{PLANTS[type].price}</div>
              </div>
            ))}
          </div>
        );

      case 'babies':
        return (
          <div className="grid grid-cols-2 gap-3">
            {
                Object.entries(state.warehouse.ownedAnimals || {}).map(([type, count]) => (
                    <div key={type} className="bg-blue-50 p-3 rounded-lg">
                        <div className="font-medium">{ANIMALS[type].name}</div>
                        <div className="text-sm text-gray-600">数量: {count}</div>
                    </div>
                ))
            }
          </div>
        );

      case 'products':
        return (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.warehouse.animalProducts || {}).map(([type, count]) => (
              <div key={type} className="bg-rose-50 p-3 rounded-lg">
                <div className="font-medium">{type}</div>
                <div className="text-sm text-gray-600">数量: {count}</div>
              </div>
            ))}
          </div>
        );

      case 'tools':
        return (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(state.warehouse.equipments).map(([type, count]) => (
              <div key={type} className="bg-purple-50 p-3 rounded-lg">
                <div className="font-medium">{EQUIPMENT[type].name}</div>
                <div className="text-sm text-gray-600">数量: {count}</div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">仓库</h2>
      
      <div className="flex space-x-2 mb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as TabType)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default Warehouse;