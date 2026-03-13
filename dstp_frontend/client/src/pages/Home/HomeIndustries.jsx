import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export default function HomeIndustries({ scrollTo }) {
  return (
    <section id="about" className="py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[480px] reveal-hidden">
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1a23220d5-1772825945154.png"
                alt="DSTP Technology team collaborating on enterprise software architecture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(231,111,111,0.3) 0%, rgba(79,143,132,0.3) 100%)",
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 shadow-enterprise animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center">
                  <Icon
                    name="TrophyIcon"
                    size={20}
                    className="text-coral-500"
                  />
                </div>
                <div>
                  <div className="font-bold text-enterprise-mid text-sm">
                    Next Big Thing
                  </div>
                  <div className="text-xs text-enterprise-grey">
                    From Jaipur
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 glass-card rounded-2xl p-4 shadow-enterprise animate-float-delayed">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-enterprise-mid">
                  Tech Stack
                </span>
              </div>
              <div className="text-2xl font-extrabold font-jakarta text-teal">
                15+
              </div>
              <div className="text-xs text-enterprise-grey">
                Technologies
              </div>
            </div>
          </div>

          <div className="space-y-7 reveal-hidden">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ background: "rgba(79,143,132,0.1)", color: "#4F8F84" }}
              >
                <Icon name="BuildingOffice2Icon" size={14} /> About DSTP
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
                We Are a Modern{" "}
                <span className="gradient-text-coral">Technology</span> Company
              </h2>
            </div>
            <p className="text-base text-enterprise-grey leading-relaxed">
              <strong className="text-enterprise-mid">
                DSTP Technology Private Limited
              </strong>{" "}
              is a full-stack enterprise technology partner headquartered in
              India, delivering world-class AI-driven software, data engineering
              platforms, and intelligent connected systems to organizations
              across finance, healthcare, logistics, and manufacturing.
            </p>
            <p className="text-base text-enterprise-grey leading-relaxed">
              Founded by engineers with deep roots in enterprise architecture,
              we combine Silicon Valley engineering culture with the precision
              of Fortune 500 delivery standards — building systems that scale,
              adapt, and endure.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "CpuChipIcon",
                  label: "AI-First Engineering",
                  color: "#E76F6F",
                },
                {
                  icon: "ShieldCheckIcon",
                  label: "Enterprise Security",
                  color: "#4F8F84",
                },
                { icon: "BoltIcon", label: "Agile Delivery", color: "#E76F6F" },
                {
                  icon: "GlobeAltIcon",
                  label: "Global Standards",
                  color: "#4F8F84",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      style={{ color: item.color }}
                    />
                  </div>
                  <span className="text-sm font-bold text-enterprise-mid">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-300 hover:shadow-teal-md hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #4F8F84, #3A6B62)",
              }}
            >
              Learn More About Us <Icon name="ArrowRightIcon" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
