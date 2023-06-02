<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root {
  // colors
  --primary-color: #06283d;
  --secondary-color: #256d85;
  --accent-color: #47b5ff;
  --soft-color: #f9fafb;
  --alert-color: #ea5455;

  // typography
  --title-font-size: 4rem;
  --subtitle-font-size: 3rem;
  --text-font-size: 1.8em;
}

html,
body {
  background-color: var(--soft-color);
  font-family: 'Lato', sans-serif;
  font-size: 10px;

  h1 {
    color: var(--primary-color);
    font-size: var(--title-font-size);
  }

  h2 {
    font-size: var(--subtitle-font-size);
  }

  p {
    font-size: var(--text-font-size);
  }
}

#app {
  & > main {
    margin: 0 300px;
  }
}
</style>
