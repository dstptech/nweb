import { useState } from "react"
import { Save, RotateCcw, Eye } from "lucide-react"
import toast from "react-hot-toast"

// Import all section editors
import HeroEditor from "./sections/HeroEditor"
import ServicesEditor from "./sections/ServicesEditor"
import ProjectsEditor from "./sections/ProjectsEditor"
import TestimonialsEditor from "./sections/TestimonialsEditor"
import AboutEditor from "./sections/AboutEditor"
import ContactEditor from "./sections/ContactEditor"

// ── TABS ────────────────────────────────────────────
const tabs = [
  { id: "hero",         label: "Hero",         emoji: "🦸" },
  { id: "services",     label: "Services",     emoji: "🛠️" },
  { id: "projects",     label: "Projects",     emoji: "🗂️" },
  { id: "testimonials", label: "Testimonials", emoji: "💬" },
  { id: "about",        label: "About/Team",   emoji: "👥" },
  { id: "contact",      label: "Contact/CTA",  emoji: "📞" },
]

// ── MOCK DATA ────────────────────────────────────────
// Later replace with: const { data } = useQuery(() => axios.get("/api/homepage/"))
export const defaultData = {
  hero: {
    badge:           "Enterprise IT Solutions",
    title:           "Empowering Business",
    titleHighlight:  "Through Technology",
    subtitle:        "We deliver smart, scalable IT solutions that drive growth.",
    primaryBtn:      "Get Started",
    secondaryBtn:    "Learn More",
    primaryBtnLink:  "/contact",
    secondaryBtnLink:"/about",
    bgColor:         "#0a0f1e",
    textColor:       "#ffffff",
  },
  services: [
    { id: 1, title: "AI & ML Solutions",    description: "Intelligent systems that learn and adapt.", icon: "🤖", color: "#3b82f6" },
    { id: 2, title: "Cloud Infrastructure", description: "Scalable cloud solutions for your business.", icon: "☁️", color: "#8b5cf6" },
    { id: 3, title: "Data Engineering",     description: "Turn raw data into powerful insights.",    icon: "📊", color: "#10b981" },
    { id: 4, title: "IoT Integration",      description: "Connect devices, automate processes.",     icon: "🔌", color: "#f59e0b" },
  ],
  projects: [
    { id: 1, title: "Smart City Platform",  client: "Mumbai Corp",   category: "IoT",   image: "", status: "Completed" },
    { id: 2, title: "AI Analytics Suite",   client: "FinTech India", category: "AI",    image: "", status: "Ongoing"   },
    { id: 3, title: "Cloud Migration",      client: "RetailCo",      category: "Cloud", image: "", status: "Completed" },
  ],
  testimonials: [
    { id: 1, name: "Raj Sharma",   role: "CTO, TechCorp",    review: "DSTP transformed our infrastructure completely!", rating: 5, avatar: "" },
    { id: 2, name: "Priya Mehta",  role: "CEO, StartupX",    review: "Outstanding AI solutions and great support.",      rating: 5, avatar: "" },
    { id: 3, name: "Anil Kumar",   role: "Director, FinBank", review: "Reliable, scalable and cost-effective.",           rating: 4, avatar: "" },
  ],
  about: {
    title:       "About DSTP",
    subtitle:    "DSTP Technology Private Limited",
    description: "We are a team of passionate engineers delivering smart IT solutions.",
    vision:      "To be India's most trusted technology partner.",
    stats: [
      { id: 1, label: "Projects Completed", value: "120+" },
      { id: 2, label: "Happy Clients",       value: "80+"  },
      { id: 3, label: "Team Members",        value: "32+"  },
      { id: 4, label: "Years Experience",    value: "8+"   },
    ]
  },
  contact: {
    title:        "Get In Touch",
    subtitle:     "Let's build something great together.",
    btnText:      "Contact Us",
    btnLink:      "/contact",
    email:        "info@dstp.com",
    phone:        "+91 98765 43210",
    address:      "Mumbai, Maharashtra, India",
    bgColor:      "#1e293b",
    textColor:    "#ffffff",
  }
}

// ── MAIN COMPONENT ───────────────────────────────────
function HomepageEditor() {
  const [activeTab, setActiveTab]   = useState("hero")
  const [data, setData]             = useState(defaultData)
  const [saving, setSaving]         = useState(false)

  // Update a specific section's data
  // section = "hero", field = "title", value = "New Title"
  const updateSection = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Save all changes (later → axios.put("/api/homepage/", data))
  const handleSave = async () => {
    setSaving(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setSaving(false)
    toast.success("Homepage updated successfully!")
    // Later: await axios.put("/api/v1/homepage/", data)
  }

  // Reset to default data
  const handleReset = () => {
    setData(defaultData)
    toast("Reset to default!", { icon: "🔄" })
  }

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homepage Editor</h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit your website content without touching any code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">

          {/* Preview button */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            Preview Site
          </a>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-200
              ${activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div>
        {activeTab === "hero"         && <HeroEditor         data={data.hero}         onChange={(f, v) => updateSection("hero", f, v)} />}
        {activeTab === "services"     && <ServicesEditor     data={data.services}     onChange={(v) => setData(prev => ({ ...prev, services: v }))} />}
        {activeTab === "projects"     && <ProjectsEditor     data={data.projects}     onChange={(v) => setData(prev => ({ ...prev, projects: v }))} />}
        {activeTab === "testimonials" && <TestimonialsEditor data={data.testimonials} onChange={(v) => setData(prev => ({ ...prev, testimonials: v }))} />}
        {activeTab === "about"        && <AboutEditor        data={data.about}        onChange={(f, v) => updateSection("about", f, v)} />}
        {activeTab === "contact"      && <ContactEditor      data={data.contact}      onChange={(f, v) => updateSection("contact", f, v)} />}
      </div>

    </div>
  )
}

export default HomepageEditor