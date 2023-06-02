<script setup lang="ts">
import { computed, toRefs } from 'vue'
import noImage from '@/assets/no-img.svg'
import type { Movie } from '@/types/movies'

const emit = defineEmits<(event: 'click') => void>()
const props = defineProps<{
  movie: Movie
  displayOnly?: boolean
}>()
const { movie, displayOnly = false } = toRefs(props)

const title = computed(() =>
  movie.value?.titleText?.text ? movie.value?.titleText?.text : 'No title'
)

const backgroundImageStyle = computed(() => {
  return {
    backgroundImage: `url(${
      movie.value?.primaryImage?.url ? movie.value?.primaryImage?.url : noImage
    })`
  }
})
</script>

<template>
  <article :data-display-only="displayOnly" @click="!displayOnly ? emit('click') : null">
    <div class="movie-image" :style="backgroundImageStyle" />
    <h2 class="title">{{ title }}</h2>
  </article>
</template>

<style lang="scss" scoped>
article {
  background-color: var(--secondary-color);
  border-radius: 2rem;
  position: relative;

  &[data-display-only='false'] {
    &:hover {
      cursor: pointer;
      .movie-image {
        opacity: 0.2;
      }
      .title {
        display: block;
        color: white;
      }
    }
  }

  .movie-image {
    aspect-ratio: 3 / 4;
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-clip: content-box;
  }

  .title {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 24px;
  }

  h2 {
    flex-grow: 1;
  }
}
</style>
