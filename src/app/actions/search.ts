// app/actions/search.ts
'use server'

import { IMovie } from "@/lib/api";

const apiKey = process.env.TMDB_API_KEY

export async function searchAction(query: string): Promise<IMovie[]> {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };

  const result = await fetch(url, options)
  if (result.ok) {
    const data = await result.json();

    return data.results as IMovie[]
  } else {
    throw new Error('Failed to fetch data')
  }
}
