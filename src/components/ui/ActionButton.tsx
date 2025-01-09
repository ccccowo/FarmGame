import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  isActive = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
          : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <Icon className={`h-6 w-6 mb-2 ${isActive ? 'text-green-600' : 'text-gray-600'}`} />
      <span className="text-sm">{label}</span>
    </button>
  );
};