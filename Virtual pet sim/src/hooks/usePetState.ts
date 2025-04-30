import { useState, useEffect, useCallback } from 'react';
import { PetAttributes, PetMood, PetState } from '../types/petTypes';
import { getPetMood, getRandomMessage } from '../utils/petUtils';

const DECAY_INTERVAL = 1000; // 1 second for testing (would be longer in production)
const DECAY_AMOUNT = 1;

const DEFAULT_ATTRIBUTES: PetAttributes = {
  hunger: 30,
  happiness: 70,
  energy: 80,
};

const usePetState = () => {
  const [attributes, setAttributes] = useState<PetAttributes>(DEFAULT_ATTRIBUTES);
  const [isSleeping, setIsSleeping] = useState(false);
  const [message, setMessage] = useState('');
  const [petState, setPetState] = useState<PetState>('default');
  const [decayPaused, setDecayPaused] = useState(false);
  
  // Calculate pet mood based on attributes
  const petMood: PetMood = getPetMood(attributes, isSleeping);
  
  // Display random messages based on pet state
  useEffect(() => {
    if (petMood !== 'normal') {
      const newMessage = getRandomMessage(petMood);
      setMessage(newMessage);
    }
  }, [petMood]);
  
  // Decay attributes over time
  useEffect(() => {
    if (decayPaused) return;
    
    const interval = setInterval(() => {
      setAttributes(prev => {
        const newAttributes = { ...prev };
        
        if (!isSleeping) {
          // When awake, increase hunger and decrease happiness and energy
          newAttributes.hunger = Math.min(prev.hunger + DECAY_AMOUNT, 100);
          newAttributes.happiness = Math.max(prev.happiness - DECAY_AMOUNT, 0);
          newAttributes.energy = Math.max(prev.energy - DECAY_AMOUNT, 0);
        } else {
          // When sleeping, increase energy
          newAttributes.energy = Math.min(prev.energy + DECAY_AMOUNT * 2, 100);
        }
        
        return newAttributes;
      });
    }, DECAY_INTERVAL);
    
    return () => clearInterval(interval);
  }, [isSleeping, decayPaused]);
  
  // Feed the pet
  const feedPet = useCallback(() => {
    if (isSleeping) return;
    
    setDecayPaused(true);
    setMessage('Yum! That was delicious!');
    
    setAttributes(prev => ({
      ...prev,
      hunger: Math.max(prev.hunger - 20, 0),
      energy: Math.min(prev.energy + 10, 100),
    }));
    
    setTimeout(() => setDecayPaused(false), 1000);
  }, [isSleeping]);
  
  // Play with the pet
  const playWithPet = useCallback(() => {
    if (isSleeping) return;
    
    setDecayPaused(true);
    setMessage('Woohoo! Playing is fun!');
    
    setAttributes(prev => ({
      ...prev,
      happiness: Math.min(prev.happiness + 20, 100),
      energy: Math.max(prev.energy - 15, 0),
    }));
    
    setTimeout(() => setDecayPaused(false), 1000);
  }, [isSleeping]);
  
  // Toggle sleep state
  const toggleSleep = useCallback(() => {
    setIsSleeping(prev => {
      const newState = !prev;
      if (newState) {
        setMessage('Zzz... Sleeping...');
      } else {
        setMessage('Good morning!');
      }
      return newState;
    });
  }, []);
  
  return {
    petState,
    petMood,
    attributes,
    isSleeping,
    message,
    feedPet,
    playWithPet,
    toggleSleep,
  };
};

export default usePetState;