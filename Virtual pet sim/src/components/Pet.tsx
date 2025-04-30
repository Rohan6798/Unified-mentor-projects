import React from 'react';
import { PetMood } from '../types/petTypes';
import { Cat, Moon, AArrowDown as ZZZ } from 'lucide-react';

interface PetProps {
  mood: PetMood;
  isSleeping: boolean;
}

const Pet: React.FC<PetProps> = ({ mood, isSleeping }) => {
  const getMoodClass = () => {
    if (isSleeping) return 'pet-sleeping';
    
    switch (mood) {
      case 'happy': return 'pet-happy';
      case 'sad': return 'pet-sad';
      case 'hungry': return 'pet-hungry';
      case 'sleepy': return 'pet-sleepy';
      default: return '';
    }
  };

  const renderSleepBubble = () => {
    if (!isSleeping) return null;
    
    return (
      <div className="absolute -top-2 right-0 bg-blue-100 p-2 rounded-full animate-pulse">
        <ZZZ className="h-5 w-5 text-blue-500" />
      </div>
    );
  };

  const getEyeStyle = () => {
    if (isSleeping) return 'pet-eyes-closed';
    if (mood === 'sleepy') return 'pet-eyes-sleepy';
    if (mood === 'sad' || mood === 'hungry') return 'pet-eyes-sad';
    return 'pet-eyes-default';
  };

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className={`relative transition-all duration-500 ${getMoodClass()}`}>
        <div className="bg-amber-200 w-36 h-36 rounded-full flex items-center justify-center relative">
          {/* Pet face */}
          <div className="pet-face">
            {/* Eyes */}
            <div className={`flex space-x-8 mb-2 ${getEyeStyle()}`}>
              <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
              <div className="w-4 h-4 bg-slate-800 rounded-full"></div>
            </div>
            
            {/* Mouth */}
            <div className={`w-8 h-4 mx-auto transition-all duration-300 ${
              mood === 'happy' 
                ? 'bg-slate-800 rounded-t-full' 
                : mood === 'sad' 
                  ? 'border-b-4 border-slate-800 rounded-b-full' 
                  : 'border-b-2 border-slate-800'
            }`}>
            </div>
          </div>
          
          {/* Ears */}
          <div className="absolute -top-4 -left-2 w-6 h-12 bg-amber-300 rounded-full transform -rotate-12 transition-transform duration-300"></div>
          <div className="absolute -top-4 -right-2 w-6 h-12 bg-amber-300 rounded-full transform rotate-12 transition-transform duration-300"></div>
          
          {renderSleepBubble()}
        </div>
      </div>
    </div>
  );
};

export default Pet;