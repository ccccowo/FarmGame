import React from 'react';
import { MapCell } from './MapCell';
import { useGameState } from '../../context/GameContext';
import { PlantedCrop } from '../../types/plants';

export const MapGrid: React.FC = () => {
  const { state } = useGameState();
  const plantedArray = state.plantedCrops;
  const grazingAnimals = state.grazingAnimals;

  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-2 p-4 overflow-visible z-0">
      {Array.from({ length: 30 }).map((_, index) => {
        let plantedCrop: PlantedCrop | undefined = plantedArray.find(crop => crop.position === index);
        let grazingAnimal = grazingAnimals.find(animal => animal.position === index);
        return <MapCell key={index} index={index} plantedCrop={plantedCrop} grazingAnimal={grazingAnimal} />;
      })}
    </div>
  );
};