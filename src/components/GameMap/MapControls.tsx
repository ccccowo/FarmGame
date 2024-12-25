import React from 'react';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

export const MapControls: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
        <ZoomIn className="w-5 h-5" />
      </button>
      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
        <ZoomOut className="w-5 h-5" />
      </button>
      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
        <Move className="w-5 h-5" />
      </button>
    </div>
  );
};