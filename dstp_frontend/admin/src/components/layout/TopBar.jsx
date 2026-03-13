import { Bell, Search, Settings, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"

function TopBar() {

  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  
  // Detect click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-600 w-48"
            />
          </div>

        </div>
        
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* Notification bell */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* Avatar + Dropdown */}
          <div ref={menuRef} className="relative">

            <div
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
            >
              AB
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">

                {/* User Info */}
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-800">
                    Super Admin
                  </p>
                  <p className="text-xs text-gray-500">aayushi@dstp.com</p>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Settings */}
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  <Settings size={16} />
                  Settings
                </button>

                {/* Notifications */}
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  <Bell size={16} />
                  Notifications
                </button>

                <div className="border-t border-gray-100"></div>

                {/* Logout */}
                <button 
                  onClick={() => alert("Logged out!")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  Log out
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  )
}

export default TopBar