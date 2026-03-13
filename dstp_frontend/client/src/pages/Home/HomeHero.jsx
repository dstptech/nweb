import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import AINetworkViz from "@/components/sections/AINetworkViz";

export default function HomeHero({ scrollTo }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
      style={{ paddingTop: "80px" }}
    >
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-blob-morph"
        style={{ background: "#E76F6F" }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-blob-morph"
        style={{ background: "#4F8F84", animationDelay: "4s" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in-up opacity-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(231,111,111,0.1), rgba(79,143,132,0.1))",
                border: "1px solid rgba(231,111,111,0.2)",
                color: "#E76F6F",
                animationFillMode: "forwards",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-coral-400 animate-pulse" />
              Innovating Technology for Modern Businesses
            </div>

            <div
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold font-jakarta leading-[1.05] tracking-tight text-enterprise-mid">
                Engineering <span className="shimmer-text">Intelligent</span>
                <br />
                Technology
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #4F8F84, #7ABDB4)",
                  }}
                >
                  for the Modern World
                </span>
              </h1>
            </div>

            <p
              className="text-lg text-enterprise-grey leading-relaxed max-w-lg animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              We build AI-driven software, enterprise data platforms,
              intelligent IoT devices, and scalable digital systems that power
              the world's most ambitious companies.
            </p>

            <div
              className="flex flex-wrap gap-2 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              {[
                "AI & Data",
                "Smart Software",
                "Enterprise Systems",
                "IoT Devices",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "rgba(79,143,132,0.3)",
                    color: "#4F8F84",
                    background: "rgba(79,143,132,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <button
                onClick={() => scrollTo("#services")}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm transition-all duration-300 hover:shadow-coral-lg hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, #E76F6F 0%, #C95555 100%)",
                }}
              >
                Explore Solutions
                <Icon
                  name="ArrowRightIcon"
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm border-2 text-enterprise-mid transition-all duration-300 hover:border-teal hover:text-teal hover:-translate-y-1"
                style={{ borderColor: "#E8EAED" }}
              >
                Start Your Project
                <Icon
                  name="SparklesIcon"
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>

            <div
              className="flex items-center gap-6 pt-4 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
            >
              <div className="flex -space-x-3">
                {[
                  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                  "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
                  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white"
                  >
                    <AppImage
                      src={src}
                      alt="Client avatar"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 fill-coral-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-enterprise-grey font-medium">
                  Trusted by 40+ enterprise clients
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative h-[480px] lg:h-[560px] animate-fade-in-right opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <AINetworkViz />
            <div
              className="absolute top-10 -left-4 glass-card rounded-2xl px-4 py-3 animate-float shadow-enterprise"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-xs text-enterprise-grey font-semibold mb-0.5">
                Tech Stack
              </div>
              <div className="text-2xl font-extrabold font-jakarta text-coral-500">
                15+
              </div>
            </div>
            <div className="absolute bottom-16 -right-4 glass-card rounded-2xl px-4 py-3 animate-float-delayed shadow-enterprise">
              <div className="text-xs text-enterprise-grey font-semibold mb-0.5">
                Data Processed
              </div>
              <div className="text-2xl font-extrabold font-jakarta text-teal">
                10TB+
              </div>
              <div className="text-xs text-enterprise-grey">per month</div>
            </div>
            <div className="absolute top-1/2 -right-2 glass-card rounded-2xl px-4 py-3 animate-float-slow shadow-enterprise">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-xs font-bold text-enterprise-mid">
                  Systems Online
                </div>
              </div>
              <div className="text-xl font-extrabold font-jakarta text-enterprise-mid mt-0.5">
                99.99%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-enterprise-grey font-semibold tracking-widest uppercase">
          Scroll
        </span>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className="text-enterprise-grey"
        />
      </div>
    </section>
  );
}
