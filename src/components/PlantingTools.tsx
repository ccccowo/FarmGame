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
        Array.from(state.plants).map(([plantType, plants]) => {
          const plant = PLANTS[plantType];
          console.log(plantType, plants);
          if (plants.length === 0) return <p>111</p>;
          return (
            <button
              key={plantType}
              onClick={() => handleSelectCrop(plantType as PlantType)}
              className={`w-full p-2 rounded text-left ${
                state.selectedPlant === plantType
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{plant.name}</span>
                <span className="text-sm text-gray-600">剩余: {plants.length}</span>
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