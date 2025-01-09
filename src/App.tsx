import React from "react";
import GameHeader from "./components/ui/GameHeader";
import GameMap from "./components/map/index";
// 商店
import ActionPanel from "./components/active/ActivePanel";
import SeedShop from "./components/active/SeedShop";
import EquipmentShop from "./components/active/EquipmentShop";
import AnimalShop from "./components/active/AnimalShop"
import WareHouse from "./components/active/WareHouse"
import { FarmTab } from "./components/tab/FarmTab";
import { useGameState } from "./context/GameContext";
import { Modal } from 'antd';

function AppContent() {
  const { state, resetGame } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <GameHeader />
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => {
                Modal.confirm({
                  title: '确认重置游戏',
                  content: '重置后游戏将恢复到初始状态，所有进度将丢失。确定要重置吗？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk: resetGame
                });
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              重置游戏
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* 游戏地图   */}
          <div className="lg:col-span-9">
            <GameMap />
            <br />
            {/* 操作面板*/}
            <ActionPanel />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <FarmTab />
          </div>
        </div>
      </div>
      {state.selectedAction === "BUY_SEEDS" && <SeedShop />}
      {state.selectedAction === "BUY_EQUIPMENT" && <EquipmentShop />}
      {state.selectedAction === "BUY_ANIMAL" && <AnimalShop />}
      {state.selectedAction === "MANAGE_WAREHOUSE" && <WareHouse />}
    </div>
  );
}

function App() {
  return <AppContent></AppContent>;
}

export default App;
