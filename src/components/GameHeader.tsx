import React from 'react';
import { useGameState } from '../context/GameContext';
import { Sprout } from 'lucide-react';

const GameHeader = () => {
  const { state } = useGameState();

  return (
    <div className="bg-white rounded-lg shadow-lg p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">o(*￣▽￣*)o我的农场</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 px-4 py-2 rounded-lg">
            <span className="font-semibold text-green-800">资金: ¥{state.money.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;