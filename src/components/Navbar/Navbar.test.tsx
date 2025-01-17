import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    const logo = screen.getByAltText('movies logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)

    const navLinks = ['Início']
    navLinks.forEach((linkText) => {
      const link = screen.getByText(linkText)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', linkText === 'Início' ? '/' : `/${linkText.toLowerCase()}`)
    })
  })

  it('has correct styling classes', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-gray-800', 'text-white', 'p-4')

    const container = nav.firstChild
    expect(container).toHaveClass('container', 'mx-auto', 'flex', 'justify-between', 'items-center')

    const linkList = screen.getByRole('list')
    expect(linkList).toHaveClass('flex', 'space-x-4')
  })
})
