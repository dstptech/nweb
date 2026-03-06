import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mainLinks } from '../../config/navLinks'

export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <ul className="flex items-center gap-1" role="menubar">
      {mainLinks.map((item) => {
        const hasDropdown = Array.isArray(item.items) && item.items.length > 0

        if (!hasDropdown) {
          return (
            <li key={item.href} role="none">
              <Link
                to={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                role="menuitem"
              >
                {item.label}
              </Link>
            </li>
          )
        }

        return (
          <li
            key={item.slug}
            className="relative"
            role="none"
            onMouseEnter={() => setOpenDropdown(item.slug)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={openDropdown === item.slug}
              aria-haspopup="true"
              aria-controls={`menu-${item.slug}`}
              id={`nav-${item.slug}`}
            >
              {item.label}
              <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul
              id={`menu-${item.slug}`}
              role="menu"
              aria-labelledby={`nav-${item.slug}`}
              className={`absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-lg border border-gray-700 bg-gray-900 py-1.5 shadow-xl transition ${openDropdown === item.slug ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
              {item.items.map((child) => (
                <li key={child.href} role="none">
                  <Link
                    to={child.href}
                    role="menuitem"
                    className="block px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-800 hover:text-blue-400"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
