<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'
import ActionButton from '@/components/ActionButton.vue'

const router = useRouter()
const moviesStore = useMoviesStore()
const {
  query,
  movies,
  isSearchMoviesLoading,
  isSearchMoviesError,
  searchMoviesErrorMessage,
  currentPage,
  showNextPageButton,
  showPreviousPageButton
} = storeToRefs(moviesStore)
</script>

<template>
  <main>
    <h1>Search for movies</h1>
    <section class="search">
      <input v-model="query" type="search" placeholder="Write the title of a movie..." />
      <ActionButton
        v-if="showPreviousPageButton"
        label="Previous page"
        :onClick="() => currentPage--"
      />
      <ActionButton v-if="showNextPageButton" label="Next page" :onClick="() => currentPage++" />
      <LoadingSpinner v-if="isSearchMoviesLoading" />
    </section>
    <section v-if="movies && movies.results.length > 0" class="movie-results">
      <MovieCard
        class="movie-card"
        v-for="movie in movies.results"
        :key="movie.id"
        :movie="movie"
        @click="router.push({ name: 'movie', params: { id: movie.id } })"
      />
    </section>
    <p v-else-if="isSearchMoviesError" class="error">
      {{ searchMoviesErrorMessage }}<br /><span>Please try again later.</span>
    </p>
    <p v-else-if="!movies || movies.results.length === 0">No movies to show...</p>
  </main>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
}

input {
  height: 5rem;
  width: 280px;
  font-size: 2rem;
}

.movie-results {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
}

.error {
  padding: 1.6rem;
  border-radius: 0.5rem;
  background-color: var(--alert-color);
  font-weight: 900;
}
</style>
