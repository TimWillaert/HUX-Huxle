<template>
  <!-- <p>Encoded string: {{ id }}</p>
  <p>Decoded string: {{ decoded }}</p>
  <p>English word: {{ wordEnglish }}</p>
  <p>German word: {{ wordGerman }}</p> -->
  <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <RowComponent
      v-for="(guess, i) in state.guesses"
      :key="i"
      :value="guess"
      :solution="state.solution"
      :submitted="i < state.currentGuess"
    />
    <KeyboardComponent @key="onKey" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import KeyboardComponent from './KeyboardComponent.vue';
import { onUnmounted, reactive } from 'vue'
import RowComponent from "./RowComponent.vue";

const route = useRoute();

const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split("#")[1]);
const wordGerman = ref(decoded.split("#")[2]);

const state = reactive({
  guesses: ["", "", "", "", "", ""],
  currentGuess: 0,
  solution: wordEnglish,
})


//Todo: validate if the decoded string is valid (should start with huxle, should have 2 hashtags, total length should be 17 characters)
//If valid: start game
//If invalid: show error pop-up (example in CreateHuxle.vue)

const onKeyup = (e: KeyboardEvent) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})

function onKey(key: string) {
  if (state.currentGuess >= 6) return;
  const guess = state.guesses[state.currentGuess];
  if (key === 'Enter')
  {
    if (guess.length == 5)
    {
      state.currentGuess++;
    }
  }
  else if (key === 'Backspace')
  {
    state.guesses[state.currentGuess] = guess.slice(0, -1);
  }
  else if (guess.length < 5 && /^[a-zA-Z]$/.test(key))
  {
    state.guesses[state.currentGuess] += key;
  }
  console.log(state.guesses[state.currentGuess]);
}
</script>

<style scoped>
#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(420px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(350px, calc(var(--height) / 6 * 5));
  margin: 0px auto;
}
</style>
