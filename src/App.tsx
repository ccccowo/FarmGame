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
function AppContent() {
  const { state } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        <GameHeader />
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
