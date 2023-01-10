import { defineStore } from 'pinia';

export const useHuxleStore = defineStore('huxle-save', {
  state: () => {
    return {
      guesses: ['', '', '', '', '', ''],
      guessesResult: ['', '', '', '', '', ''],
      currentGuess: 0,
      greenKeys: [''],
      yellowKeys: [''],
      grayKeys: [''],
    } as HuxleState;
  },
});

export interface HuxleState {
  guesses: string[];
  guessesResult: string[];
  currentGuess: number;
  greenKeys: string[];
  yellowKeys: string[];
  grayKeys: string[];
}
