// HeroBanner.test.js
import { render, screen } from '@testing-library/react';
import HeroBanner from './HeroBanner';

describe('HeroBanner', () => {
  const defaultProps = {
    title: 'Welcome to Our Site',
    subtitle: 'Discover amazing things',
    ctaText: 'Get Started',
    ctaLink: '/start',
    backgroundImage: 'https://example.com/image.jpg'
  };

  it('renders the title', () => {
    render(<HeroBanner {...defaultProps} />);
    expect(screen.getByText('Welcome to Our Site')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HeroBanner {...defaultProps} />);
    expect(screen.getByText('Discover amazing things')).toBeInTheDocument();
  });

  it('renders the CTA button with correct text and link', () => {
    render(<HeroBanner {...defaultProps} />);
    const ctaButton = screen.getByText('Get Started');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/start');
  });

  it('doesn\'t renders the CTA button if both ctaText and ctaLink was not passed as param', () => {
    render(<HeroBanner {...defaultProps} ctaLink='' ctaText='' />);
    const ctaButton = screen.queryByText('Get Started');
    expect(ctaButton).not.toBeInTheDocument();
  });

  it('applies the background image', () => {
    render(<HeroBanner {...defaultProps} />);
    const backgroundDiv = screen.getByRole('banner');
    expect(backgroundDiv).toHaveStyle(`background-image: url(${defaultProps.backgroundImage})`);
  });
});
