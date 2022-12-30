<template>
  <p>Encoded string: {{ id }}</p>
  <p>Decoded string: {{ decoded }}</p>
  <p>English word: {{ wordEnglish }}</p>
  <p>German word: {{ wordGerman }}</p>
  <div class ="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <KeyboardComponent  @key="onKey"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import KeyboardComponent from './KeyboardComponent.vue';
import { onUnmounted } from 'vue'

const route = useRoute();

const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split("#")[1]);
const wordGerman = ref(decoded.split("#")[2]);

//Todo: validate if the decoded string is valid (should start with huxle, should have 2 hashtags, total length should be 17 characters)
//If valid: start game
//If invalid: show error pop-up (example in CreateHuxle.vue)

let allowInput = true

const onKeyup = (e: KeyboardEvent) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})

function onKey(key: string) {
  if (!allowInput) return;
  console.log(key);
  // if (/^[a-zA-Z]$/.test(key)) {
  //   fillTile(key.toLowerCase())
  // } else if (key === 'Backspace') {
  //   clearTile()
  // } else if (key === 'Enter') {
  //   completeRow()
  // }
}
</script>

<style scoped></style>
