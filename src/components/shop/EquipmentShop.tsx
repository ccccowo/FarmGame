import React from 'react';
import { useGameState } from '../../context/GameContext';
import { EQUIPMENT } from '../../utils/equipment';
import { X, Tractor, Sprout, Pill } from 'lucide-react';

const getIconForType = (type: string) => {
  switch (type) {
    case 'machine':
      return Tractor;
    case 'feed':
    case 'fertilizer':
      return Sprout;
    case 'medicine':
      return Pill;
    default:
      return Tractor;
  }
};

const EquipmentShop = () => {
  const { state, dispatch } = useGameState();

  const handleBuyEquipment = (itemId: string, price: number) => {
    if (state.money >= price) {
      dispatch({
        type: 'BUY_EQUIPMENT',
        item: itemId as keyof typeof state.equipment,
        quantity: 1
      });
    }
  };

  const closeShop = () => {
    dispatch({ type: 'SELECT_ACTION', action: null });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">农场设备商店</h2>
          <button onClick={closeShop} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(EQUIPMENT).map(([key, item]) => {
            const Icon = getIconForType(item.type);
            return (
              <div key={key} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        效率提升: {(item.efficiency * 100 - 100).toFixed(0)}%
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        ¥{item.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuyEquipment(key, item.price)}
                      disabled={state.money < item.price}
                      className={`mt-3 w-full px-4 py-2 rounded text-sm font-medium ${
                        state.money >= item.price
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      }`}
                    >
                      购买
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EquipmentShop;