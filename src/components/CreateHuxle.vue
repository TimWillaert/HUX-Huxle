<template>
  <div class="mt-10 flex flex-col">
    <p class="text-2xl">{{ $t('create') }}</p>

    <Form @submit="onSubmit" class="flex flex-col">
      <label for="english" class="mt-10 mb-2">{{ $t('englishWord') }}</label>
      <Field
        type="text"
        id="english"
        name="english"
        placeholder="Today"
        maxlength="5"
        :rules="validateWord"
      />
      <ErrorMessage name="english" class="mt-2 text-red-600/70 text-sm" />

      <label for="german" class="mt-6 mb-2">{{ $t('germanWord') }}</label>
      <Field
        type="text"
        id="german"
        name="german"
        placeholder="Heute"
        maxlength="5"
        :rules="validateWord"
      />
      <ErrorMessage name="german" class="mt-2 text-red-600/70 text-sm" />

      <label class="mt-6 mb-2">{{ $t('defaultLang') }}</label>
      <div>
        <input type="radio" id="en" value="en" v-model="defaultLang" />
        <label class="ml-2" for="en">{{ $t('english') }}</label>
      </div>
      <div>
        <input type="radio" id="de" value="de" v-model="defaultLang" />
        <label class="ml-2" for="de">{{ $t('german') }}</label>
      </div>

      <button
        class="self-end mt-20 border border-white/20 px-5 py-2 rounded-md hover:bg-black transition-colors"
      >
        {{ $t('createLink') }}
      </button>
    </Form>
  </div>

  <PopUp v-if="popupOpen" :setPopup="setPopup">
    <div class="max-w-[240px]">
      <p class="self-start">{{ $t('linkShare') }}:</p>
      <div class="flex items-center">
        <a
          :href="link"
          target="_blank"
          class="underline max-w-full overflow-hidden whitespace-nowrap text-ellipsis bg-gray-200 p-2 rounded-md mt-1"
          >{{ link }}</a
        >
      </div>
      <button
        class="mt-10 w-full px-5 py-2 rounded-md bg-gray-400 hover:bg-gray-500 transition-colors"
        @click="copyLink"
      >
        {{ copyText }}
      </button>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopUp from './PopUp.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { containsSpecialChars } from '../helpers/validation';
import { useHuxleStore } from './Store';

const store = useHuxleStore();

const popupOpen = ref(false);
const defaultLang = ref('en');
const copyText = ref('Copy link');
const link = ref('http://127.0.0.1:5173/test');

const setPopup = (bool: boolean) => {
  bool ? (popupOpen.value = true) : (popupOpen.value = false);
};

const copyLink = () => {
  navigator.clipboard.writeText(link.value);
  copyText.value = 'Copied!';
};

const validateWord = (value: string) => {
  if (!value) {
    return 'This field is required.';
  }

  if (value.length != 5) {
    return 'The word must have exactly 5 letters';
  }

  if (containsSpecialChars(value)) {
    return 'The word cannot contain special characters.';
  }

  return true;
};

const onSubmit = (values: { english: string; german: string }) => {
  if (validateWord(values.english) && validateWord(values.german)) {
    //reset previous state
    store.$reset();
    localStorage.setItem('huxleState', '');

    setPopup(true);
    let toEncode = `huxle#${values.english}#${values.german}#${defaultLang.value}`;
    let encoded = window.btoa(toEncode);
    link.value = `http://127.0.0.1:5173/${encoded}`;
    copyText.value = 'Copy link';
  }
};
</script>

<style scoped></style>
