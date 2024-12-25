import React from 'react';

interface ResourceItemProps {
  label: string;
  value: number;
  type: 'animal' | 'crop';
}

export const ResourceItem: React.FC<ResourceItemProps> = ({ label, value, type }) => {
  const bgColor = type === 'animal' ? 'bg-blue-50' : 'bg-green-50';
  
  return (
    <div className={`${bgColor} p-2 rounded`}>
      <p className="text-sm">{label}: {value}</p>
    </div>
  );
};