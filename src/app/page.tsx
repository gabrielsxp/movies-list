import Head from 'next/head';
import { Suspense } from 'react';

import HeroBanner from '@/components/HeroBanner/HeroBanner';
import { MoviesCarousel } from '@/components/MoviesCarousel/MoviesCarousel';
import { MoviesList } from '@/components/MoviesList/MoviesList';
import Skeleton from '@/components/Skeleton/Skeleton';

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1;
  return (
    <main>
      <Head>
        <title>Lista de Filmes</title>
      </Head>
      <HeroBanner backgroundImage='/images/main-bg.png' title='Seja bem vindo(a)!' subtitle='Navegue pelo nosso catálogo e descubra uma vasta seleção de filmes para todos os gostos.' />
      <Suspense fallback={<Skeleton />}>
        <MoviesCarousel />
      </Suspense>
      <Suspense fallback={<Skeleton />} >
        <MoviesList page={currentPage} />
      </Suspense>
    </main>
  );
}
