import React from 'react';
import GameHeader from './components/GameHeader';
import ResourcePanel from './components/ResourcePanel';

import GameMap from './components/GameMap/index';

// 商店
import ShopPanel from './components/shop/ShopPanel';
import SeedShop from './components/shop/SeedShop';
import EquipmentShop from './components/shop/EquipmentShop';
import AnimalShop from './components/shop/AnimalShop';

// 动物管理
import AnimalManagement from './components/AnimalManagement';

// 种植工具
import PlantingTools from './components/PlantingTools';
import { GameProvider } from './context/GameContext';
import { useGameState } from './context/GameContext';

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
          </div>
          <div className="lg:col-span-3 space-y-6">
            {/* <ResourcePanel /> */}
            {/* <AnimalManagement /> */}

            {/* 种植工具 */}
            <PlantingTools />

            {/* 商店 面板*/}
            <ShopPanel />
          </div>
        </div>
      </div>
      {state.selectedShop === 'BUY_SEEDS' && <SeedShop />}  
      {state.selectedShop === 'BUY_EQUIPMENT' && <EquipmentShop />}
      {state.selectedShop === 'BUY_ANIMAL' && <AnimalShop />}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;