// src/utils/homeData.js

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
];

export const SERVICES = [
  {
    id: "ai-ml",
    icon: "CpuChipIcon",
    title: "AI & Machine Learning",
    desc: "End-to-end ML pipelines, LLM integrations, predictive analytics, and intelligent automation for enterprise scale.",
    color: "#E76F6F",
    tags: ["TensorFlow", "PyTorch", "LangChain"],
  },
  {
    id: "data-engineering",
    icon: "CircleStackIcon",
    title: "Data Engineering & Analytics",
    desc: "Modern data platforms, real-time streaming, data lakes, warehouses, and BI dashboards that drive decisions.",
    color: "#4F8F84",
    tags: ["Spark", "dbt", "Redshift"],
  },
  {
    id: "cloud-devops",
    icon: "CloudIcon",
    title: "Cloud & DevOps Solutions",
    desc: "Cloud-native architecture, CI/CD automation, Kubernetes orchestration, and infrastructure as code.",
    color: "#E76F6F",
    tags: ["AWS", "Kubernetes", "Terraform"],
  },
  {
    id: "web-mobile",
    icon: "DevicePhoneMobileIcon",
    title: "Web & Mobile Development",
    desc: "Pixel-perfect web applications and cross-platform mobile apps with modern frameworks and seamless UX.",
    color: "#4F8F84",
    tags: ["React", "Next.js", "Flutter"],
  },
  {
    id: "iot",
    icon: "SignalIcon",
    title: "IoT & Smart Devices",
    desc: "Connected hardware solutions, sensor networks, edge computing, and real-time device management platforms.",
    color: "#E76F6F",
    tags: ["MQTT", "Edge AI", "Firmware"],
  },
  {
    id: "enterprise",
    icon: "BuildingOffice2Icon",
    title: "Enterprise Software Systems",
    desc: "Scalable ERP, CRM, and custom enterprise platforms engineered for complex business workflows.",
    color: "#4F8F84",
    tags: ["FastAPI", "PostgreSQL", "Microservices"],
  },
];

export const TECH_STACK = [
  { name: "Python", icon: "🐍", category: "Language" },
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "FastAPI", icon: "⚡", category: "Backend" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "Kubernetes", icon: "☸️", category: "Orchestration" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "TensorFlow", icon: "🧠", category: "ML" },
  { name: "Next.js", icon: "▲", category: "Frontend" },
  { name: "Kafka", icon: "📡", category: "Streaming" },
  { name: "Spark", icon: "✨", category: "Big Data" },
  { name: "Terraform", icon: "🏗️", category: "IaC" },
];

export const PORTFOLIO = [
  {
    id: "ai-news",
    title: "AI News Intelligence Platform",
    desc: "Real-time news aggregation with NLP sentiment analysis, entity extraction, and trend prediction serving 2M+ daily queries.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c28549e9-1772825957243.png",
    alt: "Dark dashboard showing AI news analytics with graphs and real-time data feeds",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    color: "#E76F6F",
    metric: "Under Development",
  },
  {
    id: "finance",
    title: "Financial Monitoring System",
    desc: "Enterprise-grade real-time financial risk monitoring with anomaly detection, regulatory compliance reporting, and live dashboards.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
    alt: "Financial monitoring dashboard with charts showing stock prices and risk metrics",
    tags: ["Kafka", "PostgreSQL", "AWS", "Next.js"],
    color: "#4F8F84",
    metric: "Under Development",
  },
  {
    id: "iot-dashboard",
    title: "Smart IoT Device Dashboard",
    desc: "Centralized management platform for 50,000+ connected devices with edge analytics, OTA updates, and predictive maintenance.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_186e2d7c1-1772825948475.png",
    alt: "IoT device management dashboard showing connected sensors and device network map",
    tags: ["MQTT", "Docker", "React", "InfluxDB"],
    color: "#E76F6F",
    metric: "Under Development",
  },
];

export const METRICS = [
  { value: 100, suffix: "%", label: "Client Focused", icon: "RocketLaunchIcon", color: "#E76F6F" },
  { value: 15, suffix: "+", label: "Tech Stack", icon: "StarIcon", color: "#4F8F84" },
  { value: 24, suffix: " / 7", label: "Technical Support", icon: "ClockIcon", color: "#4F8F84" },
  { value: 100, suffix: "%", label: "Quality Assured", icon: "HeartIcon", color: "#4F8F84" },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rajiv Mehta",
    role: "CTO",
    company: "Meridian FinTech Solutions",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17d808420-1763291894487.png",
    avatarAlt: "Professional headshot of Rajiv Mehta, CTO at Meridian FinTech Solutions",
    quote: "DSTP transformed our data infrastructure from a legacy bottleneck into a real-time competitive advantage. Their team delivered a production-grade ML pipeline in 12 weeks — something our internal team estimated at 9 months.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya Nair",
    role: "VP of Engineering",
    company: "Nexora Healthcare Systems",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a6b904c-1763297183395.png",
    avatarAlt: "Professional headshot of Priya Nair, VP Engineering at Nexora Healthcare",
    quote: "The IoT platform DSTP built for us connects over 30,000 medical devices across 200 hospitals. Zero downtime in 18 months. Their engineering standards are genuinely world-class.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Arjun Krishnaswamy",
    role: "Director of Technology",
    company: "Vantage Logistics Corp",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb00d656-1763291827615.png",
    avatarAlt: "Professional headshot of Arjun Krishnaswamy, Director of Technology at Vantage Logistics",
    quote: "Working with DSTP feels like having a senior tech co-founder embedded in your team. They don't just write code — they architect scalable systems and challenge your thinking at every step.",
    rating: 5,
  },
];