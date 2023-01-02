<template>
  <div
    class="flex justify-center items-center w-14 h-14 text-lg font-bold uppercase select-none relative bg-white text-black border-2 border-gray-500"
  >
    {{ letter }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  letter: {
    type: String,
    default: " ",
  },
});
</script>

<style scoped></style>
