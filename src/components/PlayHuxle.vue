<template>
  <div class="flex flex-col h-full max-h-full max-w-md mx-auto justify-between">
    <div class="mt-4">
      <RowComponent
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :color="state.guessesResult[i]"
        :solution="state.solution"
        :submitted="i < state.currentGuess"
      />
    </div>
    <KeyboardComponent
      @key="onKey"
      :greenKeys="state.greenKeys"
      :yellowKeys="state.yellowKeys"
      :grayKeys="state.grayKeys"
    />
  </div>
  <PopUp v-if="popupOpen" :setPopup="setPopup" :isEndgame="false">
    <div class="max-w-[240px]">
      <p class="self-start">Whoops! Invalid Link.</p>
    </div>
  </PopUp>
  <EndNotification
    v-if="endGameOpen"
    :played-turns="state.currentGuess"
    :set-popup="setEndGame"
  >
    <div class="mt-4">
      <RowComponent
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :color="state.guessesResult[i]"
        :solution="state.solution"
        :submitted="i < state.currentGuess"
      />
    </div>
  </EndNotification>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import KeyboardComponent from './KeyboardComponent.vue';
import { onUnmounted, reactive } from 'vue';
import RowComponent from './RowComponent.vue';
import PopUp from './PopUp.vue';
import EndNotification from './EndNotification.vue';

const route = useRoute();
const popupOpen = ref(false);
const endGameOpen = ref(false);

const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split('#')[1]);
const wordGerman = ref(decoded.split('#')[2]);

const savedGame = localStorage.getItem('huxle-game') || '';

const setPopup = (bool: boolean) => {
  bool ? (popupOpen.value = true) : (popupOpen.value = false);
};

const setEndGame = (bool: boolean) => {
  bool ? (endGameOpen.value = true) : (endGameOpen.value = false);
};

const state = reactive({
  guesses: ['', '', '', '', '', ''],
  guessesResult: ['', '', '', '', '', ''],
  currentGuess: 0,
  solution: wordEnglish,
  greenKeys: [''],
  yellowKeys: [''],
  grayKeys: [''],
});

if (savedGame != '') {
  const savedState = JSON.parse(savedGame);
  state.guesses = savedState.guesses;
  state.guessesResult = savedState.guessesResult;
  state.currentGuess = savedState.currentGuess;
  state.solution = savedState.solution;
  state.greenKeys = savedState.greenKeys;
  state.yellowKeys = savedState.yellowKeys;
  state.grayKeys = savedState.grayKeys;
}

//Todo: validate if the decoded string is valid (should start with huxle, should have 2 hashtags, total length should be 17 characters)
//If valid: start game
//If invalid: show error pop-up (example in CreateHuxle.vue)
if (
  !(
    decoded.length == 17 &&
    decoded[5] === '#' &&
    decoded[11] == '#' &&
    decoded.split('#')[0] === 'huxle'
  )
) {
  setPopup(true);
}

const onKeyup = (e: KeyboardEvent) => onKey(e.key);

window.addEventListener('keyup', onKeyup);

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup);
});

function onKey(key: string) {
  if (state.currentGuess >= 6) return;
  const guess = state.guesses[state.currentGuess];
  if (key === 'Enter') {
    if (guess.length == 5) {
      const result = compare(guess, state.solution);
      state.guessesResult[state.currentGuess] = result.join('');

      //save game
      localStorage.setItem('huxle-game', JSON.stringify(state));

      //puzzle completition popus
      if (
        state.currentGuess <= 5 &&
        state.solution.toLowerCase() == state.guesses[state.currentGuess]
      ) {
        state.currentGuess++;
        localStorage.setItem('huxle-game', '');
        setEndGame(true);
      } else if (
        state.currentGuess == 5 &&
        state.solution.toLowerCase() != state.guesses[state.currentGuess]
      ) {
        state.currentGuess = 0;
        localStorage.setItem('huxle-game', '');
        setEndGame(true);
      } else {
        // Move to next guess
        state.currentGuess++;
      }

    }
  } else if (key === 'Backspace') {
    state.guesses[state.currentGuess] = guess.slice(0, -1);
  } else if (guess.length < 5 && /^[a-zA-Z]$/.test(key)) {
    state.guesses[state.currentGuess] += key;
  }
}

function compare(guess: string, solution: string) {
  // Make sure the strings are the same length
  if (guess.length !== solution.length) {
    throw new Error('Strings must be the same length');
  }
  const result = [];
  guess = guess.toLowerCase();
  solution = solution.toLowerCase();
  // Iterate through the characters in the strings
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result.push(1);
      if (state.greenKeys.length > 0) {
        if (!state.greenKeys.includes(guess[i])) {
          state.greenKeys.push(guess[i]);
        }
      }
    } else if (solution.includes(guess[i])) {
      result.push(3);
      if (state.yellowKeys.length > 0) {
        if (!state.yellowKeys.includes(guess[i])) {
          state.yellowKeys.push(guess[i]);
        }
      }
    } else {
      result.push(2);
      if (state.grayKeys.length > 0) {
        if (!state.grayKeys.includes(guess[i])) {
          state.grayKeys.push(guess[i]);
        }
      }
    }
  }
  // Return the array of results
  // 1 means the guess is in the correct position
  // 2 means the guess is in the wrong position and not in the solution
  // 3 means the guess is in the wrong position but is in the solution
  return result;
}
</script>

<style scoped></style>
