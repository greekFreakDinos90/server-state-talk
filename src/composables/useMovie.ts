import { useQuery } from '@tanstack/vue-query'
import { getMovieById } from '@/api'

export const useMovie = (id: string) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id)
  })

  return {
    selectedMovie: data,
    isSelectedMovieLoading: isFetching,
    isSelectedMovieError: isError,
    selectedMovieError: error
  }
}
