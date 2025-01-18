import { render, screen } from '@testing-library/react';

import Navbar from './Navbar';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    ...jest.requireActual('next/navigation'),
    push: jest.fn(),
  }),
}));

jest.mock('@/components/SearchBar/SearchBar', () => {
  return function MockSearchBar({ onSelect }: { onSelect: (result: { id: string; title: string }) => void }) {
    return <input data-testid="mock-search-bar" onChange={(e) => onSelect({ id: '123', title: e.target.value })} />;
  };
});

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('movies logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });

  it('renders the SearchBar component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
  });
});
