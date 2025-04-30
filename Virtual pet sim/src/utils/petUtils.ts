import { PetAttributes, PetMood } from '../types/petTypes';

export const getPetMood = (
  attributes: PetAttributes,
  isSleeping: boolean
): PetMood => {
  if (isSleeping) return 'sleepy';
  
  // Check hunger first (most important need)
  if (attributes.hunger > 80) return 'hungry';
  
  // Then check energy
  if (attributes.energy < 20) return 'sleepy';
  
  // Then check happiness
  if (attributes.happiness > 80) return 'happy';
  if (attributes.happiness < 30) return 'sad';
  
  return 'normal';
};

export const getRandomMessage = (mood: PetMood): string => {
  const messages = {
    normal: ['Hi there!', 'How are you?', 'What shall we do today?'],
    happy: ['Yay! I\'m so happy!', 'This is fun!', 'Best day ever!'],
    sad: ['I\'m feeling a bit down...', 'Could use some attention...', 'Not feeling great...'],
    hungry: ['I\'m starving!', 'Feed me, please!', 'My tummy is rumbling!'],
    sleepy: ['*yawn* So tired...', 'Need a nap...', 'Can barely keep my eyes open...'],
  };
  
  const moodMessages = messages[mood];
  const randomIndex = Math.floor(Math.random() * moodMessages.length);
  return moodMessages[randomIndex];
};