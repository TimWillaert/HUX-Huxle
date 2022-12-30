<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div class="h-screen bg-black/95">
    <div class="flex flex-col h-full">
      <HeaderComponent />
      <div class="container flex-grow text-white">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
