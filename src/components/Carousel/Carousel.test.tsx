// Carousel.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react';

import Carousel from './Carousel';

const mockItems = [
  { title: 'Slide 1', image: 'image1.jpg', id: 1 },
  { title: 'Slide 2', image: 'image2.jpg', id: 2 },
  { title: 'Slide 3', image: 'image3.jpg', id: 3 },
];

describe('Carousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all slides', () => {
    render(<Carousel items={mockItems} />);
    mockItems.forEach((item) => {
      expect(screen.getByAltText(`Slide ${mockItems.indexOf(item) + 1}`)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('shows the first slide initially', () => {
    render(<Carousel items={mockItems} />);
    expect(screen.getByText('Slide 1')).toHaveClass('text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm');
  });

  it('changes slide when next button is clicked', () => {
    render(<Carousel items={mockItems} />);
    const nextButton = screen.getByText('❯');
    fireEvent.click(nextButton);
    expect(screen.getByText('Slide 2')).toHaveClass('text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm');
  });

  it('changes slide when prev button is clicked', () => {
    render(<Carousel items={mockItems} />);
    const prevButton = screen.getByText('❮');
    fireEvent.click(prevButton);
    expect(screen.getByText('Slide 3')).toHaveClass('text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm');
  });

  it('changes slide automatically after 5 seconds', () => {
    render(<Carousel items={mockItems} />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText('Slide 2')).toHaveClass('text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm');
  });

  it('changes slide when indicator is clicked', () => {
    render(<Carousel items={mockItems} />);
    const indicators = screen.getAllByRole('button');
    fireEvent.click(indicators[2]);
    expect(screen.getByText('Slide 3')).toHaveClass('text-gray text-2xl font-semibold p-4 bg-gray-200/75 rounded-sm');
  });
});
