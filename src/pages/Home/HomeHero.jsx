import { Link } from 'react-router-dom'

function IconBadge({ children }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-500/15 ring-1 ring-blue-400/30 backdrop-blur">
      {children}
    </span>
  )
}

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9Z" />
    </svg>
  )
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 2 3 14h8l-1 8 11-14h-8l0-6Z"
      />
    </svg>
  )
}

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(59,130,246,0.30),transparent_55%),radial-gradient(900px_circle_at_85%_25%,rgba(168,85,247,0.32),transparent_55%),radial-gradient(1000px_circle_at_50%_80%,rgba(99,102,241,0.28),transparent_60%),radial-gradient(700px_circle_at_10%_85%,rgba(14,165,233,0.22),transparent_55%)] blur-[2px] motion-safe:animate-drift" />
        {/* Subtle conic highlight */}
        <div className="absolute -inset-[35%] bg-[conic-gradient(from_220deg_at_50%_50%,rgba(59,130,246,0.14),rgba(168,85,247,0.16),rgba(99,102,241,0.14),rgba(59,130,246,0.14))] opacity-70 motion-safe:animate-shimmer" />

        {/* Gradient squares */}
        <div className="absolute left-[-40px] top-[120px] h-44 w-44 rotate-12 rounded-3xl bg-gradient-to-br from-blue-500/25 via-indigo-500/10 to-purple-500/25 blur-[1px] ring-1 ring-white/10 motion-safe:animate-float-slower" />
        <div className="absolute right-[-28px] top-[90px] hidden h-52 w-52 -rotate-6 rounded-3xl bg-gradient-to-br from-purple-500/25 via-fuchsia-500/10 to-cyan-400/20 blur-[1px] ring-1 ring-white/10 motion-safe:animate-float-slow sm:block" />
        <div className="absolute bottom-[-60px] left-[40%] hidden h-56 w-56 rotate-[18deg] rounded-[2.2rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/25 blur-[2px] ring-1 ring-white/10 motion-safe:animate-float-slower md:block" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-gray-950/70 to-gray-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
        {/* Badge */}
        <div className="mx-auto flex max-w-3xl justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200 ring-1 ring-white/10 backdrop-blur">
            <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3l2.5 5.8L21 9.5l-4.5 4 1.4 6.3L12 16.9 6.1 19.8 7.5 13.5 3 9.5l6.5-.7L12 3Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            Transforming Ideas into Digital Reality
          </div>
        </div>

        {/* Hero content */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Professional{' '}
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Web Development &amp; IoT Solutions
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-gray-300 sm:text-lg">
            From secure web platforms to intelligent IoT systems, we build scalable digital solutions with modern
            engineering, strong UI/UX, and reliable delivery.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Get Started Today
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Watch Demo
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M10 8.5v7l6-3.5-6-3.5Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating accents */}
        <div className="pointer-events-none">
          <div className="absolute right-8 top-28 hidden lg:block">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 ring-1 ring-blue-400/30 backdrop-blur">
              <GlobeIcon className="h-6 w-6 text-blue-200" />
            </div>
          </div>
          <div className="absolute left-6 bottom-20 hidden lg:block">
            <IconBadge>
              <SparkIcon className="h-5 w-5 text-blue-300" />
            </IconBadge>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-2xl bg-white/5 px-4 py-5 ring-1 ring-white/10 backdrop-blur">
            <div className="flex items-center justify-between gap-6 overflow-x-auto text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="min-w-[180px] flex-1 px-2">
                <div className="text-3xl font-extrabold tracking-tight text-blue-300">500+</div>
                <div className="mt-1 text-sm text-gray-400">Projects Completed</div>
              </div>

              <div className="h-10 w-px bg-white/10" aria-hidden />

              <div className="min-w-[180px] flex-1 px-2">
                <div className="text-3xl font-extrabold tracking-tight text-blue-300">99.9%</div>
                <div className="mt-1 text-sm text-gray-400">Uptime Guarantee</div>
              </div>

              <div className="h-10 w-px bg-white/10" aria-hidden />

              <div className="min-w-[180px] flex-1 px-2">
                <div className="text-3xl font-extrabold tracking-tight text-blue-300">24/7</div>
                <div className="mt-1 text-sm text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
