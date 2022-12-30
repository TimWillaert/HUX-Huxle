<template>
  <div
    class="bg-black/95 px-5 py-3 flex justify-between items-center text-white border-b-[1px] border-white/20"
  >
    <RouterLink to="/">
      <h1 class="text-4xl satisfy">Huxle</h1>
    </RouterLink>
    <div class="flex items-center gap-2">
      <p class="cursor-pointer font-light">Deutsch</p>
      <p>|</p>
      <p class="cursor-pointer font-bold">English</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
