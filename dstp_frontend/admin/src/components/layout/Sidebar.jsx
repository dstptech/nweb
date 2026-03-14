// ─────────────────────────────────────────────────────────────────
// Sidebar.jsx
// Main navigation sidebar for the admin panel.
//
// BUG FIX: Homepage path was "/Homepage" (capital H) but App.jsx
// route is defined as "homepage" (lowercase). Standardized to lowercase.
//
// [BACKEND] The logout button currently uses alert("Logged out!").
// Replace with actual logout logic:
//   1. Call POST /api/token/blacklist/ with the refresh token
//      (if using djangorestframework-simplejwt)
//   2. Clear localStorage: remove "access_token" and "refresh_token"
//   3. Redirect to /login
//
// [BACKEND] The user name "Aayushi Bishnoi" and email are hardcoded.
// Replace with data from the auth context / useAuth hook:
//   const { user } = useAuth()
//   Then use: user.name, user.email, user.initials
// ─────────────────────────────────────────────────────────────────

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard, Edit, FolderOpen, Users,
  UserCheck, HandHelping, FileText, Settings,
  ChevronRight, LogOut,
} from "lucide-react"
import logo from "../../assets/Logo-admin.png"

// ── NAVIGATION SECTIONS ────────────────────────────────────────
// [BACKEND] Routes marked with (no page yet) need pages to be created.
// Remove the comment once the page exists and the Route is added in App.jsx.
const navSections = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard",       path: "/",         icon: LayoutDashboard },
      { name: "HomePage Editor", path: "/homepage", icon: Edit            }, // BUG FIX: was "/Homepage"
      { name: "Projects",        path: "/projects", icon: FolderOpen      }, // (no page yet)
      { name: "Clients",         path: "/clients",  icon: Users           }, // (no page yet)
      { name: "Team",            path: "/teams",    icon: UserCheck       },
      { name: "Services",        path: "/services", icon: HandHelping     },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Invoices",  path: "/invoices",  icon: FileText  }, // (no page yet)
      { name: "Settings",  path: "/settings",  icon: Settings  }, // (no page yet)
    ],
  },
]

function Sidebar({ collapsed, onToggle }) {
  const location    = useLocation()
  const navigate    = useNavigate()
  const [showLogout, setShowLogout] = useState(false)

  // [BACKEND] Replace this with actual logout from useAuth hook
  // Example:
  //   const { logout } = useAuth()
  //   const handleLogout = () => {
  //     logout()           // clears token from localStorage + context
  //     navigate("/login") // redirect to login
  //   }
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    // [BACKEND] Also call POST /api/token/blacklist/ here if using simplejwt
    navigate("/login")
  }

  return (
    <div className={`
      ${collapsed ? "w-16" : "w-64"}
      bg-[#1a1f2e] text-white
      min-h-screen flex flex-col
      transition-all duration-300
      fixed left-0 top-0 bottom-0 z-50
    `}>

      {/* LOGO */}
      <div className="flex items-center justify-between px-3 py-2 mb-1">
        {!collapsed && (
          <div className="flex flex-col items-center justify-center py-4 flex-1">
            <img src={logo} alt="DSTP Logo" className="w-40 h-20 object-contain" />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-auto"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            size={18}
            className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2">
        {navSections.map(section => (
          <div key={section.title} className="mb-2">
            {!collapsed && (
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest px-3 mb-1">
                {section.title}
              </p>
            )}

            {section.items.map(item => {
              // Active check: exact match for "/" to avoid highlighting for all routes
              const isActive = item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path)
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={collapsed ? item.name : undefined}
                  className={`
                    flex items-center gap-3 px-3 py-1.5 rounded-xl
                    transition-all duration-150 group relative
                    ${isActive
                      ? "bg-[#2d1f3d] text-white"
                      : "text-gray-400 hover:bg-[#252b3b] hover:text-white"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  {/* Active indicator dot */}
                  {isActive && !collapsed && (
                    <span className="absolute right-3 w-2 h-2 rounded-full bg-red-400" />
                  )}

                  <Icon
                    size={19}
                    className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"}
                  />

                  {!collapsed && (
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* USER SECTION */}
      {/* [BACKEND] Replace hardcoded name/email with user from auth context */}
      <div className="p-3 border-t border-gray-700/50 relative">
        <div
          onClick={() => setShowLogout(!showLogout)}
          className={`
            flex items-center gap-3 p-2 rounded-xl
            hover:bg-[#252b3b] cursor-pointer transition-colors
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            AB
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Aayushi Bishnoi</p>
                <p className="text-xs text-gray-400 truncate">aayushi@dstp.com</p>
              </div>
              <ChevronRight
                size={16}
                className={`transition-transform shrink-0 ${showLogout ? "rotate-90" : ""}`}
              />
            </>
          )}
        </div>

        {/* Logout dropdown */}
        {showLogout && (
          <div className={`
            absolute transition-all duration-200
            ${collapsed ? "left-full ml-2 bottom-4" : "bottom-full left-3 right-3 mb-3"}
            bg-[#252b3b] border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50
          `}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar