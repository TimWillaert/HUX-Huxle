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
          'font-bold': getLanguage() === 'de',
          'font-light': getLanguage() !== 'de',
        }"
        @click="setPopup(true)
        "
      >
        {{ $t('german') }}
      </p>
      <p>|</p>
      <p
        class="cursor-pointer"
        :class="{
          'font-bold': getLanguage() === 'en',
          'font-light': getLanguage() !== 'en',
        }"
        @click="setPopup(true)"
      >
        {{ $t('english') }}
      </p>
    </div>
  </div>
  <PopUp class="PopUp" v-if="popupOpen" :setPopup="setPopup">
    <div>
      <p class="self-start">{{ $t('changeLanguage') }}</p>
      <div class="flex my-5 justify-between">
      <button @click="changeLanguage()">{{ $t('switch') }}</button>
      <button @click="setPopup(false)">{{ $t('cancel') }}</button>
    </div>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { getCurrentInstance, ref } from 'vue';
import PopUp from './PopUp.vue';
import { useI18n } from "vue-i18n";
import { useHuxleStore } from './Store';

const store = useHuxleStore();
const { locale } = useI18n();


const app = getCurrentInstance();
const popupOpen = ref(false);

function setPopup(value: boolean) {
  popupOpen.value = value;
}

function changeLanguage() {
  const lang = locale.value === 'en' ? 'de' : 'en';
  locale.value = lang;

  if (app) {
    app.appContext.config.globalProperties.$locale = lang;
    localStorage.setItem('locale', lang);
  }
  setPopup(false);
  store.$reset();
  localStorage.setItem('huxleState', '');
  window.location.reload();
}

function getLanguage() {
  return localStorage.getItem('locale') ?? 'en';
}
</script>

<style scoped></style>
