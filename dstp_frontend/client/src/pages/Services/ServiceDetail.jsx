import { useCallback } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import AppLogo from "@/components/ui/AppLogo";

export default function ServiceDetail({ service }) {
  const scrollTo = useCallback((href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-white font-dm overflow-x-hidden">
      {/* ══════════════════════════════════════
            HERO SECTION
         ══════════════════════════════════════ */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: "#0F1117" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(231,111,111,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,143,132,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: service.color }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: service.color === "#E76F6F" ? "#4F8F84" : "#E76F6F",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-32 relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-sm font-medium mb-10">
            <button
              onClick={() => window.history.back()}
              className="hover:text-white/70 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="hover:text-white/70 transition-colors cursor-pointer">
              Services
            </span>
            <span>/</span>
            <span style={{ color: service.color }}>{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              {/* Icon badge */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  background: `${service.color}20`,
                  border: `1px solid ${service.color}40`,
                  color: service.color,
                }}
              >
                <Icon name={service.icon} size={18} />
                {service.title}
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold font-jakarta leading-[1.05] tracking-tight">
                {service.tagline.split(" ").map((word, i) => {
                  const total = service.tagline.split(" ").length;
                  const mid = Math.floor(total / 2);
                  const isColored = i >= mid;
                  return (
                    <span
                      key={i}
                      className="inline-block mr-[0.25em]"
                      style={
                        isColored
                          ? {
                              background:
                                "linear-gradient(270deg, #E76F6F, #4F8F84, #a78bfa, #60a5fa, #E76F6F)",
                              backgroundSize: "400% 400%",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                              animationName: "gradientShift",
                              animationDuration: "4s",
                              animationTimingFunction: "ease",
                              animationIterationCount: "infinite",
                              animationDelay: `${i * 0.2}s`,
                            }
                          : { color: "white" }
                      }
                    >
                      {word}
                    </span>
                  );
                })}
              </h1>

              <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("#contact-cta")}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                  }}
                >
                  Start a Project
                  <Icon
                    name="ArrowRightIcon"
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={() => scrollTo("#case-studies")}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white border border-white/20 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
                >
                  View Case Studies
                  <Icon name="FolderOpenIcon" size={16} />
                </button>
              </div>
            </div>

            {/* Right: Floating stats */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              {[
                {
                  label: "On-Time Delivery",
                  value: "100%",
                  icon: "RocketLaunchIcon",
                },
                {
                  label: "Quality Assured",
                  value: "100%",
                  icon: "HeartIcon",
                },
                {
                  label: "Tech Stack",
                  value: "15+",
                  icon: "StarIcon",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4 animate-float"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${service.color}20` }}
                  >
                    <Icon
                      name={stat.icon}
                      size={20}
                      style={{ color: service.color }}
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold font-jakarta text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
            FEATURES / BENEFITS
         ══════════════════════════════════════ */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${service.color}12`, color: service.color }}
            >
              <Icon name="CheckBadgeIcon" size={14} /> What We Deliver
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight mb-5">
              Everything You Need to{" "}
              <span style={{ color: service.color }}>Succeed</span>
            </h2>
            <p className="text-base text-enterprise-grey leading-relaxed">
              End-to-end capabilities designed to solve your hardest challenges.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-7 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-enterprise transition-all duration-300 relative overflow-hidden"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}05, transparent)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${service.color}12` }}
                >
                  <Icon
                    name={feature.icon}
                    size={22}
                    style={{ color: service.color }}
                  />
                </div>
                <h3 className="text-base font-bold font-jakarta text-enterprise-mid mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-enterprise-grey leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
      TECH STACK
   ══════════════════════════════════════ */}
      <section
        id="tech-stack"
        className="py-24 relative overflow-hidden"
        style={{ background: "#FAFBFC" }}
      >
        <style>{`
    @keyframes slide-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes slide-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    @keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
  `}</style>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(79,143,132,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${service.color}12`, color: service.color }}
            >
              <Icon name="CpuChipIcon" size={14} /> Tech Stack
            </div>
            <h2 className="text-4xl font-extrabold font-jakarta text-enterprise-mid tracking-tight">
              Tools & Technologies We Use
            </h2>
            <p className="text-sm text-enterprise-grey mt-3">
              Battle-tested stack powering every project we ship
            </p>
          </div>
        </div>

        {/* Row 1 — slides LEFT */}
        <div className="relative mb-4 overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #FAFBFC, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #FAFBFC, transparent)",
            }}
          />
          <div
            className="flex gap-4 w-max"
            style={{ animation: "slide-left 30s linear infinite" }}
          >
            {[...service.techStack, ...service.techStack].map((tech, i) => {
              const logoMap = {
                Python: "python/3776AB",
                TensorFlow: "tensorflow/FF6F00",
                PyTorch: "pytorch/EE4C2C",
                LangChain: "langchain/1C3C3C",
                "OpenAI API": "openai/412991",
                "Hugging Face": "huggingface/FFD21E",
                MLflow: "mlflow/0194E2",
                Kubeflow: "kubernetes/326CE5",
                Pinecone: "pinecone/000000",
                Ray: "ray/028CF0",
                "Apache Spark": "apachespark/E25A1C",
                Kafka: "apachekafka/231F20",
                dbt: "dbt/FF694B",
                Airflow: "apacheairflow/017CEE",
                Redshift: "amazonaws/FF9900",
                BigQuery: "googlebigquery/669DF6",
                Snowflake: "snowflake/29B5E8",
                Grafana: "grafana/F46800",
                PostgreSQL: "postgresql/4169E1",
                AWS: "amazonaws/FF9900",
                Kubernetes: "kubernetes/326CE5",
                Terraform: "terraform/7B42BC",
                Docker: "docker/2496ED",
                "GitHub Actions": "githubactions/2088FF",
                Prometheus: "prometheus/E6522C",
                React: "react/61DAFB",
                "Next.js": "nextdotjs/000000",
                Flutter: "flutter/02569B",
                TypeScript: "typescript/3178C6",
                "Tailwind CSS": "tailwindcss/06B6D4",
                FastAPI: "fastapi/009688",
                GraphQL: "graphql/E10098",
                Redis: "redis/FF4438",
                InfluxDB: "influxdb/22ADF6",
                Elasticsearch: "elasticsearch/005571",
                RabbitMQ: "rabbitmq/FF6600",
              };
              const slug = logoMap[tech.name];
              return (
                <div
                  key={`r1-${i}`}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm shrink-0 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    borderColor: i % 3 === 0 ? `${service.color}30` : undefined,
                  }}
                >
                  {slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={tech.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xl">{tech.icon}</span>
                  )}
                  <span className="text-sm font-bold text-enterprise-mid whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — slides RIGHT */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #FAFBFC, transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #FAFBFC, transparent)",
            }}
          />
          <div
            className="flex gap-4 w-max"
            style={{ animation: "slide-right 35s linear infinite" }}
          >
            {[
              ...service.techStack.slice().reverse(),
              ...service.techStack.slice().reverse(),
            ].map((tech, i) => {
              const logoMap = {
                Python: "python/3776AB",
                TensorFlow: "tensorflow/FF6F00",
                PyTorch: "pytorch/EE4C2C",
                LangChain: "langchain/1C3C3C",
                "OpenAI API": "openai/412991",
                "Hugging Face": "huggingface/FFD21E",
                MLflow: "mlflow/0194E2",
                Kubeflow: "kubernetes/326CE5",
                Pinecone: "pinecone/000000",
                Ray: "ray/028CF0",
                "Apache Spark": "apachespark/E25A1C",
                Kafka: "apachekafka/231F20",
                dbt: "dbt/FF694B",
                Airflow: "apacheairflow/017CEE",
                Redshift: "amazonaws/FF9900",
                BigQuery: "googlebigquery/669DF6",
                Snowflake: "snowflake/29B5E8",
                Grafana: "grafana/F46800",
                PostgreSQL: "postgresql/4169E1",
                AWS: "amazonaws/FF9900",
                Kubernetes: "kubernetes/326CE5",
                Terraform: "terraform/7B42BC",
                Docker: "docker/2496ED",
                "GitHub Actions": "githubactions/2088FF",
                Prometheus: "prometheus/E6522C",
                React: "react/61DAFB",
                "Next.js": "nextdotjs/000000",
                Flutter: "flutter/02569B",
                TypeScript: "typescript/3178C6",
                "Tailwind CSS": "tailwindcss/06B6D4",
                FastAPI: "fastapi/009688",
                GraphQL: "graphql/E10098",
                Redis: "redis/FF4438",
                InfluxDB: "influxdb/22ADF6",
                Elasticsearch: "elasticsearch/005571",
                RabbitMQ: "rabbitmq/FF6600",
              };
              const slug = logoMap[tech.name];
              return (
                <div
                  key={`r2-${i}`}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm shrink-0 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    borderColor: i % 4 === 0 ? `${service.color}30` : undefined,
                  }}
                >
                  {slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={tech.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xl">{tech.icon}</span>
                  )}
                  <span className="text-sm font-bold text-enterprise-mid whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        {/* <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: "Technologies Mastered", value: "50+" },
              { label: "Avg. Team Experience", value: "7+ yrs" },
              { label: "Production Deployments", value: "200+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl font-extrabold font-jakarta"
                  style={{ color: service.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-enterprise-grey font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </section>
      {/* ══════════════════════════════════════
            CASE STUDIES
         ══════════════════════════════════════ */}
      {/* <section id="case-studies" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${service.color}12`, color: service.color }}
            >
              <Icon name="FolderOpenIcon" size={14} /> Case Studies
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
              Real Results, Real Clients
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {service.caseStudies.map((cs, i) => (
              <div
                key={cs.title}
                className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-enterprise transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <AppImage
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${service.color}95, transparent 50%)`,
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-xs font-bold text-white/80">
                      {cs.client}
                    </span>
                    <span
                      className="text-xs font-bold text-white px-3 py-1 rounded-full"
                      style={{ background: service.color }}
                    >
                      {cs.result}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold font-jakarta text-enterprise-mid mb-2">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-enterprise-grey leading-relaxed mb-4">
                    {cs.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{
                          background: `${service.color}10`,
                          color: service.color,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════
            PRICING
         ══════════════════════════════════════ */}
      <section
        id="pricing"
        className="py-28 relative"
        style={{ background: "#0F1117" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(231,111,111,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,143,132,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${service.color}20`, color: service.color }}
            >
              <Icon name="CurrencyRupeeIcon" size={14} /> Pricing
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-white leading-tight tracking-tight mb-5">
              Transparent, Flexible Pricing
            </h2>
            <p className="text-base text-white/50 leading-relaxed">
              No hidden costs. We work with your budget and business goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {service.pricing.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "ring-2 scale-105" : ""}`}
                style={{
                  background: plan.popular
                    ? `linear-gradient(135deg, ${plan.color}20, ${plan.color}10)`
                    : "rgba(255,255,255,0.04)",
                  border: plan.popular
                    ? `1px solid ${plan.color}50`
                    : "1px solid rgba(255,255,255,0.08)",
                  ringColor: plan.popular ? plan.color : "transparent",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: plan.color }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-white/40">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold font-jakarta text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40 text-sm ml-1">
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${plan.color}25` }}
                      >
                        <Icon
                          name="CheckIcon"
                          size={12}
                          style={{ color: plan.color }}
                        />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("#contact-cta")}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={
                    plan.popular
                      ? {
                          background: `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)`,
                          color: "white",
                        }
                      : {
                          background: "rgba(255,255,255,0.08)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }
                  }
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
            TEAM
         ══════════════════════════════════════ */}
      {/* <section id="team" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: `${service.color}12`, color: service.color }}
            >
              <Icon name="UserGroupIcon" size={14} /> Our Team
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
              The Experts Behind Your Project
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {service.team.map((member, i) => (
              <div
                key={member.name}
                className="group text-center p-8 rounded-3xl border border-gray-100 hover:shadow-enterprise hover:-translate-y-1 transition-all duration-300 min-w-[220px]"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${service.color}12` }}
                >
                  {member.icon}
                </div>
                <div className="font-bold text-enterprise-mid text-base font-jakarta mb-1">
                  {member.name}
                </div>
                <div
                  className="text-sm font-semibold mb-2"
                  style={{ color: service.color }}
                >
                  {member.role}
                </div>
                <div className="text-xs text-enterprise-grey bg-gray-50 px-3 py-1 rounded-full inline-block">
                  {member.exp} experience
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════════════════════════════════
            CONTACT CTA
         ══════════════════════════════════════ */}
      <section
        id="contact-cta"
        className="py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${service.color}15 0%, rgba(79,143,132,0.1) 100%)`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: service.color }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: service.color === "#E76F6F" ? "#4F8F84" : "#E76F6F",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 bg-white/60"
            style={{ color: service.color }}
          >
            <Icon name="RocketLaunchIcon" size={14} /> Let's Build Together
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight mb-6">
            Ready to Get Started with{" "}
            <span style={{ color: service.color }}>{service.title}?</span>
          </h2>
          <p className="text-lg text-enterprise-grey leading-relaxed mb-12 max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours
            with a tailored proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
              }}
            >
              Start a Project
              <Icon
                name="ArrowRightIcon"
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base text-enterprise-mid border-2 border-enterprise-mid/20 hover:border-enterprise-mid/50 transition-all duration-300 hover:-translate-y-1 bg-white/70"
            >
              <Icon name="EnvelopeIcon" size={18} />
              Contact Us
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: "ClockIcon", label: "Response within 24 hours" },
              { icon: "ShieldCheckIcon", label: "NDA available on request" },
              { icon: "GlobeAltIcon", label: "Remote-first, global delivery" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-enterprise-grey"
              >
                <Icon
                  name={item.icon}
                  size={16}
                  style={{ color: service.color }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
