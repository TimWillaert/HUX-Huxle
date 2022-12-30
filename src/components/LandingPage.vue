<template>
  <div class="flex flex-col w-full h-full justify-center items-center">
    <h1 class="text-4xl leading-snug text-center">
      Welcome to <span class="satisfy text-5xl ml-1 mr-3">Huxle</span>!
    </h1>
    <p class="mt-20 text-center">
      Start playing by using a link with a Huxle game ID
    </p>
    <p class="my-7 text-sm text-gray-400">OR</p>
    <RouterLink
      to="/create"
      class="border border-white/20 px-5 py-2 rounded-md hover:bg-black transition-colors"
    >
      Create your own Huxle
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
