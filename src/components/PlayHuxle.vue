<template>
  <div class="flex flex-col h-full max-h-full max-w-md mx-auto justify-between">
    <div class="mt-4">
      <RowComponent
        v-for="(guess, i) in store.guesses"
        :key="i"
        :value="guess"
        :color="store.guessesResult[i]"
        :solution="solution"
        :submitted="i < store.currentGuess"
      />
    </div>
    <KeyboardComponent
      @key="onKey"
      :greenKeys="store.greenKeys"
      :yellowKeys="store.yellowKeys"
      :grayKeys="store.grayKeys"
    />
  </div>
  <PopUp v-if="popupOpen" :setPopup="setPopup">
    <div class="max-w-[240px]">
      <p class="self-start">{{ $t('invalidLink') }}</p>
    </div>
  </PopUp>
  <EndNotification
    v-if="endGameOpen"
    :played-turns="store.currentGuess"
    :set-popup="setEndGame"
  >
    <p class="font-bold">{{ $t('guesses') }}: {{ store.currentGuess }}</p>
    <p class="font-bold">
      {{ $t('time') }}:
      {{
        Math.floor(time / 60000) < 10
          ? `0${Math.floor(time / 60000)}`
          : Math.floor(time / 60000)
      }}:{{
        ((time % 60000) / 1000).toFixed(0).length == 1
          ? `0${((time % 60000) / 1000).toFixed(0)}`
          : ((time % 60000) / 1000).toFixed(0)
      }}
    </p>
    <div class="mt-4">
      <RowComponent
        v-for="(guess, i) in store.guesses"
        :key="i"
        :value="guess"
        :color="store.guessesResult[i]"
        :solution="solution"
        :submitted="i < store.currentGuess"
        :margin="false"
      />
    </div>
  </EndNotification>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import KeyboardComponent from './KeyboardComponent.vue';
import { onUnmounted } from 'vue';
import RowComponent from './RowComponent.vue';
import PopUp from './PopUp.vue';
import EndNotification from './EndNotification.vue';
import { useHuxleStore } from './Store';

const store = useHuxleStore();

store.$state = localStorage.getItem('huxleState')
  ? JSON.parse(localStorage.getItem('huxleState') || '""')
  : store.$state;

const app = getCurrentInstance();
const route = useRoute();
const popupOpen = ref(false);
const endGameOpen = ref(false);

const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split('#')[1]);
const wordGerman = ref(decoded.split('#')[2]);
const startLanguage = ref(decoded.split('#')[3]);

// const startLanguage =
//   app?.appContext.config.globalProperties.$locale.value || 'en';

const solution = startLanguage.value == 'en' ? wordEnglish.value : wordGerman.value;
const started = ref(new Date());
const ended = ref();
const time = ref();

const setPopup = (bool: boolean) => {
  bool ? (popupOpen.value = true) : (popupOpen.value = false);
};

const setEndGame = (bool: boolean) => {
  if (bool) {
    endGameOpen.value = true;
    ended.value = new Date();
    time.value = ended.value.getTime() - started.value.getTime();
  } else {
    endGameOpen.value = false;
  }
};

if (
  !(
    decoded.length == 20 &&
    decoded[5] === '#' &&
    decoded[11] == '#' &&
    decoded[17] == '#' &&
    decoded.split('#')[0] === 'huxle'
  )
) {
  setPopup(true);
}

//Reset game in case the solution was given and the used did not close the results window
if (store.guesses.includes(solution.toLowerCase())) {
  store.$reset();
  localStorage.setItem('huxleState', JSON.stringify(store.$state));
}

const onKeyup = (e: KeyboardEvent) => onKey(e.key);

window.addEventListener('keyup', onKeyup);

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup);
});

function onKey(key: string) {
  const locale = app?.appContext.config.globalProperties.$locale ?? '';
  if (store.currentGuess >= 6) return;
  const guess = store.guesses[store.currentGuess];
  if (key === 'Enter') {
    if (guess.length == 5) {
      const result = compare(guess, solution);
      store.guessesResult[store.currentGuess] = result.join('');

      //puzzle completition popus
      if (
        store.currentGuess <= 5 &&
        solution.toLowerCase() == store.guesses[store.currentGuess]
      ) {
        store.currentGuess++;

        setEndGame(true);
      } else if (
        store.currentGuess == 5 &&
        solution.toLowerCase() != store.guesses[store.currentGuess]
      ) {
        store.currentGuess = 0;

        setEndGame(true);
      } else {
        // Move to next guess
        store.currentGuess++;
      }
      //save game
      localStorage.setItem('huxleState', JSON.stringify(store.$state));
    }
  } else if (key === 'Backspace') {
    store.guesses[store.currentGuess] = guess.slice(0, -1);
  } else if (guess.length < 5 && /^[a-zA-Z]$/.test(key)) {
    store.guesses[store.currentGuess] += key;
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
      if (store.greenKeys.length > 0) {
        if (!store.greenKeys.includes(guess[i])) {
          store.greenKeys.push(guess[i]);
        }
      }
    } else if (solution.includes(guess[i])) {
      result.push(3);
      if (store.yellowKeys.length > 0) {
        if (!store.yellowKeys.includes(guess[i])) {
          store.yellowKeys.push(guess[i]);
        }
      }
    } else {
      result.push(2);
      if (store.grayKeys.length > 0) {
        if (!store.grayKeys.includes(guess[i])) {
          store.grayKeys.push(guess[i]);
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
