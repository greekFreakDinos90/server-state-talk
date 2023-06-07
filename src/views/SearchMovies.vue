<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQueryStore } from '@/stores/query'
import { useMovies } from '@/composables/useMovies'
import ActionButton from '@/components/ActionButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MovieCard from '@/components/MovieCard.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { query, debounced, currentPage } = storeToRefs(useQueryStore())

const {
  movies,
  isSearchMoviesLoading,
  isSearchMoviesError,
  searchMoviesErrorMessage,
  showNextPageButton,
  showPreviousPageButton
} = useMovies(debounced, currentPage)
</script>

<template>
  <main>
    <h1>
      Search for movies
      <span class="sub-title">...with <span class="sub-title__vue-query">Vue Query</span></span>
    </h1>
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

<style scoped lang="scss">
.sub-title {
  font-size: 2.4rem;
  &__vue-query {
    font-size: 2.8rem;
    background: linear-gradient(to right, #ef4444, #f59e0b);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
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
