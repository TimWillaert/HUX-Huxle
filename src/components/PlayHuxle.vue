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
      v-for="(guess, i) in state.guesses"
      :key="i"
      :usedKeys="state.usedKeys"
      :value="guess"
      :color="state.guessesResult[i]"
    />
  </div>
  <PopUp v-if="popupOpen" :setPopup="setPopup">
    <div class="max-w-[240px]">
      <p class="self-start">Whoops! Invalid Link.</p>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import KeyboardComponent from "./KeyboardComponent.vue";
import { onUnmounted, reactive } from "vue";
import RowComponent from "./RowComponent.vue";
import PopUp from "./PopUp.vue";

const route = useRoute();
const popupOpen = ref(false);
const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split("#")[1]);
const wordGerman = ref(decoded.split("#")[2]);

const setPopup = (bool: boolean) => {
  bool ? (popupOpen.value = true) : (popupOpen.value = false);
};

const state = reactive({
  guesses: ["", "", "", "", "", ""],
  guessesResult: ["", "", "", "", "", ""],
  currentGuess: 0,
  solution: wordEnglish,
  usedKeys: [{ key: "", result: 0 }],
});

//Todo: validate if the decoded string is valid (should start with huxle, should have 2 hashtags, total length should be 17 characters)
//If valid: start game
//If invalid: show error pop-up (example in CreateHuxle.vue)
if (
  !(
    decoded.length == 17 &&
    decoded[5] === "#" &&
    decoded[11] == "#" &&
    decoded.split("#")[0] === "huxle"
  )
) {
  setPopup(true);
}

const onKeyup = (e: KeyboardEvent) => onKey(e.key);

window.addEventListener("keyup", onKeyup);

onUnmounted(() => {
  window.removeEventListener("keyup", onKeyup);
});

function onKey(key: string) {
  if (state.currentGuess >= 6) return;
  const guess = state.guesses[state.currentGuess];
  if (key === "Enter") {
    if (guess.length == 5) {
      const result = compare(guess, state.solution);
      state.guessesResult[state.currentGuess] = result.join("");
      // Move to next guess
      state.currentGuess++;
      console.log(key);
      console.log(guess);
      console.log(result);
      console.log(state.usedKeys);
    }
  } else if (key === "Backspace") {
    state.guesses[state.currentGuess] = guess.slice(0, -1);
  } else if (guess.length < 5 && /^[a-zA-Z]$/.test(key)) {
    state.guesses[state.currentGuess] += key;
  }
}

function compare(guess: string, solution: string) {
  // Make sure the strings are the same length
  if (guess.length !== solution.length) {
    throw new Error("Strings must be the same length");
  }
  const result = [];
  guess = guess.toLowerCase();
  solution = solution.toLowerCase();
  // Iterate through the characters in the strings
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result.push(1);
    } else if (solution.includes(guess[i])) {
      result.push(3);
    } else {
      result.push(2);
    }
    if (state.usedKeys.length > 0) {
      const keyList = state.usedKeys.map((key) => key.key);

      if (!keyList.includes(guess[i])) {
        state.usedKeys.push({ key: guess[i], result: result[i] });
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
