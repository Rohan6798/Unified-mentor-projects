import React from 'react';
import { Pizza, PlayCircle, Moon } from 'lucide-react';

interface ControlsProps {
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  isSleeping: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onFeed, onPlay, onSleep, isSleeping }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <button 
        onClick={onFeed}
        disabled={isSleeping}
        className={`control-button ${isSleeping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-100 active:bg-orange-200'}`}
      >
        <Pizza className="h-6 w-6 text-orange-500" />
        <span className="font-medium text-orange-700">Feed</span>
      </button>
      
      <button 
        onClick={onPlay}
        disabled={isSleeping}
        className={`control-button ${isSleeping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-100 active:bg-pink-200'}`}
      >
        <PlayCircle className="h-6 w-6 text-pink-500" />
        <span className="font-medium text-pink-700">Play</span>
      </button>
      
      <button 
        onClick={onSleep}
        className={`control-button ${isSleeping ? 'bg-blue-100' : 'hover:bg-blue-100 active:bg-blue-200'}`}
      >
        <Moon className="h-6 w-6 text-blue-500" />
        <span className="font-medium text-blue-700">{isSleeping ? 'Wake' : 'Sleep'}</span>
      </button>
    </div>
  );
};

export default Controls;