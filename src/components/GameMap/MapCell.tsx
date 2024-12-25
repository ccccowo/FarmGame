import React from 'react';
import { useGameState } from '../../context/GameContext';
import { PlantedCrop } from '../../types/game';
import { PLANTS } from '../../utils/plants';
import { Sprout, Check } from 'lucide-react';

interface MapCellProps {
  index: number;
  plantedCrop?: PlantedCrop;
}

export const MapCell: React.FC<MapCellProps> = ({ index, plantedCrop }) => {
  const { state, dispatch } = useGameState();
  const now = Date.now();
  const canPlant = !plantedCrop && state.selectedCrop && state.crops[state.selectedCrop] > 0;

  const handleCellClick = () => {
    if (plantedCrop) {
      if (plantedCrop.isReady) {
        dispatch({ type: 'HARVEST_CROP', cropId: plantedCrop.id });
      }
      return;
    }

    if (canPlant) {
      dispatch({ type: 'PLANT_CROP', position: index });
    }
  };

  const getProgressPercentage = () => {
    if (!plantedCrop) return 0;
    const total = plantedCrop.readyAt - plantedCrop.plantedAt;
    const current = now - plantedCrop.plantedAt;
    return Math.min((current / total) * 100, 100);
  };

  const getTooltipContent = () => {
    if (!plantedCrop) {
      if (canPlant) {
        return `点击种植 ${PLANTS[state.selectedCrop].name}`;
      }
      return '空地';
    }

    const plant = PLANTS[plantedCrop.type];
    if (plantedCrop.isReady) {
      return `${plant.name} (已成熟，点击收获)`;
    }

    const timeRemaining = Math.ceil((plantedCrop.readyAt - now) / 1000);
    return `${plant.name} (还需 ${timeRemaining} 秒)`;
  };

  const getCellStyle = () => {
    if (plantedCrop) {
      return 'bg-green-100 hover:bg-green-200';
    }
    if (canPlant) {
      return 'bg-emerald-50 hover:bg-emerald-100 ring-2 ring-emerald-300';
    }
    return 'bg-stone-100 hover:bg-stone-200';
  };

  return (
    <div className="relative">
      <div
        onClick={handleCellClick}
        className={`group relative w-full h-full aspect-square rounded-lg cursor-pointer transition-all duration-200 ${getCellStyle()}`}
      >
        {/* Tooltip */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-20 shadow-lg">
          {getTooltipContent()}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
        </div>
        
        {/* Plant Content */}
        {plantedCrop && (
          <div className="relative w-full h-full flex items-center justify-center">
            {plantedCrop.isReady ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <Sprout className="w-6 h-6 text-green-600" />
            )}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-gray-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};