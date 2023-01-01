<template>
  <div class="tile">
    {{ letter }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  letter: {
    type: String,
    default: " ",
  }
});

</script>

<style scoped>
.tile {
  width: 70px;
  height: 70px;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  user-select: none;
  position: relative;
  background-color: white;
  color: black;
  border: 3px solid gray;
}
</style>
