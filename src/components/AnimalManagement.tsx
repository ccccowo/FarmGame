import React from 'react';
import { useGameState } from '../context/GameContext';
import { ANIMALS } from '../utils/animals';
import { calculateWolfAttackRisk } from '../utils/animals';
import { Shield, AlertTriangle } from 'lucide-react';
import { AnimalStatusCard } from './ui/AnimalStatusCard';

const AnimalManagement = () => {
  const { state } = useGameState();
  const wolfAttackRisk = calculateWolfAttackRisk(state.ownedAnimals);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">牧场动物</h2>
        <div className="flex items-center gap-2">
          {wolfAttackRisk > 0 ? (
            <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="text-sm">狼群风险: {(wolfAttackRisk * 100).toFixed(0)}%</span>
            </div>
          ) : (
            <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4 mr-1" />
              <span className="text-sm">牧场安全</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {state.ownedAnimals.map((animal) => (
          <AnimalStatusCard
            key={animal.id}
            animal={animal}
            animalInfo={ANIMALS[animal.type]}
          />
        ))}
        
        {state.ownedAnimals.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            还没有动物，快去购买一些可爱的小动物吧！
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalManagement;