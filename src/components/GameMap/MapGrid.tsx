import React from 'react';
import { MapCell } from './MapCell';
import { useGameState } from '../../context/GameContext';
import { PlantedCrop } from '../../types/plants';

export const MapGrid: React.FC = () => {
  const { state } = useGameState();

  return (
    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-4">
      {Array.from({ length: 16 }).map((_, index) => {
        // const plantedCrop = state.plantedCrops.find(crop => crop.position === index);
        const plantedCrop: PlantedCrop = {
          id: '1',
          type: 'wheat',
          plantedAt: 1719600000,
          position: index,
          growthTime: 10000,
          isReady: false,
        };
        return <MapCell key={index} index={index} plantedCrop={plantedCrop} />;
      })}
    </div>
  );
};