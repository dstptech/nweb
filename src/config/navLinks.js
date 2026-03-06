// Main navigation structure for the DSTP marketing site
// Home
// Services (dropdown with 5 segments)
// Industries
// Solutions
// Portfolio
// About Us
// Contact Us

export const mainLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    slug: 'services',
    items: [
      { label: 'Software Development', href: '/services/software-development' },
      { label: 'Cloud & Cybersecurity', href: '/services/cloud-and-cybersecurity' },
      { label: 'Data Analytics & AI/ML', href: '/services/data-analytics-ai-ml' },
      { label: 'IoT & Robotics', href: '/services/iot-and-robotics' },
      { label: 'Digital Media Solutions', href: '/services/digital-media-solutions' },
    ],
  },
  {
    label: 'Industries',
    slug: 'industries',
    items: [
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Education', href: '/industries/education' },
      { label: 'E-commerce', href: '/industries/ecommerce' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]

export const quoteCta = {
  label: 'Get a Quote',
  href: '/quote',
}
