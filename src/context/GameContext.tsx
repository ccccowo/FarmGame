import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction } from '../types/game';
import { gameReducer } from './gameReducer';

const initialState: GameState = {
  money: 10000,
  selectedShop: null,
  selectedPlant: null,
  selectedAnimal: null,
  // 种下的作物
  plantedCrops: [],
  // 拥有的动物
  ownedAnimals: [],
  // 作物（未种下的）
  plants: new Map(),
  // 拥有的动物
  animals: [],
  lastPurchaseTime: {},
};

// 创建游戏上下文
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

// 游戏提供者
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 设置一个定时器，每秒更新一次作物和动物的生长状态
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch({ type: 'UPDATE_CROPS' });
  //     dispatch({ type: 'UPDATE_ANIMALS' });
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // 将状态和dispatch暴露给子组件
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// 自定义钩子，用于在组件中使用游戏状态和dispatch
export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}