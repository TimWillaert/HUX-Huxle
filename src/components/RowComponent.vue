<template>
  <div class="row flex justify-around" :class="{'my-4': margin}">
    <LetterComponent
      v-for="i in 5"
      :style="{
        backgroundColor:
          color[i - 1] === '1'
            ? '#5fa059'
            : color[i - 1] === '2'
            ? '#6d7173'
            : color[i - 1] === '3'
            ? '#c2ab4e'
            : 'white',
      }"
      :key="i"
      :letter="value[i - 1]"
    />
  </div>
</template>

<script setup lang="ts">
import LetterComponent from "./LetterComponent.vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "white",
  },
  margin: {
    type: Boolean,
    default: true
  },

  solution: String,
  submitted: Boolean,
});
</script>

<style scoped></style>
