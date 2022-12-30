<template>
  <div
    class="absolute left-0 top-0 w-screen h-screen bg-black/75 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg flex flex-col min-w-[260px] text-black">
      <button
        class="self-end m-2 bg-gray-400 hover:bg-gray-500 transition-colors p-3 rounded-md"
        @click="setPopup(false)"
      >
        <img src="../assets/img/close.png" class="h-4" />
      </button>
      <div class="px-5 pb-5 pt-4 flex flex-grow justify-center items-center">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  setPopup: { type: Function, required: true },
});
</script>

<style scoped></style>
