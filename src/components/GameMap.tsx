import React from 'react';
import { useGameState } from '../context/GameContext';
import MapItem from './MapItem';

const GameMap = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
      <div className="relative h-full bg-green-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
          {Array.from({ length: 64 }).map((_, index) => (
            <MapItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameMap;