import React from 'react';
import { Heart, Battery, Utensils } from 'lucide-react';
import { PetAttributes } from '../types/petTypes';

interface StatusBarsProps {
  attributes: PetAttributes;
}

const StatusBars: React.FC<StatusBarsProps> = ({ attributes }) => {
  const getStatusColor = (value: number) => {
    if (value <= 20) return 'bg-red-500';
    if (value <= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-3 mb-6">
      <div className="status-bar">
        <div className="flex items-center w-24">
          <Utensils className="h-5 w-5 mr-2 text-orange-500" />
          <span className="text-sm font-medium">Hunger</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full flex-1 overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ${getStatusColor(100 - attributes.hunger)}`} 
            style={{ width: `${100 - attributes.hunger}%` }}
          ></div>
        </div>
      </div>
      
      <div className="status-bar">
        <div className="flex items-center w-24">
          <Heart className="h-5 w-5 mr-2 text-pink-500" />
          <span className="text-sm font-medium">Happiness</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full flex-1 overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ${getStatusColor(attributes.happiness)}`} 
            style={{ width: `${attributes.happiness}%` }}
          ></div>
        </div>
      </div>
      
      <div className="status-bar">
        <div className="flex items-center w-24">
          <Battery className="h-5 w-5 mr-2 text-blue-500" />
          <span className="text-sm font-medium">Energy</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full flex-1 overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-500 ${getStatusColor(attributes.energy)}`} 
            style={{ width: `${attributes.energy}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBars;