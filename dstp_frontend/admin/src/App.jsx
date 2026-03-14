import { Routes, Route } from "react-router-dom"
import { AdminLayout } from "./components"
import { DashboardPage, ServicesList, HomepageEditor, TeamsList } from "./pages"

// [BACKEND] All routes here are admin-only.
// Wrap <Route> elements with a ProtectedRoute component that
// checks for a valid JWT token before allowing access.
// Example:
//   import ProtectedRoute from "./components/ProtectedRoute"
//   <Route element={<ProtectedRoute />}>
//     ... protected routes here
//   </Route>
//
// [BACKEND] Add a LoginPage route (currently commented out in pages/index.js):
//   <Route path="/login" element={<LoginPage />} />
// This should be OUTSIDE the AdminLayout (no sidebar/topbar).

function App() {
  return (
    <Routes>
      {/* Public routes (no layout) */}
      {/* [BACKEND] Uncomment once LoginPage is created */}
      {/* <Route path="/login" element={<LoginPage />} /> */}

      {/* Protected admin routes (with sidebar + topbar layout) */}
      <Route path="/" element={<AdminLayout />}>
        <Route index          element={<DashboardPage  />} />
        <Route path="services"  element={<ServicesList   />} />

        {/* BUG FIX: Was path="homepage" but Sidebar links to "/Homepage" (capital H) */}
        {/* Standardized to lowercase "homepage" — update Sidebar navSections path too */}
        <Route path="homepage"  element={<HomepageEditor />} />

        <Route path="teams"     element={<TeamsList      />} />

        {/* [BACKEND] Add these routes once pages are created: */}
        {/* <Route path="projects"  element={<ProjectsList  />} /> */}
        {/* <Route path="clients"   element={<ClientsList   />} /> */}
        {/* <Route path="invoices"  element={<InvoicesList  />} /> */}
        {/* <Route path="settings"  element={<SettingsPage  />} /> */}
      </Route>
    </Routes>
  )
}

export default App