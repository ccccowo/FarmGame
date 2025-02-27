import { useGameState } from '../../context/GameContext';
import { ActionButton } from '../ui/ActionButton';
import { getActionMenuItems } from '../../utils/actionMenuItems';
import { useCallback } from 'react';

const ActionPanel = () => {
  const { state, dispatch } = useGameState();
  const menuItems = getActionMenuItems();
  const handleAction = useCallback((action: string | null) => {
    // 如果点击当前已选中的动作，则关闭弹窗
    if (state.selectedAction === action) {
      dispatch({ type: 'SELECT_ACTION', action: null });
    } else {
      // 否则打开新的弹窗
      dispatch({ type: 'SELECT_ACTION', action: action });
    }
  }, [state.selectedAction]); // 依赖项：只有当 state.selectedAction 改变时，才重新创建 handleAction

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <ActionButton
            key={item.action}
            icon={item.icon}
            label={item.label}
            onClick={() => handleAction(item.action)}
            isActive={state.selectedAction === item.action}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionPanel;