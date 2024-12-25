import React from 'react';
import { useGameState } from '../../context/GameContext';
import { ActionButton } from '../ui/ActionButton';
import { getActionMenuItems } from '../../utils/actionMenuItems';

const ActionPanel = () => {
  const { state, dispatch } = useGameState();
  const menuItems = getActionMenuItems();

  const handleAction = (action: string) => {
    // 如果点击当前已选中的动作，则关闭弹窗
    if (state.selectedShop === action) {
      dispatch({ type: 'SELECT_SHOP', shop: 'null' });
      console.log(state.selectedShop);
    } else {
      // 否则打开新的弹窗
      dispatch({ type: 'SELECT_SHOP', shop: action });
      console.log(state.selectedShop);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">操作面板</h2>
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <ActionButton
            key={item.action}
            icon={item.icon}
            label={item.label}
            onClick={() => handleAction(item.action)}
            isActive={state.selectedShop === item.action}
          />
        ))}
      </div>
    </div>
  );
}

export default ActionPanel