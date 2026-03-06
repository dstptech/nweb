import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import { quoteCta } from '../../config/navLinks'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/95 shadow-lg backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex flex-1 items-center gap-80 w-full justify-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition flex items-center"
          >
            DSTP<span className="text-[10px] align-top ml-0.5 font-normal">™</span>
          </Link>

          <div className="hidden lg:block">
            <Navigation />
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={quoteCta.href}
            className="rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
          >
            {quoteCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
