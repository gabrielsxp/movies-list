'use client'

import { searchAction } from '@/app/actions/search';
import { IMovie } from '@/lib/api';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  onSelect: (result: IMovie) => void;
}

const SearchBar = ({ onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<IMovie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      startTransition(async () => {
        const searchResults = await searchAction(debouncedQuery);
        setResults(searchResults);
        setShowDropdown(true);
      });
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (pathname !== '/') {
      setShowDropdown(false);
      setQuery('')
      setResults([])
    }
  }, [pathname])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (result: IMovie) => {
    onSelect(result);
    setQuery(result.title);
    setShowDropdown(false);
  };

  return (
    <div ref={searchRef} className="relative w-64">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isPending && (
        <div className="absolute right-3 top-3">
          <div role="status" className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
        </div>
      )}
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((result) => (
            <li
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black truncate"
            >
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
