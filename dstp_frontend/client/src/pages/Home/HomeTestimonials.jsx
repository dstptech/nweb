import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";
import TestimonialCard from "@/components/sections/TestimonialCard";
import SectionHeader from "@/components/sections/SectionHeader";
import { TESTIMONIALS } from "@/utils/homeData";
import { Link } from "react-router-dom";

export default function HomeTestimonials({ scrollTo }) {
  return (
    <>
      {/* ══════════ TESTIMONIALS ══════════ */}
      {/* <section id="testimonials" className="py-28 relative" style={{ background: "#FAFBFC" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(231, 111, 111, 0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <SectionHeader
            badge="Client Testimonials"
            badgeIcon="ChatBubbleLeftEllipsisIcon"
            title="What Our"
            highlight="Clients Say"
            highlightType="coral"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </div>
        </div>
      </section> */}

      {/* ══════════ CTA ══════════ */}
      <section id="cta" className="py-28 relative overflow-hidden cta-gradient">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(231,111,111,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,143,132,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "#E76F6F" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "#4F8F84" }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative reveal-hidden">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: "rgba(231,111,111,0.2)",
              color: "#F0A0A0",
              border: "1px solid rgba(231,111,111,0.3)",
            }}
          >
            <Icon name="RocketLaunchIcon" size={14} /> Let's Build Together
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold font-jakarta text-white leading-tight tracking-tight mb-6">
            Let's Build the Future of{" "}
            <span className="shimmer-text">Technology</span> Together
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            Whether you're launching a new AI product, modernizing legacy
            infrastructure, or scaling to millions of users — we're the
            engineering team that gets you there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <button
              onClick={() => scrollTo("#contact")}
              className="group flex items-center gap-2 px-10 py-5 rounded-full font-bold text-base text-enterprise-mid bg-white transition-all duration-300 hover:shadow-coral-lg hover:-translate-y-1 hover:bg-gray-50"
            >
              Start a Project{" "}
              <Icon
                name="ArrowRightIcon"
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 px-10 py-5 rounded-full font-bold text-base text-white border border-white/30 hover:border-white/60 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon name="EnvelopeIcon" size={18} /> Contact Us
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: "ClockIcon", label: "Response within 24 hours" },
              { icon: "ShieldCheckIcon", label: "NDA available on request" },
              { icon: "GlobeAltIcon", label: "Remote-first, global delivery" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <Icon name={item.icon} size={16} className="text-coral-300" />{" "}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 reveal-hidden">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                  style={{
                    background: "rgba(231,111,111,0.1)",
                    color: "#E76F6F",
                  }}
                >
                  <Icon name="EnvelopeIcon" size={14} /> Get In Touch
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
                  Ready to Start Your{" "}
                  <span className="gradient-text-coral">Next Project?</span>
                </h2>
              </div>
              <p className="text-base text-enterprise-grey leading-relaxed">
                Tell us about your project and we'll get back to you within 24
                hours with a tailored proposal and timeline.
              </p>
              <div className="space-y-5">
                {[
                  {
                    icon: "EnvelopeIcon",
                    label: "Email",
                    value: "hello@dstp.tech",
                    color: "#E76F6F",
                  },
                  {
                    icon: "GlobeAltIcon",
                    label: "Website",
                    value: "www.dstp.tech",
                    color: "#4F8F84",
                  },
                  {
                    icon: "MapPinIcon",
                    label: "Location",
                    value: "Jaipur, India · Remote Global",
                    color: "#E76F6F",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}12` }}
                    >
                      <Icon
                        name={item.icon}
                        size={20}
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      <div className="font-semibold text-enterprise-mid text-sm">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { icon: "LinkIcon", label: "LinkedIn" },
                  { icon: "CodeBracketIcon", label: "GitHub" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-enterprise-grey hover:border-coral-300 hover:text-coral-500 transition-all duration-200"
                  >
                    <Icon name={s.icon} size={16} /> {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="reveal-hidden">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-enterprise">
                <h3 className="text-xl font-bold font-jakarta text-enterprise-mid mb-6">
                  Send Us a Message
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      "Message sent! We'll get back to you within 24 hours.",
                    );
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                        First Name <span className="text-coral-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Arjun"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                        Last Name <span className="text-coral-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                      Business Email <span className="text-coral-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="arjun@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Nexora Technologies Pvt Ltd"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-grey focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all appearance-none bg-white">
                      <option value="">Select a service...</option>
                      <option>AI & Machine Learning</option>
                      <option>Data Engineering & Analytics</option>
                      <option>Cloud & DevOps Solutions</option>
                      <option>Web & Mobile Development</option>
                      <option>IoT & Smart Devices</option>
                      <option>Enterprise Software Systems</option>
                      <option>Other / Multiple Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-enterprise-grey uppercase tracking-wider mb-2">
                      Tell Us About Your Project{" "}
                      <span className="text-coral-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-enterprise-mid placeholder-gray-400 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:shadow-coral-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    style={{
                      background:
                        "linear-gradient(135deg, #E76F6F 0%, #C95555 100%)",
                    }}
                  >
                    Send Message{" "}
                    <Icon
                      name="ArrowRightIcon"
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <p className="text-center text-xs text-enterprise-grey">
                    By submitting, you agree to our{" "}
                    <span className="text-coral-500 cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                    . We respond within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-enterprise-dark text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1 space-y-5">
              <div className="flex items-center gap-3">
                <AppLogo size={48} iconName="SparklesIcon" />
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold font-jakarta tracking-tight">
                    DSTP TECHNOLOGY
                  </span>
                  <span className="text-xs font-semibold text-white/50 tracking-widest">
                    PRIVATE LIMITED
                  </span>
                  <span className="text-xs text-white/30 mt-0.5">
                    CIN: U63999RJ2025PTC106803
                  </span>
                </div>{" "}
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Engineering Smart Software, Intelligent Devices, and Data-Driven
                Solutions.
              </p>
              <div className="flex gap-3">
                {["LinkIcon", "CodeBracketIcon", "EnvelopeIcon"].map((icon) => (
                  <button
                    key={icon}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-coral-500/20 border border-white/10 hover:border-coral-500/30 flex items-center justify-center transition-all duration-200"
                    aria-label={icon}
                  >
                    <Icon
                      name={icon}
                      size={16}
                      className="text-white/60 hover:text-coral-300"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  "AI & Machine Learning",
                  "Data Engineering",
                  "Cloud & DevOps",
                  "Web & Mobile",
                  "IoT Devices",
                  "Enterprise Systems",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo("#services")}
                      className="text-sm text-white/60 hover:text-coral-300 transition-colors duration-200"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Technologies
              </h4>
              <ul className="space-y-3">
                {[
                  "Python & FastAPI",
                  "React & Next.js",
                  "AWS & Kubernetes",
                  "TensorFlow & PyTorch",
                  "PostgreSQL",
                  "Docker & Terraform",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "#about" },
                  { label: "Portfolio", href: "#portfolio" },
                  { label: "Why Choose Us", href: "#why-us" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-white/60 hover:text-teal-light transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-white/60 hover:text-coral-300 transition-colors duration-200"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                  Contact
                </h4>
                <p className="text-sm text-white/60">
                  +91 9001694300, +91 9351885314
                </p>
                <p className="text-sm text-white/60 mt-1">
                  E-112-A, Kataria Colony Ramnagar Extn, Sodala Jaipur, India
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © 2026 DSTP Technology Private Limited. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <button
                    key={item}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
