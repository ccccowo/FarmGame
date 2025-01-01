
import { useGameState } from '../../context/GameContext';
import { ActionButton } from '../ui/ActionButton';
import { getActionMenuItems } from '../../utils/actionMenuItems';

import React, { useCallback } from 'react';

const ActionPanel = () => {
  const { state, dispatch } = useGameState();
  const menuItems = getActionMenuItems();

  // 使用 useCallback 钩子记忆 handleAction 函数
  const handleAction = useCallback((action: string) => {
    // 如果点击当前已选中的动作，则关闭弹窗
    if (state.selectedShop === action) {
      dispatch({ type: 'SELECT_SHOP', shop: null });
    } else {
      // 否则打开新的弹窗
      dispatch({ type: 'SELECT_SHOP', shop: action });
    }
  }, [state.selectedShop]); // 依赖项：只有当 state.selectedShop 改变时，才重新创建 handleAction

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">操作面板</h2>
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <ActionButton
            key={item.action}
            icon={item.icon}
            label={item.label}
            onClick={
              (event) => {
                event.stopPropagation()
                handleAction(item.action)
              }

            }
            isActive={state.selectedShop === item.action}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionPanel;