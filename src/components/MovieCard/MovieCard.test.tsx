// MovieCard.test.tsx
import { IMovie } from '@/lib/api';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

const mockMovie: IMovie = {
  id: 1,
  runtime: 200,
  title: "Inception",
  poster_path: "/inception-poster.jpg",
  release_date: "2010-07-16",
  vote_average: 8.8,
  tagline: 'Inception',
  overview: "A thief who enters the dreams of others to steal secrets from their subconscious."
};

describe('MovieCard', () => {
  it('renders the movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('renders the movie poster', () => {
    render(<MovieCard movie={mockMovie} />);
    const poster = screen.getByAltText('Inception poster') as HTMLImageElement;
    expect(poster).toBeInTheDocument();
    expect(poster.src).toBe('https://image.tmdb.org/t/p/original//inception-poster.jpg');
  });

  it('renders the vote average', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  it('renders the "Ver Detalhes" button', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Ver Detalhes')).toBeInTheDocument();
  });

  it('transforms the release date to release year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2010')).toBeInTheDocument();
  });
});
