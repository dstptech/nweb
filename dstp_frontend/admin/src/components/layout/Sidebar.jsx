import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Edit,
  FolderOpen,
  Users,
  UserCheck,
  HandHelping,
  FileText,
  Settings,
  ChevronRight,
  LogOut,
} from "lucide-react"

import logo from "../../assets/Logo-admin.png"

// Navigation Sections
const navSections = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", path: "/", icon: LayoutDashboard, badge: null },
      { name: "HomePage Editor", path: "/Homepage", icon: Edit, badge: null },
      { name: "Projects", path: "/projects", icon: FolderOpen, badge: null },
      { name: "Clients", path: "/clients", icon: Users, badge: null },
      { name: "Team", path: "/team", icon: UserCheck, badge: null },
      { name: "Services", path: "/services", icon:HandHelping, badge: null },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Invoices", path: "/invoices", icon: FileText, badge: 0 },
      { name: "Settings", path: "/settings", icon: Settings, badge: null },
    ],
  },
]

function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  // ✅ State for logout dropdown
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div
      className={`
      ${collapsed ? "w-16" : "w-64"}
      bg-[#1a1f2e] text-white
      min-h-screen flex flex-col
      transition-all duration-300
      fixed left-0 top-0 bottom-0 z-50
    `}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-3 py-2 mb-1">
        {!collapsed && (
          <div className="flex flex-col items-center justify-center py-4">
            <img
              src={logo}
              alt="DSTP Logo"
              className="w-40 h-20 object-contain"
            />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors ml-auto"
        >
          <ChevronRight
            size={18}
            className={`transition-transform duration-300 ${
              collapsed ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-hidden px-2">
        {navSections.map((section) => (
          <div key={section.title} className="mb-2">
            {!collapsed && (
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest px-3 mb-1">
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-3
                    px-3 py-1.5
                    rounded-xl
                    transition-all duration-150
                    group relative
                    ${
                      isActive
                        ? "bg-[#2d1f3d] text-white"
                        : "text-gray-400 hover:bg-[#252b3b] hover:text-white"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  {/* Active Dot */}
                  {isActive && !collapsed && (
                    <span className="absolute right-3 w-2 h-2 rounded-full bg-red-400" />
                  )}

                  <Icon
                    size={19}
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />

                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">
                        {item.name}
                      </span>

                      {item.badge && (
                        <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {/* Tooltip */}
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
      <div className="p-3 border-t border-gray-700/50 relative">

        {/* USER ROW */}
        <div
          onClick={() => setShowLogout(!showLogout)}
          className={`
            flex items-center gap-3 p-2 rounded-xl
            hover:bg-[#252b3b] cursor-pointer transition-colors
            ${collapsed ? "justify-center" : ""}
          `}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold">
            AB
          </div>

          {!collapsed && (
            <>
              <div className="flex-1">
                <p className="text-sm font-semibold">Aayushi Bishnoi</p>
                <p className="text-xs text-gray-400">aayushi@dstp.com</p>
              </div>

              <ChevronRight
                size={16}
                className={`transition-transform ${showLogout ? "rotate-90" : ""}`}
              />
            </>
          )}
        </div>

        {/* LOGOUT DROPDOWN */}
        {showLogout && (
          <div
            className={`absolute transition-all duration-200
            ${collapsed ? "left-full ml-2 bottom-4" : "bottom-full left-3 right-3 mb-3"}
            bg-[#252b3b] border border-gray-700 rounded-xl overflow-hidden shadow-xl`}
          >
            <button
              onClick={() => alert("Logged out!")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
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