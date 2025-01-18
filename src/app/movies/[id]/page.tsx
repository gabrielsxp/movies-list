import Image from 'next/image';

import { getMovieById } from '@/lib/api';
import { transformDate } from '@/lib/helper';

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.tagline}</p>
          <div className="flex items-center mb-4">
            <span className="bg-yellow-400 text-yellow-900 py-1 px-2 rounded-full text-sm font-semibold mr-2">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-600">{transformDate(movie.release_date)}</span>
          </div>
          <p className="text-lg mb-6">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Gêneros</h2>
              <ul className="list-disc list-inside">
                {movie?.genres?.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Duração</h2>
              <p>{movie.runtime} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
