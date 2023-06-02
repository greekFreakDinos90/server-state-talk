import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchMovies, getMovieById } from '@/api'
import { useDebounce } from '@/composables/useDebounce'
import type { GetMovieByIdResponse, SearchMoviesResponse } from '@/types/movies'

export const useMoviesStore = defineStore('movies', () => {
  const query = ref<string>('')
  const debounced = useDebounce(query, 500)

  watch(debounced, () => {
    if (debounced.value.trim() === '') {
      movies.value = null
      return
    }
    hasNextPage.value = false
    currentPage.value = 1
    search()
  })

  // movie data
  const movies = ref<SearchMoviesResponse | null>(null)
  const isSearchMoviesLoading = ref(false)
  const isSearchMoviesError = ref(false)
  const searchMoviesErrorMessage = ref<string>('')
  const selectedMovie = ref<GetMovieByIdResponse | null>(null)
  const isSelectedMovieLoading = ref(false)
  const isSelectedMovieError = ref(false)
  const selectedMovieError = ref<string>('')

  // pagination
  const currentPage = ref<number>(1)
  const hasNextPage = ref<boolean>(false)
  const isFirstPage = computed(() => currentPage.value === 1)
  const showNextPageButton = computed(() => hasNextPage.value && movies.value !== null)
  const showPreviousPageButton = computed(() => !isFirstPage.value && movies.value !== null)

  watch(currentPage, () => {
    if (debounced.value.trim() === '') return
    search()
  })

  const search = async () => {
    isSearchMoviesLoading.value = true
    try {
      const data: SearchMoviesResponse = await searchMovies(
        debounced.value,
        currentPage.value.toString()
      )
      movies.value = data
      currentPage.value = parseInt(data.page)
      if (data.next) {
        hasNextPage.value = true
      } else {
        hasNextPage.value = false
      }
      isSearchMoviesError.value = false
      searchMoviesErrorMessage.value = ''
    } catch (error) {
      isSearchMoviesError.value = true
      searchMoviesErrorMessage.value = (error as Error).message
    }
    isSearchMoviesLoading.value = false
  }

  const getLocalMovie = (id: string) => {
    return movies.value?.results.find((movie) => movie.id === id)
  }

  const getById = async (id: string) => {
    if (selectedMovie.value) selectedMovie.value = null
    const local = getLocalMovie(id)
    if (movies.value?.results && movies.value.results.length > 0 && local) {
      selectedMovie.value = { results: local }
      return
    }
    try {
      isSelectedMovieLoading.value = true
      const data = await getMovieById(id)
      selectedMovie.value = data
      isSelectedMovieError.value = false
      selectedMovieError.value = ''
    } catch (error) {
      isSelectedMovieError.value = true
      selectedMovieError.value = (error as Error).message
    }
    isSelectedMovieLoading.value = false
  }

  return {
    query,
    movies,
    isSearchMoviesLoading,
    isSearchMoviesError,
    searchMoviesErrorMessage,
    currentPage,
    showNextPageButton,
    showPreviousPageButton,
    selectedMovie,
    getById,
    isSelectedMovieLoading,
    isSelectedMovieError,
    selectedMovieError
  }
})
