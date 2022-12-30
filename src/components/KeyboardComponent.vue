<script setup lang="ts">

const emit = defineEmits<{
  (e: "key", key: string): void;
}>();

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

</script>

<template>
  <div id="keyboard">
    <div class="row" v-for="(row, i) in rows" v-bind:key="i">
      <div class="spacer" v-if="i === 1"></div>
      <button
        v-for="key in row"
        :class="[key.length > 1 /*&& 'big', letterStates[key]*/]"
        @click="$emit('key', key)"
        v-bind:key="key"
      >
        <span v-if="key !== 'Backspace'">{{ key }}</span>
        <img v-else src="../assets/img/backspace.png" class="h-4" />
      </button>
      <div class="spacer" v-if="i === 1"></div>
    </div>
  </div>
</template>

<style scoped>
#keyboard {
  margin: 30px 8px 0;
  user-select: none;
}
.row {
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
}
.spacer {
  flex: 0.5;
}
button {
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 5px 0 0;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #d3d6da;
  color: #1a1a1b;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
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
