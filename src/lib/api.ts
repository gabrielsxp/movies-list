
interface IGenre {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  runtime: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  release_date: string
  tagline: string
  genres?: IGenre[]
}

const apiKey = process.env.TMDB_API_KEY

export async function getMovies(page = 1): Promise<{ data: IMovie[], total_pages: number }> {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    next: {
      tags: ['getMovies']
    }
  };

  try {
    const result = await fetch(url, options)
    if (result.ok) {
      const data = await result.json();

      return { data: data.results, total_pages: data.total_pages }
    } else {
      throw new Error('Failed to fetch data')
    }
  } catch (error) {
    return { data: [], total_pages: 0 }
  }
}

export async function getPopularMovies(page = 1): Promise<IMovie[]> {
  const url = `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const result = await fetch(url, options)
    if (result.ok) {
      const data = await result.json();

      return data.results
    } else {
      throw new Error('Failed to fetch data')
    }
  } catch (error) {
    return []
  }
}


export async function getMovieById(id: string): Promise<IMovie> {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const result = await fetch(url, options)
    if (result.ok) {
      const data = await result.json();

      return data
    } else {
      throw new Error('Failed to fetch data')
    }
  } catch (error) {
    return {} as IMovie
  }
}