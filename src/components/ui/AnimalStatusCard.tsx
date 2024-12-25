import React from 'react';
import { OwnedAnimal } from '../../types/animals';
import { Animal } from '../../types/animals';
import { Heart, Smile } from 'lucide-react';

interface AnimalStatusCardProps {
  animal: OwnedAnimal;
  animalInfo: Animal;
}

export const AnimalStatusCard: React.FC<AnimalStatusCardProps> = ({ animal, animalInfo }) => {
  const getMaturityStatus = () => {
    if (animal.isMature) {
      return <span className="text-green-600 text-sm">已成熟</span>;
    }
    const now = Date.now();
    const remainingTime = Math.max(0, animal.maturesAt - now);
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    return (
      <span className="text-amber-600 text-sm">
        还需 {minutes}分{seconds}秒
      </span>
    );
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{animalInfo.name}</h3>
          {getMaturityStatus()}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center text-rose-500">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm">{animal.health}%</span>
          </div>
          <div className="flex items-center text-amber-500">
            <Smile className="w-4 h-4 mr-1" />
            <span className="text-sm">{animal.happiness}%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ 
              width: animal.isMature ? '100%' : 
                `${((Date.now() - animal.purchasedAt) / (animal.maturesAt - animal.purchasedAt)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};