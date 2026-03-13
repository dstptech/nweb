import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import AppLogo from "@/components/ui/AppLogo";
import { useNavigate } from "react-router-dom";

const FUTURE_ROLES = [
  {
    title: "Frontend Developer",
    icon: "CodeBracketIcon",
    color: "#E76F6F",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    type: "Full-time",
    location: "Jaipur / Remote",
  },
  {
    title: "Backend Developer",
    icon: "ServerIcon",
    color: "#4F8F84",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    type: "Full-time",
    location: "Jaipur / Remote",
  },
  {
    title: "UI/UX Designer",
    icon: "PaintBrushIcon",
    color: "#E76F6F",
    skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
    type: "Full-time",
    location: "Jaipur / Remote",
  },
  {
    title: "DevOps Engineer",
    icon: "CloudIcon",
    color: "#4F8F84",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
    type: "Full-time",
    location: "Jaipur / Remote",
  },
  {
    title: "Data Scientist",
    icon: "ChartBarIcon",
    color: "#E76F6F",
    skills: ["Python", "TensorFlow", "MLflow", "SQL"],
    type: "Full-time",
    location: "Jaipur / Remote",
  },
  {
    title: "Business Development",
    icon: "BriefcaseIcon",
    color: "#4F8F84",
    skills: ["Sales", "Client Management", "Proposal Writing", "CRM"],
    type: "Full-time",
    location: "Jaipur",
  },
];

const PERKS = [
  {
    icon: "HomeIcon",
    title: "Remote Friendly",
    desc: "Work from anywhere in India",
  },
  {
    icon: "BoltIcon",
    title: "Fast Growth",
    desc: "Startup speed, real ownership",
  },
  {
    icon: "UserGroupIcon",
    title: "Small Team",
    desc: "Your work actually matters",
  },
  {
    icon: "RocketLaunchIcon",
    title: "Early Joiner",
    desc: "Shape the company culture from day one",
  },
  {
    icon: "AcademicCapIcon",
    title: "Learn by Doing",
    desc: "Real projects, real impact from day one",
  },
  {
    icon: "StarIcon",
    title: "Merit Based",
    desc: "Performance is recognized and rewarded",
  },
];

