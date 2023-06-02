<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryStore } from '@/stores/query'
import { useMovies } from '@/composables/useMovies'
import ActionButton from '@/components/ActionButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const currentPage = ref(parseInt('1'))
const queryStore = useQueryStore()
const { query, debounced } = storeToRefs(queryStore)

const {
  movies,
  isSearchMoviesLoading,
  isSearchMoviesError,
  searchMoviesErrorMessage,
  showNextPageButton,
  showPreviousPageButton,
  isPreviousData
} = useMovies(debounced, currentPage)
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
    <section
      v-if="movies && movies.results.length > 0"
      class="movie-results"
      :style="{ opacity: isPreviousData ? '0.6' : '1' }"
    >
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

<style scoped lang="scss">
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
