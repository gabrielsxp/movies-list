'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ICarouselItem {
  title: string;
  image: string
  linkDestination?: string;
}

interface ICarousel {
  items: ICarouselItem[]
}

const Carousel = ({ items }: ICarousel) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-full mx-auto">
      <div className="overflow-hidden relative h-64 rounded-lg">
        {items.map((item, index) => (
          <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <h1 className="text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm">
              {item.title}
            </h1>
            {item.linkDestination && <Link href={items[index].linkDestination as string} className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded transition duration-300">
              Ver Detalhes
            </Link>}
          </div>

        </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
