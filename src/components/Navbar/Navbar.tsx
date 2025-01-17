import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <img src="/images/logo.png" alt="movies logo" className="h-16" />
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/">Início</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
