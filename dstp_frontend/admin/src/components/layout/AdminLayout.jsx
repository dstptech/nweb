// useState to track if sidebar is collapsed
import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"

// Outlet is like a "hole" where the current page content goes
import { Outlet } from "react-router-dom"

function AdminLayout() {
  // collapsed = false means sidebar is fully open by default
  const [collapsed, setCollapsed] = useState(false)

  return (
    // Full screen div
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR on the left */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {/* MAIN CONTENT on the right */}
      {/* ml-64 = margin left matches sidebar width */}
      {/* ml-16 = margin left matches collapsed sidebar width */}
      <div className={`
        flex-1 flex flex-col
        transition-all duration-300
        ${collapsed ? "ml-16" : "ml-64"}
      `}>

        {/* TOP BAR */}
        <TopBar />

        {/* PAGE CONTENT */}
        {/* This is where Dashboard, Services, etc. will render */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminLayout