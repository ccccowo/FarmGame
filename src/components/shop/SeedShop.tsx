import React from 'react';
import { useGameState } from '../../context/GameContext';
import { PLANTS } from '../../utils/plants';
import { PlantType } from '../../types/plants';
import { X } from 'lucide-react';

const SeedShop = () => {
  const { state, dispatch } = useGameState();
  const lastPurchaseTime = React.useRef<number | null>(null);

  const handleBuySeeds = React.useCallback((plantType: PlantType, purchasePrice: number) => {
    console.log('handleBuySeeds called', plantType, purchasePrice);
    if (state.money >= purchasePrice) {
      const currentTime = Date.now();
      if (!lastPurchaseTime.current || currentTime - lastPurchaseTime.current > 500) {
        lastPurchaseTime.current = currentTime;
        console.log('dispatching BUY_PLANT');
        dispatch({ 
          type: 'BUY_PLANT', 
          plantType
        });
      }
    }
  }, [state.money, dispatch]);

  const closeShop = () => {
    dispatch({ type: 'SELECT_SHOP', shop: null });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">种子商店</h2>
          <button onClick={closeShop} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(PLANTS).map(([key, plant]) => (
            <div key={key} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{plant.name}</h3>
                <p className="text-sm text-gray-600">生长期: {plant.growthTime}天</p>
                <p className="text-sm text-gray-600">售价: ¥{plant.purchasePrice}</p>
              </div>
              <button
                onClick={() => handleBuySeeds(plant.type as PlantType, plant.purchasePrice)}
                disabled={state.money < plant.purchasePrice}
                className={`px-4 py-2 rounded ${
                  state.money >= plant.purchasePrice  
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                购买 ¥{plant.purchasePrice}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeedShop;