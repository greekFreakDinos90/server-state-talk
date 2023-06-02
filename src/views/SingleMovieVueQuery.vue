<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useMovie } from '@/composables/useMovie'
import MovieCard from '@/components/MovieCard.vue'

const route = useRoute()
const { id } = route.params
const { selectedMovie, isSelectedMovieLoading, isSelectedMovieError, selectedMovieError } =
  useMovie(id as string)
</script>

<template>
  <main v-if="isSelectedMovieLoading">
    <h1>Loading...</h1>
    <p>Please wait, while we load your selected movie...</p>
  </main>
  <main v-else-if="selectedMovie?.results">
    <h1>
      {{ selectedMovie.results.titleText?.text || 'Title not specified' }}
    </h1>
    <section class="movie-content">
      <MovieCard :movie="selectedMovie.results" :displayOnly="true" />
      <p>
        Release year:
        {{
          selectedMovie.results.releaseYear?.year
            ? selectedMovie.results.releaseYear?.year
            : 'Not specified'
        }}
      </p>
    </section>
  </main>
  <main v-else-if="isSelectedMovieError">
    <h1>Oops</h1>
    <p class="error">{{ selectedMovieError }}</p>
  </main>
  <main v-else-if="!selectedMovie?.results">
    <h1>Not found</h1>
    <p>This movie does't exist...</p>
  </main>
</template>

<style scoped lang="scss">
.movie-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0.8rem;
}
.error {
  padding: 1.6rem;
  border-radius: 0.5rem;
  background-color: var(--alert-color);
  font-weight: 900;
}
</style>
