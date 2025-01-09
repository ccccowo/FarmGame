import { useGameState } from '../../context/GameContext';
import { ANIMALS } from '../../utils/animals';
import { X } from 'lucide-react';
import { AnimalCard } from '../ui/AnimalCard';
import { AnimalType } from '../../types/animals';

const AnimalShop = () => {
  const { state, dispatch } = useGameState();

  const handleBuyAnimal = (animalType: AnimalType) => {
    const animal = ANIMALS[animalType];
    if (state.money >= animal.price) {
      dispatch({ type: 'BUY_ANIMAL', animalType });
    }
  };

  const closeShop = () => {
    dispatch({ type: 'SELECT_ACTION', action: null });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">动物幼崽商店</h2>
          <button onClick={closeShop} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(ANIMALS).map(([type, animal]) => (
            <AnimalCard
              key={type}
              animal={animal}
              onBuy={() => handleBuyAnimal(type as AnimalType)}
              canAfford={state.money >= animal.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalShop;