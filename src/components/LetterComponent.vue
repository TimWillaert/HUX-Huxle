<template>
  <div
    :style="{ backgroundColor: btnColor }"
    class="flex justify-center items-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-lg font-bold uppercase select-none relative bg-[] text-black border-2 border-gray-500"
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
  btnColor: {
    type: String,
    default: "white",
  },
});
</script>

<style scoped></style>
