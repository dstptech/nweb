export const SERVICES_DATA = {
  "ai-ml": {
    id: "ai-ml",
    slug: "ai-ml",
    icon: "CpuChipIcon",
    color: "#E76F6F",
    title: "AI & Machine Learning",
    tagline: "Turn your data into intelligent, self-improving systems",
    description:
      "We design and deploy end-to-end ML systems from raw data pipelines to production-grade model serving that help enterprises automate decisions, predict outcomes, and unlock hidden value at scale.",

    features: [
      {
        icon: "BoltIcon",
        title: "LLM Integration & Fine-Tuning",
        desc: "Custom LLM deployments with RAG pipelines, prompt engineering, and domain-specific fine-tuning for enterprise use cases.",
      },
      {
        icon: "ChartBarIcon",
        title: "Predictive Analytics",
        desc: "Build models that forecast demand, detect anomalies, score risk, and automate decisions with measurable business impact.",
      },
      {
        icon: "CpuChipIcon",
        title: "MLOps & Model Lifecycle",
        desc: "Automated training pipelines, experiment tracking, model versioning, A/B testing, and continuous monitoring in production.",
      },
      {
        icon: "CircleStackIcon",
        title: "Data Engineering for AI",
        desc: "Feature stores, vector databases, embedding pipelines, and high-quality training data infrastructure.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "Responsible AI & Governance",
        desc: "Bias detection, model explainability, audit trails, and compliance-ready AI deployment frameworks.",
      },
      {
        icon: "GlobeAltIcon",
        title: "Computer Vision & NLP",
        desc: "Image classification, object detection, OCR, sentiment analysis, document extraction, and multi-modal AI systems.",
      },
    ],

    techStack: [
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "PyTorch", icon: "🔥" },
      { name: "LangChain", icon: "🔗" },
      { name: "OpenAI API", icon: "🤖" },
      { name: "Hugging Face", icon: "🤗" },
      { name: "MLflow", icon: "📊" },
      { name: "Kubeflow", icon: "☸️" },
      { name: "Pinecone", icon: "🌲" },
      { name: "Ray", icon: "⚡" },
    ],

    caseStudies: [
      {
        title: "AI News Intelligence Platform",
        client: "Global Media Corp",
        result: "2M+ queries/day, 94% accuracy",
        desc: "Built a real-time NLP pipeline for news aggregation, entity extraction, sentiment scoring, and trend prediction.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c28549e9-1772825957243.png",
        tags: ["NLP", "LLM", "FastAPI", "React"],
      },
      {
        title: "Fraud Detection System",
        client: "Meridian FinTech",
        result: "₹12Cr fraud prevented in Q1",
        desc: "Real-time transaction scoring model with sub-10ms inference latency deployed on AWS Lambda.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
        tags: ["XGBoost", "Kafka", "AWS", "MLflow"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹2.5L",
        period: "/ project",
        desc: "For teams exploring AI for the first time",
        features: [
          "1 ML model",
          "Basic pipeline",
          "3 months support",
          "Cloud deployment",
        ],
        color: "#E76F6F",
      },
      {
        name: "Growth",
        price: "₹8L",
        period: "/ project",
        desc: "For scaling AI across business functions",
        features: [
          "Up to 5 models",
          "MLOps setup",
          "6 months support",
          "LLM integration",
          "Custom dashboards",
        ],
        color: "#4F8F84",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Full AI transformation partnership",
        features: [
          "Unlimited models",
          "Dedicated ML team",
          "12 months support",
          "On-premise option",
          "SLA guarantee",
        ],
        color: "#E76F6F",
      },
    ],

    team: [
      { name: "Arjun Mehta", role: "ML Lead", exp: "8 yrs", icon: "👨‍💻" },
      { name: "Priya Shah", role: "Data Scientist", exp: "6 yrs", icon: "👩‍🔬" },
      { name: "Rohit Kumar", role: "MLOps Engineer", exp: "5 yrs", icon: "👨‍🔧" },
    ],
  },

  "data-engineering": {
    id: "data-engineering",
    slug: "data-engineering",
    icon: "CircleStackIcon",
    color: "#4F8F84",
    title: "Data Engineering & Analytics",
    tagline: "Transform raw data into your most valuable business asset",
    description:
      "We build modern data platforms that ingest, transform, and serve data at any scale enabling real-time decisions, self-service analytics, and AI-ready infrastructure for enterprise teams.",

    features: [
      {
        icon: "BoltIcon",
        title: "Real-Time Streaming",
        desc: "Kafka, Flink, and Spark Streaming pipelines that process millions of events per second with sub-second latency.",
      },
      {
        icon: "CircleStackIcon",
        title: "Data Warehousing",
        desc: "Cloud data warehouse design on Redshift, BigQuery, or Snowflake with optimized schemas and query performance.",
      },
      {
        icon: "ChartBarIcon",
        title: "BI & Dashboards",
        desc: "Interactive dashboards in Metabase, Grafana, or custom React with real-time KPIs and drill-down analytics.",
      },
      {
        icon: "ArrowPathIcon",
        title: "ETL/ELT Pipelines",
        desc: "Reliable, observable data pipelines with dbt, Airflow, and Prefect — fully tested and version-controlled.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "Data Governance",
        desc: "Data catalogs, lineage tracking, PII masking, access controls, and GDPR-compliant data management.",
      },
      {
        icon: "GlobeAltIcon",
        title: "Data Lake Architecture",
        desc: "S3/GCS-based data lakes with Delta Lake or Apache Iceberg for ACID transactions and time-travel queries.",
      },
    ],

    techStack: [
      { name: "Apache Spark", icon: "✨" },
      { name: "Kafka", icon: "📡" },
      { name: "dbt", icon: "🔧" },
      { name: "Airflow", icon: "🌊" },
      { name: "Redshift", icon: "☁️" },
      { name: "BigQuery", icon: "🔍" },
      { name: "Snowflake", icon: "❄️" },
      { name: "Delta Lake", icon: "🏔️" },
      { name: "Grafana", icon: "📊" },
      { name: "PostgreSQL", icon: "🐘" },
    ],

    caseStudies: [
      {
        title: "Financial Risk Data Platform",
        client: "Meridian FinTech",
        result: "99.99% uptime, 10TB/day",
        desc: "End-to-end real-time risk data pipeline with regulatory reporting and anomaly detection dashboards.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
        tags: ["Kafka", "Spark", "Redshift", "Grafana"],
      },
      {
        title: "Retail Analytics Platform",
        client: "NexaRetail India",
        result: "40% faster decisions",
        desc: "Unified data warehouse consolidating 15 data sources with self-service BI for 200+ business users.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c28549e9-1772825957243.png",
        tags: ["dbt", "BigQuery", "Metabase", "Airflow"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹3L",
        period: "/ project",
        desc: "Basic data pipeline setup",
        features: [
          "1 data source",
          "Basic ETL pipeline",
          "Simple dashboard",
          "3 months support",
        ],
        color: "#4F8F84",
      },
      {
        name: "Growth",
        price: "₹10L",
        period: "/ project",
        desc: "Full modern data stack",
        features: [
          "Up to 10 sources",
          "Real-time streaming",
          "Data warehouse",
          "6 months support",
          "BI dashboards",
        ],
        color: "#E76F6F",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Enterprise data platform",
        features: [
          "Unlimited sources",
          "Data governance",
          "12 months support",
          "Dedicated team",
          "SLA guarantee",
        ],
        color: "#4F8F84",
      },
    ],

    team: [
      { name: "Vikram Nair", role: "Data Architect", exp: "9 yrs", icon: "👨‍💻" },
      { name: "Sneha Patel", role: "Data Engineer", exp: "5 yrs", icon: "👩‍💻" },
      { name: "Karan Singh", role: "BI Developer", exp: "4 yrs", icon: "👨‍🔬" },
    ],
  },

  "cloud-devops": {
    id: "cloud-devops",
    slug: "cloud-devops",
    icon: "CloudIcon",
    color: "#E76F6F",
    title: "Cloud & DevOps Solutions",
    tagline: "Ship faster, scale smarter, sleep better",
    description:
      "We architect cloud-native infrastructure and engineering practices that give your team the speed of a startup with the reliability of an enterprise automated, observable, and built to scale.",

    features: [
      {
        icon: "CloudIcon",
        title: "Cloud Architecture",
        desc: "AWS, GCP, and Azure infrastructure design with multi-region, high-availability, and cost-optimized configurations.",
      },
      {
        icon: "BoltIcon",
        title: "CI/CD Pipelines",
        desc: "GitHub Actions, GitLab CI, and Jenkins pipelines with automated testing, security scanning, and zero-downtime deployments.",
      },
      {
        icon: "CpuChipIcon",
        title: "Kubernetes & Containers",
        desc: "EKS, GKE, and AKS cluster setup with Helm charts, auto-scaling, and service mesh configuration.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "Infrastructure as Code",
        desc: "Terraform and Pulumi modules for reproducible, version-controlled, and auditable infrastructure.",
      },
      {
        icon: "ChartBarIcon",
        title: "Monitoring & Observability",
        desc: "Prometheus, Grafana, Datadog, and ELK stack setup with alerting, SLOs, and incident response playbooks.",
      },
      {
        icon: "ArrowPathIcon",
        title: "DevSecOps",
        desc: "Security scanning in pipelines, secrets management with Vault, and compliance automation for SOC 2 and ISO 27001.",
      },
    ],

    techStack: [
      { name: "AWS", icon: "☁️" },
      { name: "Kubernetes", icon: "☸️" },
      { name: "Terraform", icon: "🏗️" },
      { name: "Docker", icon: "🐳" },
      { name: "GitHub Actions", icon: "⚙️" },
      { name: "Helm", icon: "⎈" },
      { name: "Prometheus", icon: "📊" },
      { name: "Grafana", icon: "📈" },
      { name: "Vault", icon: "🔐" },
      { name: "Istio", icon: "🕸️" },
    ],

    caseStudies: [
      {
        title: "Zero-Downtime Migration to AWS",
        client: "Vantage Logistics",
        result: "60% infra cost reduction",
        desc: "Migrated 40+ microservices from bare metal to EKS with full CI/CD automation and zero downtime.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_186e2d7c1-1772825948475.png",
        tags: ["AWS", "EKS", "Terraform", "GitHub Actions"],
      },
      {
        title: "SOC 2 Ready Infrastructure",
        client: "Nexora Healthcare",
        result: "Certified in 3 months",
        desc: "Built security-first Kubernetes infrastructure with full audit trails and automated compliance checks.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
        tags: ["GKE", "Vault", "Istio", "Datadog"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹2L",
        period: "/ project",
        desc: "Basic cloud setup",
        features: [
          "Cloud account setup",
          "Basic CI/CD",
          "Docker setup",
          "3 months support",
        ],
        color: "#E76F6F",
      },
      {
        name: "Growth",
        price: "₹7L",
        period: "/ project",
        desc: "Production-grade DevOps",
        features: [
          "Kubernetes cluster",
          "Full CI/CD",
          "IaC with Terraform",
          "6 months support",
          "Monitoring setup",
        ],
        color: "#4F8F84",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Enterprise cloud platform",
        features: [
          "Multi-cloud",
          "DevSecOps",
          "12 months support",
          "Dedicated SRE",
          "SLA guarantee",
        ],
        color: "#E76F6F",
      },
    ],

    team: [
      {
        name: "Rahul Joshi",
        role: "Cloud Architect",
        exp: "10 yrs",
        icon: "👨‍💻",
      },
      {
        name: "Anita Desai",
        role: "DevOps Engineer",
        exp: "6 yrs",
        icon: "👩‍🔧",
      },
      { name: "Dev Sharma", role: "SRE Engineer", exp: "5 yrs", icon: "👨‍🔬" },
    ],
  },

  "web-mobile": {
    id: "web-mobile",
    slug: "web-mobile",
    icon: "DevicePhoneMobileIcon",
    color: "#4F8F84",
    title: "Web & Mobile Development",
    tagline: "Pixel-perfect products users love to use",
    description:
      "We build high-performance web applications and cross-platform mobile apps with modern frameworks combining exceptional UX design with clean, maintainable engineering for products that scale.",

    features: [
      {
        icon: "GlobeAltIcon",
        title: "React & Next.js Apps",
        desc: "Server-side rendered, SEO-optimized web applications with exceptional performance scores and smooth UX.",
      },
      {
        icon: "DevicePhoneMobileIcon",
        title: "Cross-Platform Mobile",
        desc: "Flutter and React Native apps for iOS and Android with native-like performance and shared codebase.",
      },
      {
        icon: "BoltIcon",
        title: "Performance Engineering",
        desc: "Lighthouse 90+ scores, lazy loading, code splitting, CDN optimization, and Core Web Vitals tuning.",
      },
      {
        icon: "CpuChipIcon",
        title: "Backend APIs",
        desc: "FastAPI, Node.js, and GraphQL APIs with authentication, rate limiting, and OpenAPI documentation.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "Accessibility & Testing",
        desc: "WCAG 2.1 compliant interfaces with comprehensive unit, integration, and E2E test coverage.",
      },
      {
        icon: "ChartBarIcon",
        title: "Analytics & Growth",
        desc: "Built-in analytics, A/B testing infrastructure, user journey tracking, and conversion optimization.",
      },
    ],

    techStack: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Flutter", icon: "🦋" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "FastAPI", icon: "⚡" },
      { name: "GraphQL", icon: "◉" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Vercel", icon: "▲" },
      { name: "Figma", icon: "🎭" },
    ],

    caseStudies: [
      {
        title: "Enterprise SaaS Dashboard",
        client: "Meridian FinTech",
        result: "3x user engagement",
        desc: "Full-stack Next.js application with real-time data, role-based access, and mobile-responsive design.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
        tags: ["Next.js", "FastAPI", "PostgreSQL", "Tailwind"],
      },
      {
        title: "Healthcare Mobile App",
        client: "Nexora Healthcare",
        result: "50K+ downloads in 3 months",
        desc: "Flutter app for patient management with offline support, push notifications, and HIPAA-compliant storage.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c28549e9-1772825957243.png",
        tags: ["Flutter", "GraphQL", "AWS", "Firebase"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹3L",
        period: "/ project",
        desc: "Landing page or simple web app",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO",
          "3 months support",
        ],
        color: "#4F8F84",
      },
      {
        name: "Growth",
        price: "₹9L",
        period: "/ project",
        desc: "Full web or mobile application",
        features: [
          "Full-stack app",
          "Mobile app (iOS/Android)",
          "Auth & payments",
          "6 months support",
          "Analytics",
        ],
        color: "#E76F6F",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Large-scale product development",
        features: [
          "Multiple products",
          "Design system",
          "12 months support",
          "Dedicated team",
          "SLA guarantee",
        ],
        color: "#4F8F84",
      },
    ],

    team: [
      { name: "Neha Gupta", role: "Frontend Lead", exp: "7 yrs", icon: "👩‍💻" },
      {
        name: "Aditya Roy",
        role: "Mobile Developer",
        exp: "5 yrs",
        icon: "👨‍💻",
      },
      { name: "Meera Iyer", role: "UI/UX Designer", exp: "6 yrs", icon: "👩‍🎨" },
    ],
  },

  iot: {
    id: "iot",
    slug: "iot",
    icon: "SignalIcon",
    color: "#E76F6F",
    title: "IoT & Smart Devices",
    tagline: "Connect the physical world to your digital infrastructure",
    description:
      "We design, build, and deploy end-to-end IoT solutions from firmware and sensor networks to edge computing and cloud management platforms for industrial, healthcare, and consumer applications.",

    features: [
      {
        icon: "SignalIcon",
        title: "Device Connectivity",
        desc: "MQTT, CoAP, and WebSocket protocols with secure TLS device authentication and certificate management.",
      },
      {
        icon: "CpuChipIcon",
        title: "Edge AI & Computing",
        desc: "On-device ML inference, edge preprocessing, and local decision-making to reduce cloud dependency.",
      },
      {
        icon: "BoltIcon",
        title: "OTA Updates",
        desc: "Secure over-the-air firmware updates with rollback support and staged deployment across device fleets.",
      },
      {
        icon: "ChartBarIcon",
        title: "Device Management",
        desc: "Centralized dashboard for device health monitoring, remote configuration, and fleet management at scale.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "IoT Security",
        desc: "Hardware security modules, encrypted communication, device attestation, and zero-trust architecture.",
      },
      {
        icon: "CircleStackIcon",
        title: "Time-Series Analytics",
        desc: "InfluxDB and TimescaleDB pipelines for sensor data with anomaly detection and predictive maintenance.",
      },
    ],

    techStack: [
      { name: "MQTT", icon: "📡" },
      { name: "Raspberry Pi", icon: "🍓" },
      { name: "Arduino", icon: "🔌" },
      { name: "Edge AI", icon: "🧠" },
      { name: "AWS IoT", icon: "☁️" },
      { name: "InfluxDB", icon: "📊" },
      { name: "Grafana", icon: "📈" },
      { name: "Docker", icon: "🐳" },
      { name: "FreeRTOS", icon: "⚙️" },
      { name: "TensorFlow Lite", icon: "🔥" },
    ],

    caseStudies: [
      {
        title: "Medical Device Platform",
        client: "Nexora Healthcare",
        result: "30K devices, 0 downtime",
        desc: "IoT platform connecting 30,000 medical devices across 200 hospitals with real-time monitoring and alerts.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_186e2d7c1-1772825948475.png",
        tags: ["MQTT", "AWS IoT", "InfluxDB", "React"],
      },
      {
        title: "Smart Warehouse System",
        client: "Vantage Logistics",
        result: "35% efficiency gain",
        desc: "50,000 sensor network with edge AI for inventory tracking, environmental monitoring, and predictive maintenance.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c28549e9-1772825957243.png",
        tags: ["Edge AI", "MQTT", "Docker", "Grafana"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹4L",
        period: "/ project",
        desc: "Small device fleet setup",
        features: [
          "Up to 100 devices",
          "Basic dashboard",
          "MQTT setup",
          "3 months support",
        ],
        color: "#E76F6F",
      },
      {
        name: "Growth",
        price: "₹12L",
        period: "/ project",
        desc: "Production IoT platform",
        features: [
          "Up to 10K devices",
          "Edge AI",
          "OTA updates",
          "6 months support",
          "Analytics platform",
        ],
        color: "#4F8F84",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Large-scale IoT deployment",
        features: [
          "Unlimited devices",
          "Custom firmware",
          "12 months support",
          "Dedicated team",
          "SLA guarantee",
        ],
        color: "#E76F6F",
      },
    ],

    team: [
      { name: "Sanjay Verma", role: "IoT Architect", exp: "9 yrs", icon: "👨‍🔧" },
      {
        name: "Riya Kapoor",
        role: "Embedded Engineer",
        exp: "6 yrs",
        icon: "👩‍💻",
      },
      {
        name: "Amit Tiwari",
        role: "Edge AI Engineer",
        exp: "5 yrs",
        icon: "👨‍🔬",
      },
    ],
  },

  enterprise: {
    id: "enterprise",
    slug: "enterprise",
    icon: "BuildingOffice2Icon",
    color: "#4F8F84",
    title: "Enterprise Software Systems",
    tagline: "Scalable systems engineered for complex business reality",
    description:
      "We build custom enterprise software ERP, CRM, workflow automation, and integration platforms that replace legacy bottlenecks with modern, scalable, and maintainable systems built for your exact business logic.",

    features: [
      {
        icon: "BuildingOffice2Icon",
        title: "Custom ERP & CRM",
        desc: "Purpose-built enterprise resource planning and customer relationship management systems tailored to your workflows.",
      },
      {
        icon: "ArrowPathIcon",
        title: "Legacy Modernization",
        desc: "Strangler fig migration of legacy monoliths to microservices with zero business disruption.",
      },
      {
        icon: "BoltIcon",
        title: "Workflow Automation",
        desc: "Business process automation, approval workflows, notifications, and integration with third-party SaaS tools.",
      },
      {
        icon: "CircleStackIcon",
        title: "API & Integration Platform",
        desc: "RESTful and GraphQL APIs, webhook systems, and middleware for connecting internal and external systems.",
      },
      {
        icon: "ShieldCheckIcon",
        title: "Enterprise Security",
        desc: "SSO, RBAC, audit logging, data encryption, and compliance with SOC 2, ISO 27001, and GDPR.",
      },
      {
        icon: "ChartBarIcon",
        title: "Reporting & Intelligence",
        desc: "Custom reporting engines, executive dashboards, scheduled exports, and embedded analytics.",
      },
    ],

    techStack: [
      { name: "FastAPI", icon: "⚡" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Microservices", icon: "🔧" },
      { name: "React", icon: "⚛️" },
      { name: "Redis", icon: "🔴" },
      { name: "RabbitMQ", icon: "🐰" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "☸️" },
      { name: "Elasticsearch", icon: "🔍" },
      { name: "Celery", icon: "🌿" },
    ],

    caseStudies: [
      {
        title: "Logistics ERP Platform",
        client: "Vantage Logistics",
        result: "60% ops cost reduction",
        desc: "Custom ERP replacing 5 legacy systems — fleet management, billing, HR, inventory, and reporting in one platform.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_14ffd5197-1772825952588.png",
        tags: ["FastAPI", "PostgreSQL", "React", "Celery"],
      },
      {
        title: "Hospital Management System",
        client: "Nexora Healthcare",
        result: "200 hospitals onboarded",
        desc: "HIPAA-compliant HMS with patient records, billing, inventory, and multi-tenant architecture.",
        image:
          "https://img.rocket.new/generatedImages/rocket_gen_img_186e2d7c1-1772825948475.png",
        tags: ["Microservices", "PostgreSQL", "Redis", "Kubernetes"],
      },
    ],

    pricing: [
      {
        name: "Starter",
        price: "₹5L",
        period: "/ project",
        desc: "Small business system",
        features: [
          "Single module",
          "Up to 20 users",
          "Basic reporting",
          "3 months support",
        ],
        color: "#4F8F84",
      },
      {
        name: "Growth",
        price: "₹15L",
        period: "/ project",
        desc: "Full enterprise platform",
        features: [
          "Multiple modules",
          "Up to 200 users",
          "Advanced reporting",
          "6 months support",
          "API access",
        ],
        color: "#E76F6F",
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Large-scale enterprise system",
        features: [
          "Unlimited modules",
          "Unlimited users",
          "12 months support",
          "Dedicated team",
          "SLA guarantee",
        ],
        color: "#4F8F84",
      },
    ],

    team: [
      {
        name: "Deepak Mishra",
        role: "Backend Architect",
        exp: "11 yrs",
        icon: "👨‍💻",
      },
      { name: "Pooja Rao", role: "Full-Stack Dev", exp: "7 yrs", icon: "👩‍💻" },
      {
        name: "Suresh Babu",
        role: "Systems Analyst",
        exp: "8 yrs",
        icon: "👨‍🔬",
      },
    ],
  },
};
