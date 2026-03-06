import { Link } from 'react-router-dom'

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function HomeWhoWeAre() {
  return (
    <section className="relative bg-gray-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        {/* Image card */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* soft shadow base */}
            <div
              className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 blur-2xl"
              aria-hidden
            />

            <div className="group relative overflow-hidden rounded-[24px] bg-white/5 ring-1 ring-white/10 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:-translate-y-1">
              {/* top sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-60" />
              {/* subtle color wash */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 opacity-80 mix-blend-overlay" />
            <img
              src="/who-we-are-reference.png"
              alt="Team collaborating on digital solutions"
              className="relative h-[320px] w-full object-cover sm:h-[380px] lg:h-[420px] transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
              {/* bottom fade for depth */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Bridging the Gap <span className="text-gray-200">Between</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Vision
            </span>{' '}
            <span className="text-gray-200">and</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Reality
            </span>
          </h2>

          <p className="mt-6 text-sm font-semibold tracking-wide text-blue-300">Who We Are</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
            We’re not just developers—we’re strategic partners. We translate complex business challenges into
            secure, scalable, and elegant digital products across web, cloud, data, and IoT.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
            From discovery to delivery, our team focuses on clarity, craftsmanship, and measurable outcomes—so
            your business moves faster with confidence.
          </p>

          <div className="mt-8 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/25">
                <CheckIcon className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-gray-300">
                Backed by proven experience in end‑to‑end delivery, agile execution, and cross‑functional
                engineering leadership.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

