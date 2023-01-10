<template>
  <div id="keyboard" class="mt-[30px] mb-[20px] mx-[8px] select-none">
    <div
      class="row flex w-full mt-[0] mx-auto mb-[8px] touch-manipulation"
      v-for="(row, i) in rows"
      v-bind:key="i"
    >
      <button
        v-for="key in row"
        v-bind:class="[key.length > 1]"
        @click="$emit('key', key)"
        v-bind:key="key"
        class="font-bold border-0 padding-0 m-0 mr-[5px] h-12 rounded cursor-pointer select-none bg-[#d3d6da] text-[#1a1a1b] flex-1 flex justify-center items-center uppercase"
        :style="{
          backgroundColor: greenKeys.includes(key)
            ? '#5fa059'
            : yellowKeys.includes(key)
            ? '#c2ab4e'
            : grayKeys.includes(key)
            ? '#6d7173'
            : 'white',
        }"
      >
        <span v-if="key !== 'Backspace'">{{ key }}</span>
        <img v-else src="../assets/img/backspace.png" class="h-4" />
      </button>
      <div class="spacer" v-if="i === 1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const emit = defineEmits<{
  (e: 'key', key: string): void;
}>();

const props = defineProps({
  greenKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  yellowKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  grayKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  solution: String,
  submitted: Boolean,
});

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];
</script>

<style scoped>
button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s 1.5s;
}
button:last-of-type {
  margin: 0;
}
button.big {
  flex: 1.5;
}
</style>
