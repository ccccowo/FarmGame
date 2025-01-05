import React from "react";
import { useGameState } from "../../context/GameContext";
import { AnimalType } from "../../types/animals";
import { ANIMALS } from "../../utils/animals";

const AnimalTools = () => {
  const { state, dispatch } = useGameState();

  const handleSelectAnimal = (animal: AnimalType | null) => {
    if (animal === null) {
      dispatch({ type: "SELECT_ANIMAL", animal: null });
    } else {
      dispatch({ type: "SELECT_ANIMAL", animal });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">动物管理</h2>
      <div className="space-y-2">
        {Object.entries(state.warehouse.ownedAnimals).map(([key, value]) => {
          const animal = ANIMALS[key as AnimalType];
          if (value === 0) return;
          return (
            <button
              key={key}
              onClick={() => handleSelectAnimal(key as AnimalType)}
              className={`w-full p-2 rounded text-left ${
                state.selectedAnimal === key
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{animal.name}</span>
                <span className="text-sm text-gray-600">剩余: {value}</span>
              </div>
            </button>
          );
        })}
        {state.selectedAnimal &&
          state.warehouse.ownedAnimals[state.selectedAnimal] > 0 && (
            <button
              onClick={() => handleSelectAnimal(null)}
              className="w-full p-2 mt-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              取消选择
            </button>
          )}
      </div>
      {/* 暂时还没有动物，快去购买吧 */}
      {Object.entries(state.warehouse.ownedAnimals).length === 0 && (
        <div className=" text-gray-500">暂时还没有动物，快去购买吧~</div>
      )}
    </div>
  );
};

export default AnimalTools;
