import { useGameState } from '../../context/GameContext';
import { EquipmentType } from '../../types/equipment';
import { EQUIPMENT } from '../../utils/equipment';

const EquipmentTool = () => {
  const { state, dispatch } = useGameState();

  const handleSelectEquipment = (equipmentType: EquipmentType | null) => {
      dispatch({ type: 'SELECT_EQUIPMENT', equipmentType });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">道具使用</h2>
      <div className="space-y-2">
        {
        Object.entries(state.warehouse.equipments).map(([key,value]) => {
          const equipment = EQUIPMENT[key as EquipmentType];
          if (value === 0) return
          return (
            <button
              key={key}
              onClick={() => handleSelectEquipment(key as EquipmentType)}
              className={`w-full p-2 rounded text-left ${
                state.selectedEquipment === key
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{equipment.name}</span>
                <span className="text-sm text-gray-600">剩余: {value}</span>
              </div>
            </button>
          );
        })}
          {state.selectedEquipment && (
          <button
            onClick={() => handleSelectEquipment(null)}
            className="w-full p-2 mt-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            取消选择
          </button>
        )}
      </div>
      {/* 暂时还没有道具，快去购买吧 */}
      {Object.entries(state.warehouse.equipments).length === 0 && (
        <div className=" text-gray-500">
          暂时还没有道具，快去购买吧~
        </div>
      )}
    </div>
  );
}

export default EquipmentTool;