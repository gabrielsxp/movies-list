'use client';

import SearchBar from '@/components/SearchBar/SearchBar';
import { IMovie } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter()

  const onSelect = (movie: IMovie) => {
    router.push(`/movies/${movie.id}`)
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <img src="/images/logo.png" alt="movies logo" className="h-16" />
        </Link>
        <ul className="flex space-x-4">
          <li>
            <SearchBar onSelect={onSelect} />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
