import { getMovies } from "@/lib/api";

import MovieCard from "@/components/MovieCard/MovieCard";
import Pagination from "@/components/Pagination/Pagination";

interface IMoviesList {
  page: number;
}

export async function MoviesList ({ page }: IMoviesList) {
  const {data: movies, total_pages: totalPages} = await getMovies(page)

  return <div className="container mx-auto mt-8 flex flex-col gap-4">
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </ul>
    <Pagination currentPage={page} totalPages={totalPages} />
  </div>
}