export default function CareersPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white font-dm overflow-x-hidden">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <AppLogo size={36} />
            <span className="font-extrabold font-jakarta text-enterprise-mid text-base">
              DSTP TECHNOLOGY PRIVATE LIMITED
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-enterprise-grey hover:text-enterprise-mid transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            Back to Home
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ background: "#0F1117", paddingTop: "64px" }}
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
          style={{ background: "#E76F6F" }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#4F8F84" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{
                background: "rgba(231,111,111,0.15)",
                border: "1px solid rgba(231,111,111,0.3)",
                color: "#E76F6F",
                animation: "fadeSlideUp 0.5s ease forwards",
                opacity: 0,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              We're Hiring Soon
            </div>

            {/* Heading */}
            <h1
              className="text-5xl lg:text-7xl font-extrabold font-jakarta leading-[1.0] tracking-tight text-white mb-6"
              style={{
                animation: "fadeSlideUp 0.6s ease 0.1s forwards",
                opacity: 0,
              }}
            >
              Build the{" "}
              <span
                style={{
                  background:
                    "linear-gradient(270deg, #E76F6F, #4F8F84, #a78bfa, #E76F6F)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animationName: "gradientShift",
                  animationDuration: "4s",
                  animationTimingFunction: "ease",
                  animationIterationCount: "infinite",
                }}
              >
                Future
              </span>{" "}
              with Us
            </h1>

            <p
              className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto"
              style={{
                animation: "fadeSlideUp 0.6s ease 0.2s forwards",
                opacity: 0,
              }}
            >
              We're building something big from Jaipur. Join us early, grow
              fast, and help shape India's next great tech company.
            </p>

            {/* Coming Soon chip */}
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-10"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                animation: "fadeSlideUp 0.6s ease 0.3s forwards",
                opacity: 0,
              }}
            >
              <Icon name="ClockIcon" size={18} className="text-white/50" />
              <span className="text-white/70 text-sm font-semibold">
                Openings coming soon — register your interest below
              </span>
            </div>

            {/* Email notify form */}
            <div
              style={{
                animation: "fadeSlideUp 0.6s ease 0.4s forwards",
                opacity: 0,
              }}
            >
              {!submitted ? (
                <form
                  onSubmit={handleNotify}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white/70 text-sm focus:outline-none focus:border-white/50 transition-colors"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <option value="">Any Role</option>
                    {FUTURE_ROLES.map((r) => (
                      <option
                        key={r.title}
                        value={r.title}
                        style={{ background: "#1E2330" }}
                      >
                        {r.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #E76F6F, #C95555)",
                    }}
                  >
                    Notify Me
                  </button>
                </form>
              ) : (
                <div
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl max-w-md mx-auto"
                  style={{
                    background: "rgba(79,143,132,0.2)",
                    border: "1px solid rgba(79,143,132,0.4)",
                  }}
                >
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    style={{ color: "#4F8F84" }}
                  />
                  <span className="text-white/80 text-sm font-semibold">
                    We'll notify you when positions open up!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE ROLES ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "rgba(231,111,111,0.08)", color: "#E76F6F" }}
            >
              <Icon name="BriefcaseIcon" size={14} /> Future Openings
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
              Roles We're{" "}
              <span style={{ color: "#E76F6F" }}>Building Towards</span>
            </h2>
            <p className="text-base text-enterprise-grey mt-4">
              These positions will open as we grow. Register your interest now
              to be first in line.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUTURE_ROLES.map((role, i) => (
              <div
                key={role.title}
                className="group p-7 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${role.color}05, transparent)`,
                  }}
                />

                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${role.color}12` }}
                  >
                    <Icon
                      name={role.icon}
                      size={22}
                      style={{ color: role.color }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(79,143,132,0.1)",
                      color: "#4F8F84",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-base font-bold font-jakarta text-enterprise-mid mb-2">
                  {role.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-enterprise-grey mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="BriefcaseIcon" size={12} /> {role.type}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="MapPinIcon" size={12} /> {role.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                      style={{
                        background: `${role.color}10`,
                        color: role.color,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="py-28 relative" style={{ background: "#FAFBFC" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(79,143,132,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: "rgba(79,143,132,0.1)", color: "#4F8F84" }}
            >
              <Icon name="HeartIcon" size={14} /> Why Join Us
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-enterprise-mid leading-tight tracking-tight">
              Perks & <span style={{ color: "#4F8F84" }}>Benefits</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk, i) => (
              <div
                key={perk.title}
                className="p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(231,111,111,0.1)"
                        : "rgba(79,143,132,0.1)",
                  }}
                >
                  <Icon
                    name={perk.icon}
                    size={22}
                    style={{ color: i % 2 === 0 ? "#E76F6F" : "#4F8F84" }}
                  />
                </div>
                <h3 className="text-base font-bold font-jakarta text-enterprise-mid mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-enterprise-grey">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "#0F1117" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#E76F6F" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "#4F8F84" }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-extrabold font-jakarta text-white leading-tight tracking-tight mb-6">
            Can't Wait?{" "}
            <span style={{ color: "#E76F6F" }}>Reach Out Directly</span>
          </h2>
          <p className="text-base text-white/60 leading-relaxed mb-10">
            Send us your resume at{" "}
            <span className="text-white font-semibold">careers@dstp.tech</span>{" "}
            and tell us how you'd like to contribute. We read every email!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@dstp.tech"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #E76F6F, #C95555)",
              }}
            >
              <Icon name="EnvelopeIcon" size={18} />
              Email Your Resume
            </a>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base text-white border border-white/20 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon name="ArrowLeftIcon" size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
