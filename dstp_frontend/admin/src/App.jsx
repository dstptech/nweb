import { Routes, Route } from "react-router-dom"
import { AdminLayout } from "./components"
import { DashboardPage, ServicesList, HomepageEditor } from "./pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index                element={<DashboardPage />}   />
        <Route path="services"      element={<ServicesList />}    />
        <Route path="homepage"      element={<HomepageEditor />}  />
      </Route>
    </Routes>
  )
}

export default App