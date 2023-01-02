<template>
  <div class="flex flex-col h-full max-h-full max-w-md mx-auto justify-between">
    <div class="mt-4">
      <RowComponent
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution"
        :submitted="i < state.currentGuess"
      />
    </div>
    <KeyboardComponent @key="onKey" />
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
  currentGuess: 0,
  solution: wordEnglish,
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
      state.currentGuess++;
    }
  } else if (key === "Backspace") {
    state.guesses[state.currentGuess] = guess.slice(0, -1);
  } else if (guess.length < 5 && /^[a-zA-Z]$/.test(key)) {
    state.guesses[state.currentGuess] += key;
  }
}
</script>

<style scoped></style>
