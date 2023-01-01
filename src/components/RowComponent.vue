<template>
  <div class="row">
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

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
</style>