import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { searchAction } from '@/app/actions/search';

import SearchBar from './SearchBar';

jest.mock('@/app/actions/search', () => ({
  searchAction: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, (cb: () => void) => cb()],
}));

describe('SearchBar', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input', () => {
    render(<SearchBar onSelect={mockOnSelect} />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('does not call searchAction when less than 3 characters are typed', async () => {
    render(<SearchBar onSelect={mockOnSelect} />);
    const input = screen.getByPlaceholderText('Buscar...');
    await userEvent.type(input, 'ab');
    await waitFor(() => {
      expect(searchAction).not.toHaveBeenCalled();
    });
  });

  it('calls searchAction when 3 or more characters are typed', async () => {
    (searchAction as jest.Mock).mockResolvedValue([]);
    render(<SearchBar onSelect={mockOnSelect} />);
    const input = screen.getByPlaceholderText('Buscar...');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      expect(searchAction).toHaveBeenCalledWith('abc');
    });
  });

  it('displays search results in dropdown', async () => {
    const mockResults = [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
    ];
    (searchAction as jest.Mock).mockResolvedValue(mockResults);
    render(<SearchBar onSelect={mockOnSelect} />);
    const input = screen.getByPlaceholderText('Buscar...');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      expect(screen.getByText('Result 1')).toBeInTheDocument();
      expect(screen.getByText('Result 2')).toBeInTheDocument();
    });
  });

  it('calls onSelect when a result is clicked', async () => {
    const mockResults = [{ id: '1', title: 'Result 1' }];
    (searchAction as jest.Mock).mockResolvedValue(mockResults);
    render(<SearchBar onSelect={mockOnSelect} />);
    const input = screen.getByPlaceholderText('Buscar...');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      fireEvent.click(screen.getByText('Result 1'));
    });
    expect(mockOnSelect).toHaveBeenCalledWith(mockResults[0]);
  });

  it('closes dropdown when clicking outside', async () => {
    const mockResults = [{ id: '1', title: 'Result 1' }];
    (searchAction as jest.Mock).mockResolvedValue(mockResults);
    render(
      <div>
        <SearchBar onSelect={mockOnSelect} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    const input = screen.getByPlaceholderText('Buscar...');
    await userEvent.type(input, 'abc');
    await waitFor(() => {
      expect(screen.getByText('Result 1')).toBeInTheDocument();
    });
    fireEvent.mouseDown(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByText('Result 1')).not.toBeInTheDocument();
    });
  });
});
