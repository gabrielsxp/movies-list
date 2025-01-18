import { getPopularMovies } from "@/lib/api";

import Carousel from "@/components/Carousel/Carousel";

export async function MoviesCarousel (): Promise<JSX.Element> {
  const movies = await getPopularMovies()

  const items = movies.map((movie) => ({linkDestination: `/movies/${movie.id}`, image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`, title: movie.title}))

  return <Carousel items={items} />
}