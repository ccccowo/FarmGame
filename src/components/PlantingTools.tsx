import React from 'react';
import { useGameState } from '../context/GameContext';
import { PLANTS } from '../utils/plants';
import { PlantType } from '../types/plants';

const PlantingTools = () => {
  const { state, dispatch } = useGameState();

  const handleSelectCrop = (plant: PlantType | null) => {
    if (plant === null) {
      dispatch({ type: 'SELECT_PLANT', plant: null });
    } else {
      dispatch({ type: 'SELECT_PLANT', plant });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">种植工具</h2>
      <div className="space-y-2">
        {
        Object.entries(state.warehouse.seeds).map(([key,value]) => {
          const plant = PLANTS[key as PlantType];
          if (value === 0) return
          return (
            <button
              key={key}
              onClick={() => handleSelectCrop(key as PlantType)}
              className={`w-full p-2 rounded text-left ${
                state.selectedPlant === key
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{plant.name}</span>
                <span className="text-sm text-gray-600">剩余: {value}</span>
              </div>
            </button>
          );
        })}
          {state.selectedPlant && (
          <button
            onClick={() => handleSelectCrop(null)}
            className="w-full p-2 mt-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            取消选择
          </button>
        )}
      </div>
    </div>
  );
}

export default PlantingTools;