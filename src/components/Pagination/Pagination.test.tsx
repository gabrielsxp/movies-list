import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('Pagination', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of page buttons', () => {
    render(<Pagination currentPage={5} totalPages={20} />);
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(13);
  });

  it('disables the "Página anterior" button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={20} />);
    const prevButton = screen.getByText('Página anterior');
    expect(prevButton).toBeDisabled();
  });

  it('disables the "Próxima página" button on the last page', () => {
    render(<Pagination currentPage={20} totalPages={20} />);
    const nextButton = screen.getByText('Próxima página');
    expect(nextButton).toBeDisabled();
  });

  it('shows ellipsis when there are more pages before the visible range', () => {
    render(<Pagination currentPage={15} totalPages={20} />);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis).toHaveLength(1);
  });

  it('shows the first and last page buttons when they are not in the visible range', () => {
    render(<Pagination currentPage={10} totalPages={20} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('highlights the current page button', () => {
    render(<Pagination currentPage={5} totalPages={20} />);
    const currentPageButton = screen.getByText('5');
    expect(currentPageButton).toHaveClass('text-blue-600');
  });
});
