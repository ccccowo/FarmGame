import React from 'react';
import { MapCell } from './MapCell';
import { useGameState } from '../../context/GameContext';
import { PlantedCrop } from '../../types/plants';

export const MapGrid: React.FC = () => {
  const { state } = useGameState();
//   const plantedArray: Array<PlantedCrop> = [
//     {
//         id: '1',
//         type: 'wheat',
//         plantedAt: Date.now(),
//         position: 0,
//         growthTime: 10000,
//         isReady: false,
//     },
//     {
//         id: '5',
//         type: 'wheat',
//         plantedAt: Date.now(),
//         position: 13,
//         growthTime: 10000,
//         isReady: false,
//     }
// ]
  const plantedArray = state.plantedCrops
  return (
    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-2 p-4">
      {
      Array.from({ length: 16 }).map((_, index) => {
        let plantedCrop: PlantedCrop | undefined = plantedArray.find(crop => crop.position === index);
        return <MapCell key={index} index={index} plantedCrop={ plantedCrop }/>;
      })}
    </div>
  );
};