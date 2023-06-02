<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{ label: string; onClick: () => void }>()
const { label, onClick } = toRefs(props)
</script>

<template>
  <button @click="onClick">{{ label }}</button>
</template>

<style lang="scss" scoped>
button {
  background-color: var(--secondary-color);
  color: white;
  min-width: 15rem;
  height: 5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;

  &:hover {
    cursor: pointer;
    background-color: var(--accent-color);
  }
}
</style>
