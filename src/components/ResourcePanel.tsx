import React from 'react';
import { useGameState } from '../context/GameContext';
import { ResourceItem } from './ui/ResourceItem';

const ResourcePanel = () => {
  const { state: { animals, crops } } = useGameState();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">资源概况</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">动物</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <ResourceItem label="牛" value={animals.cattle} type="animal" />
            <ResourceItem label="羊" value={animals.sheep} type="animal" />
            <ResourceItem label="鸡" value={animals.chickens} type="animal" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">农作物</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(crops).map(([crop, amount]) => (
              <ResourceItem key={crop} label={crop} value={amount} type="crop" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcePanel;