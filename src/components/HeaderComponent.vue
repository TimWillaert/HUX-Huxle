<template>
  <div
    class="bg-black/95 px-5 py-3 flex justify-between items-center text-white border-b-[1px] border-white/20"
  >
    <RouterLink to="/">
      <h1 class="text-4xl satisfy">Huxle</h1>
    </RouterLink>
    <div class="flex items-center gap-2">
      <p
        class="cursor-pointer"
        :class="{
          'font-bold': $i18n.locale === 'de',
          'font-light': $i18n.locale !== 'de',
        }"
        @click="$i18n.locale = 'de'"
      >
        {{ $t('german') }}
      </p>
      <p>|</p>
      <p
        class="cursor-pointer"
        :class="{
          'font-bold': $i18n.locale === 'en',
          'font-light': $i18n.locale !== 'en',
        }"
        @click="$i18n.locale = 'en'"
      >
        {{ $t('english') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
