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
  // 放牧的动物
  grazingAnimals: [],
  // 仓库
  warehouse: {
    seeds: {},
    ownedAnimals: {},
    plants: {},
    animalProducts: {},
  },
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 每秒更新作物的生长状态
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_PLANT_GROWTH_TIME' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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