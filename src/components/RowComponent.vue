<template>
  <div class="row flex justify-around my-4">
    <LetterComponent v-for="i in 5" :key="i" :letter="value[i - 1]"/>
  </div>
</template>

<script setup lang="ts">
import LetterComponent from './LetterComponent.vue';

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  solution: String,
  submitted: Boolean,
});

</script>

<style scoped></style>