import { useQuery } from '@tanstack/vue-query'
import { searchMovies } from '@/api'
import { computed, watch, type Ref } from 'vue'

export const useMovies = (query: Ref<string>, page: Ref<number>) => {
  const queryHasValue = computed(() => query.value.trim() !== '')
  const { data, isFetching, isError, error, isPreviousData } = useQuery({
    queryKey: ['movies', [query, page]],
    queryFn: () => searchMovies(query.value, page.value.toString()),
    enabled: queryHasValue,
    keepPreviousData: queryHasValue,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  const showNextPageButton = computed(() => data.value && data.value.next)
  const showPreviousPageButton = computed(() => data.value && page.value !== 1)

  watch(query, () => (page.value = 1))

  return {
    movies: data,
    isSearchMoviesLoading: isFetching,
    isSearchMoviesError: isError,
    searchMoviesErrorMessage: error,
    showNextPageButton,
    showPreviousPageButton,
    isPreviousData
  }
}
