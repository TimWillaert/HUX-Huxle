<template>
  <p>Encoded string: {{ id }}</p>
  <p>Decoded string: {{ decoded }}</p>
  <p>English word: {{ wordEnglish }}</p>
  <p>German word: {{ wordGerman }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const id = route.path.substring(1);
const decoded = window.atob(id);

const wordEnglish = ref(decoded.split("#")[1]);
const wordGerman = ref(decoded.split("#")[2]);

//Todo: validate if the decoded string is valid (should start with huxle, should have 2 hashtags, total length should be 17 characters)
//If valid: start game
//If invalid: show error pop-up (example in CreateHuxle.vue)
</script>

<style scoped></style>
