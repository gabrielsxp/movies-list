'use client';

import { useRouter } from 'next/navigation';

interface IPagination {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: IPagination) => {
  const router = useRouter()

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
    router.refresh();
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex flex-wrap items-center -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Página anterior
          </button>
        </li>
        {pageNumbers[0] > 1 && (
          <>
            <li>
              <button onClick={() => onPageChange(1)} className="px-3 py-2 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">
                1
              </button>
            </li>
            {pageNumbers[0] > 2 && (
              <li>
                <span className="px-3 py-2 leading-tight border border-gray-300 text-gray-500 bg-white">...</span>
              </li>
            )}
          </>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-2 leading-tight border border-gray-300 ${
                currentPage === number
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <li>
                <span className="px-3 py-2 leading-tight border border-gray-300 text-gray-500 bg-white">...</span>
              </li>
            )}
            <li>
              <button onClick={() => onPageChange(totalPages)} className="px-3 py-2 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima página
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
