import React from 'react';
import { MapGrid } from './MapGrid';
import { MapControls } from './MapControls';

const GameMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
      <div className="relative h-full bg-green-100 rounded-lg overflow-hidden">
        <MapGrid />
        <MapControls />
      </div>
    </div>
  );
};

export default GameMap;