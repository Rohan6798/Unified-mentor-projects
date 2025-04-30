export type PetState = 'default' | 'eating' | 'playing' | 'sleeping';
export type PetMood = 'normal' | 'happy' | 'sad' | 'hungry' | 'sleepy';

export interface PetAttributes {
  hunger: number;
  happiness: number;
  energy: number;
}