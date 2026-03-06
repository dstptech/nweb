import { Link } from 'react-router-dom'

const expertiseItems = [
  {
    title: 'AI Solutions',
    description:
      'Leverage machine learning and predictive analytics to automate processes and gain deeper insights.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Custom Software',
    description:
      'Tailor-made software built from the ground up to solve your unique operational bottlenecks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18 22 12l-6-6" />
        <path d="M8 6 2 12l6 6" />
      </svg>
    ),
  },
  {
    title: 'Web & Mobile Apps',
    description:
      'Responsive, high-performance applications that deliver exceptional user experiences across all devices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'Scalable, secure, and cost-effective cloud solutions utilizing AWS, Azure, or Google Cloud.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    title: 'SaaS Development',
    description:
      'End-to-end product development for startups and enterprises launching subscription software.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'IT Consulting',
    description:
      'Strategic guidance to align your technology roadmap with your long-term business goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function HomeExpertise() {
  return (
    <section className="relative bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">Our Expertise</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Comprehensive Digital Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-400">
            We deliver end-to-end technology services tailored to your specific industry needs.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseItems.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/15 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 ring-1 ring-blue-400/30 transition group-hover:bg-blue-500/25 group-hover:text-blue-300">
                <span className="h-6 w-6 [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
          >
            View All Services
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
