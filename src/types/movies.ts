export type Movie = {
  id: string
  primaryImage?: { url?: string }
  titleText?: { text?: string }
  releaseYear?: { year?: string }
}

export type SearchMoviesResponse = {
  next: string | null
  page: string
  results: Movie[]
}

export type GetMovieByIdResponse = {
  results: Movie
}
