import { IMovie } from '@/lib/api';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

interface IMovieCard {
  movie: IMovie
}

const MovieCard = ({ movie }: IMovieCard) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative pb-2/3">
        <img 
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="object-cover w-auto h-300"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{movie.title}</h2>
        {movie.release_date && <p className="text-sm text-gray-600 mb-2">{movie.release_date.split('-')[0]}</p>}
        <div className="flex items-center mb-2">
          <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-gray-700">{movie.vote_average}</span>
        </div>
      </div>
      <div className="p-4 flex center">
        <Link href={`/movies/${movie.id}`} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded transition duration-300">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
