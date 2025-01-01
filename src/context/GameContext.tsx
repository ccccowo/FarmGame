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

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  console.log(333)
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}