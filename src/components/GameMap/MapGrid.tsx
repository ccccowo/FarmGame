import React from 'react';
import { MapCell } from './MapCell';
import { useGameState } from '../../context/GameContext';

export const MapGrid: React.FC = () => {
  const { state } = useGameState();

  return (
    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-4">
      {Array.from({ length: 64 }).map((_, index) => {
        const plantedCrop = state.plantedCrops.find(crop => crop.position === index);
        return <MapCell key={index} index={index} plantedCrop={plantedCrop} />;
      })}
    </div>
  );
};