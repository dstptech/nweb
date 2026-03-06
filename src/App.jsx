import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'

function PageShell({ title, subtitle }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {subtitle ? <p className="mt-2 text-gray-400">{subtitle}</p> : null}
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-300">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services/*"
          element={
            <PageShell
              title="Services"
              subtitle="Explore our core business service segments."
            />
          }
        />
        <Route
          path="/industries/*"
          element={
            <PageShell
              title="Industries"
              subtitle="Industries we serve: healthcare, education, e-commerce, manufacturing, and more."
            />
          }
        />
        <Route
          path="/solutions"
          element={<PageShell title="Solutions" subtitle="Product and solution-based offerings from DSTP." />}
        />
        <Route
          path="/portfolio"
          element={<PageShell title="Portfolio" subtitle="Case studies and project highlights." />}
        />
        <Route
          path="/about"
          element={<PageShell title="About Us" subtitle="Learn more about DSTP and our mission." />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/quote"
          element={<PageShell title="Get a Quote" subtitle="Tell us about your project to receive a tailored quote." />}
        />
      </Routes>
      <Footer />
    </div>
  )
}
