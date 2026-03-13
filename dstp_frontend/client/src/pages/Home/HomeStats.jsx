import Icon from "@/components/ui/AppIcon";
import ProjectCard from "@/components/sections/ProjectCard";
import MetricCard from "@/components/sections/MetricCard";
import SectionHeader from "@/components/sections/SectionHeader";
import { PORTFOLIO, METRICS } from "@/utils/homeData";

export default function HomeStats({ scrollTo }) {
  return (
    <>
      {/* ══════════ PORTFOLIO ══════════ */}
      <section id="portfolio" className="py-28 relative overflow-hidden" style={{ background: "#0F1117" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(231,111,111,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,143,132,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#E76F6F" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "#4F8F84" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <SectionHeader
            badge="Portfolio"
            badgeIcon="FolderOpenIcon"
            title="Systems We've"
            highlight="Shipped to Production"
            highlightType="coral"
            subtitle="Real projects. Real impact. Built for production at enterprise scale."
            darkMode
          />
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="text-center mt-12 reveal-hidden">
            <button onClick={() => scrollTo("#contact")} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white border border-white/20 hover:border-coral-400 hover:text-coral-300 transition-all duration-300">
              View All Case Studies <Icon name="ArrowRightIcon" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section id="why-us" className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-7 reveal-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(231,111,111,0.1)", color: "#E76F6F" }}>
                <Icon name="StarIcon" size={14} /> Why Choose DSTP
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
                Engineering Excellence,{" "}<span className="gradient-text-teal">Proven at Scale</span>
              </h2>
              <p className="text-base text-enterprise-grey leading-relaxed">
                We don't just write code. We architect systems that last. Every project is treated as a long-term investment in your company's technical foundation.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "CheckBadgeIcon", title: "Enterprise-Grade Engineering", desc: "Production-ready code with comprehensive testing, monitoring, and documentation.", color: "#E76F6F" },
                  { icon: "BoltIcon", title: "Agile & Transparent Delivery", desc: "Weekly sprints, daily standups, full visibility into progress and blockers.", color: "#4F8F84" },
                  { icon: "ShieldCheckIcon", title: "Security & Compliance First", desc: "SOC 2 aligned processes, GDPR-ready architecture, and secure-by-design systems.", color: "#E76F6F" },
                  { icon: "ArrowPathIcon", title: "Post-Launch Support & Scale", desc: "We stay with you after launch — continuous improvement, scaling, and iteration.", color: "#4F8F84" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${item.color}12` }}>
                      <Icon name={item.icon} size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-enterprise-mid text-sm mb-1">{item.title}</div>
                      <div className="text-sm text-enterprise-grey">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {METRICS.map((metric, i) => (
                <MetricCard key={metric.label} metric={metric} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}