import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mainLinks, quoteCta } from '../../config/navLinks'

export default function MobileMenu({ isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (slug) => {
    setExpandedSection((prev) => (prev === slug ? null : slug))
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 top-[57px] z-40 overflow-y-auto border-t border-gray-800 bg-gray-950 lg:hidden"
      aria-modal="true"
      role="dialog"
      aria-label="Mobile menu"
    >
      <nav className="flex h-full flex-col justify-between p-4">
        <ul className="space-y-1">
          {mainLinks.map((item) => {
            const hasDropdown = Array.isArray(item.items) && item.items.length > 0

            if (!hasDropdown) {
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            return (
              <li key={item.slug} className="border-b border-gray-800">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                  onClick={() => toggleSection(item.slug)}
                  aria-expanded={expandedSection === item.slug}
                  aria-controls={`mobile-${item.slug}`}
                >
                  {item.label}
                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform ${expandedSection === item.slug ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul
                  id={`mobile-${item.slug}`}
                  className={`overflow-hidden pl-3 transition-all ${expandedSection === item.slug ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.items.map((child) => (
                    <li key={child.href}>
                      <Link
                        to={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-800 hover:text-blue-400"
                        onClick={onClose}
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

        <div className="mt-6 border-t border-gray-800 pt-4">
          <Link
            to={quoteCta.href}
            onClick={onClose}
            className="block w-full rounded-full bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-blue-400"
          >
            {quoteCta.label}
          </Link>
        </div>
      </nav>
    </div>
  )
}
