import React from 'react';
import { Animal } from '../../types/animals';
import { formatTimeRemaining } from '../../utils/timeUtils';

interface AnimalCardProps {
  animal: Animal;
  onBuy: () => void;
  canAfford: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onBuy, canAfford }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-lg mb-2">{animal.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{animal.description}</p>
        
        <div className="space-y-2 flex-grow">
          <div className="flex justify-between text-sm">
            <span>成熟时间:</span>
            <span>{formatTimeRemaining(animal.maturityTime)}</span>
          </div>
        </div>

        <button
          onClick={onBuy}
          disabled={!canAfford}
          className={`mt-4 w-full px-4 py-2 rounded text-sm font-medium ${
            canAfford
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          购买 ¥{animal.price.toLocaleString()}
        </button>
      </div>
    </div>
  );
};