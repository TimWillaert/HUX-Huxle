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
      <div
        class="px-5 pb-5 pt-4 flex flex-grow flex-col justify-center items-center"
      >
        <p v-if="showNumberMessage">{{ numberMessage }}</p>
        <img v-if="showNumberMessage" :src="srcImageForNumber" class="w-60" />
        <template v-else>
          <slot />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    setPopup: { type: Function, required: true },
    playedTurns: { type: Number, required: true },
  },
  data() {
    return {
      showNumberMessage: true,
    };
  },
  computed: {
    numberMessage(): string {
      // Determine the message to display based on the number
      if (this.playedTurns == 1) {
        return 'Perfect! You guessed the word in 1 turn!';
      } else if (this.playedTurns == 2) {
        return 'Great! You guessed the word in 2 turns!';
      } else if (this.playedTurns == 3) {
        return 'Good! You guessed the word in 3 turns!';
      } else if (this.playedTurns == 4) {
        return 'Not bad! You guessed the word in 4 turns!';
      } else if (this.playedTurns == 5) {
        return 'Not bad! You guessed the word in 5 turns!';
      } else if (this.playedTurns == 6) {
        return 'At least you guessed the word in 6 turns!';
      } else if (this.playedTurns == 0) {
        return 'You lost! You could not guess the word in 6 turns';
      } else {
        return 'Something went wrong!';
      }
    },
    srcImageForNumber(): string {
      if (this.playedTurns == 1) {
        return new URL('../assets/img/1.png', import.meta.url).href;
      } else if (this.playedTurns == 2) {
        return new URL('../assets/img/2.png', import.meta.url).href;
      } else if (this.playedTurns == 3) {
        return new URL('../assets/img/3.png', import.meta.url).href;
      } else if (this.playedTurns == 4) {
        return new URL('../assets/img/4.png', import.meta.url).href;
      } else if (this.playedTurns == 5) {
        return new URL('../assets/img/5.png', import.meta.url).href;
      } else if (this.playedTurns == 6) {
        return new URL('../assets/img/6.png', import.meta.url).href;
      } else if (this.playedTurns == 0) {
        return new URL('../assets/img/0.png', import.meta.url).href;
      } else {
        return 'Something went wrong!';
      }
    },
  },
  created() {
    setTimeout(() => {
      // After 5 seconds, hide the number message and show the template
      this.showNumberMessage = false;
    }, 5000);
  },
});
</script>
