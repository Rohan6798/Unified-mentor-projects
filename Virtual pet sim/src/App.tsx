import React, { useEffect } from 'react';
import Pet from './components/Pet';
import StatusBars from './components/StatusBars';
import Controls from './components/Controls';
import MessageDisplay from './components/MessageDisplay';
import usePetState from './hooks/usePetState';

function App() {
  const {
    petState,
    petMood,
    attributes,
    isSleeping,
    message,
    feedPet,
    playWithPet,
    toggleSleep,
  } = usePetState();
  
  useEffect(() => {
    document.title = "Virtual Pet Simulator";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 bg-indigo-50 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-indigo-800 mb-4">Virtual Pet</h1>
          <Pet mood={petMood} isSleeping={isSleeping} />
          <MessageDisplay message={message} />
        </div>
        
        <div className="p-6">
          <StatusBars attributes={attributes} />
          <Controls 
            onFeed={feedPet} 
            onPlay={playWithPet} 
            onSleep={toggleSleep} 
            isSleeping={isSleeping}
          />
        </div>
      </div>
    </div>
  );
}

export default App;