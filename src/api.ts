import type { GetMovieByIdResponse, SearchMoviesResponse } from './types/movies'

export const searchMovies = async (
  query: string,
  page: string = '1'
): Promise<SearchMoviesResponse> => {
  const params = new URLSearchParams({
    limit: '12',
    page: page,
    titleType: 'movie'
  })

  const response = await fetch(
    `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}?` + params,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f9175098eamsh84a35b1488f29b5p1e9218jsn46a4d2869098',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    }
  )
  if (response.status === 200) {
    return await response.json()
  } else {
    throw Error(`Get movies request failed with status: ${response.status}`)
  }
}

export const getMovieById = async (id: string): Promise<GetMovieByIdResponse> => {
  const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f9175098eamsh84a35b1488f29b5p1e9218jsn46a4d2869098',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  })
  if (response.status === 200) {
    return await response.json()
  } else {
    throw Error(`Get movie by id request failed with status: ${response.status}`)
  }
}
