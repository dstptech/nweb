import Icon from "@/components/ui/AppIcon";
import ServiceCard from "@/components/sections/ServiceCard";
import SectionHeader from "@/components/sections/SectionHeader";
import TechStackMarquee from "@/components/sections/TechStackMarquee";
import { SERVICES } from "@/utils/homeData";

export default function HomeServices({ scrollTo }) {
  return (
    <>
      {/* ══════════ SERVICES ══════════ */}
      <section
        id="services"
        className="py-28 relative"
        style={{ background: "#FAFBFC" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(79, 143, 132, 0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <SectionHeader
            badge="Our Services"
            badgeIcon="WrenchScrewdriverIcon"
            title="End-to-End Technology"
            highlight="Services"
            highlightType="teal"
            subtitle="From AI strategy to production deployment, we deliver complete technology solutions engineered for enterprise scale and long-term reliability."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TECHNOLOGY STACK ══════════ */}
      <section id="technology" className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            badge="Technology Stack"
            badgeIcon="CpuChipIcon"
            title="Built on"
            highlight="Industry-Leading Technologies"
            highlightType="coral"
            subtitle="We leverage a curated set of battle-tested technologies to build systems that are fast, reliable, and ready for enterprise scale."
          />
        </div>

        <TechStackMarquee />

        <div className="text-center mt-10">
          <p className="text-sm text-enterprise-grey font-medium">
            + 30 more specialized tools and frameworks in our engineering
            toolkit
          </p>
        </div>
      </section>
    </>
  );
}
