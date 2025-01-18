import Carousel from "@/components/Carousel/Carousel";
import { getPopularMovies } from "@/lib/api";

export async function MoviesCarousel() {
  const movies = await getPopularMovies()
  return <Carousel items={movies} />
}
