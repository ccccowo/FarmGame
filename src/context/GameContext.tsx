import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, GameAction } from '../types/game';
import { gameReducer } from './gameReducer';

const GAME_STATE_KEY = 'farm_game_state';
const SAVE_INTERVAL = 5000; // 每5秒保存一次状态

const initialState: GameState = {
  money: 10000,
  selectedAction: null,
  selectedPlant: null,
  selectedAnimal: null,
  selectedEquipment: null,
  plantedCrops: [],
  grazingAnimals: [],
  warehouse: {
    seeds: {},
    ownedAnimals: {},
    plants: {},
    animalProducts: {},
    equipments:{}
  },
};

// 获取存储的游戏状态
const getStoredGameState = (): GameState | null => {
  try {
    const storedState = localStorage.getItem(GAME_STATE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

// 保存游戏状态
const saveGameState = (state: GameState) => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  resetGame: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  resetGame: () => null,
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // 使用存储的状态或初始状态
  const [state, dispatch] = useReducer(gameReducer, getStoredGameState() || initialState);

  // 定期更新生长状态
  useEffect(() => {
    const growthInterval = setInterval(() => {
      dispatch({ type: 'UPDATE_PLANT_GROWTH_TIME' });
      dispatch({ type: 'UPDATE_ANIMAL_MATURE_TIME' });
    }, 1000);

    return () => clearInterval(growthInterval);
  }, []);

  // 定期保存游戏状态
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveGameState(state);
    }, SAVE_INTERVAL);

    // 在组件卸载或状态重置时保存
    window.addEventListener('beforeunload', () => saveGameState(state));

    return () => {
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', () => saveGameState(state));
    };
  }, [state]);

  // 重要操作后立即保存
  useEffect(() => {
    const importantActions = [
      'PLANT_PLANT',
      'HARVEST_PLANT',
      'REMOVE_PLANT',
      'GRAZE_ANIMAL',
      'COLLECT_ANIMAL_PRODUCTS',
      'REMOVE_ANIMAL',
      'BUY_PLANT',
      'BUY_ANIMAL',
      'SELL_PLANT',
      'SELL_ANIMAL',
    ];
    
    if (state.lastAction && importantActions.includes(state.lastAction)) {
      saveGameState(state);
    }
  }, [state.lastAction]);

  // 重置游戏状态
  const resetGame = () => {
    localStorage.removeItem(GAME_STATE_KEY);
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider value={{ state, dispatch, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};