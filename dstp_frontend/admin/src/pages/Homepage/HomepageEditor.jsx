import { useState, useEffect } from "react"
import { Save, RotateCcw, Eye, Loader } from "lucide-react"
import toast from "react-hot-toast"
import { getHomepageData, updateHomepageData, createHomepageData } from "../../api/homepageApi"

import HeroEditor         from "./sections/HeroEditor"
import ServicesEditor     from "./sections/ServicesEditor"
import ProjectsEditor     from "./sections/ProjectsEditor"
import TestimonialsEditor from "./sections/TestimonialsEditor"
import AboutEditor        from "./sections/AboutEditor"
import ContactEditor      from "./sections/ContactEditor"

const tabs = [
  { id: "hero",         label: "Hero",         emoji: "🦸" },
  { id: "services",     label: "Services",     emoji: "🛠️" },
  { id: "projects",     label: "Projects",     emoji: "🗂️" },
  { id: "testimonials", label: "Testimonials", emoji: "💬" },
  { id: "about",        label: "About/Team",   emoji: "👥" },
  { id: "contact",      label: "Contact/CTA",  emoji: "📞" },
]
// This is used as fallback if API returns empty/null
const defaultData = {
  hero: {
    badge: "", title: "", titleHighlight: "",
    subtitle: "", primaryBtn: "", secondaryBtn: "",
    primaryBtnLink: "", secondaryBtnLink: "",
    bgColor: "#0a0f1e", textColor: "#ffffff"
  },
  services:     [],
  projects:     [],
  testimonials: [],
  about: {
    title: "", subtitle: "", description: "",
    vision: "", stats: []
  },
  contact: {
    title: "", subtitle: "", btnText: "",
    btnLink: "", email: "", phone: "",
    address: "", bgColor: "#1e293b", textColor: "#ffffff",
  }
}

function HomepageEditor() {
  const [activeTab, setActiveTab] = useState("hero")
  const [data, setData]           = useState(null)
  const [homepageId, setHomepageId] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState(null)

  // For Page Load
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching homepage data...")  // debug log
      const response = await getHomepageData()
      console.log("API Response:", response)    // debug log — check this!

      if (response) {
        setHomepageId(response.id)

        // Map API response to our data structure
        // Change field names below to match what your API actually returns!
        setData({
          hero: {
            badge:            response.hero_badge        || "",
            title:            response.hero_title        || "",
            titleHighlight:   response.hero_highlight    || "",
            subtitle:         response.hero_subtitle     || "",
            primaryBtn:       response.primary_btn_text  || "",
            secondaryBtn:     response.secondary_btn_text|| "",
            primaryBtnLink:   response.primary_btn_link  || "",
            secondaryBtnLink: response.secondary_btn_link|| "",
            bgColor:          response.hero_bg_color     || "#0a0f1e",
            textColor:        response.hero_text_color   || "#ffffff",
          },
          services:     response.services     || [],
          projects:     response.projects     || [],
          testimonials: response.testimonials || [],
          about: {
            title:       response.about_title       || "",
            subtitle:    response.about_subtitle    || "",
            description: response.about_description || "",
            vision:      response.about_vision      || "",
            stats:       response.about_stats       || [],
          },
          contact: {
            title:     response.contact_title    || "",
            subtitle:  response.contact_subtitle || "",
            btnText:   response.contact_btn_text || "",
            btnLink:   response.contact_btn_link || "",
            email:     response.contact_email    || "",
            phone:     response.contact_phone    || "",
            address:   response.contact_address  || "",
            bgColor:   response.contact_bg_color || "#1e293b",
            textColor: response.contact_text_color|| "#ffffff",
          }
        })
      } else {
        // No data in DB yet — use defaults
        console.log("No data found, using defaults")
        setData(defaultData)
      }

    } catch (err) {
      console.error("Fetch error:", err)

      // Check what kind of error
      if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to backend. Is Django running on port 8000?")
      } else if (err.response?.status === 401) {
        setError("Not authorized. Please login first.")
      } else if (err.response?.status === 404) {
        setError("API endpoint not found. Check the URL with Taaransh.")
      } else {
        setError("Something went wrong. Check console for details.")
      }

      // Use defaults so page doesn't break completely
      setData(defaultData)

    } finally {
      setLoading(false)
    }
  }

  // ── UPDATE ONE SECTION FIELD ─────────────────────
  const updateSection = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // ── SAVE TO API ──────────────────────────────────
  const handleSave = async () => {
    try {
      setSaving(true)

      // Map our data back to API field names
      const payload = {
        hero_badge:           data.hero.badge,
        hero_title:           data.hero.title,
        hero_highlight:       data.hero.titleHighlight,
        hero_subtitle:        data.hero.subtitle,
        primary_btn_text:     data.hero.primaryBtn,
        secondary_btn_text:   data.hero.secondaryBtn,
        primary_btn_link:     data.hero.primaryBtnLink,
        secondary_btn_link:   data.hero.secondaryBtnLink,
        hero_bg_color:        data.hero.bgColor,
        hero_text_color:      data.hero.textColor,
        services:             data.services,
        projects:             data.projects,
        testimonials:         data.testimonials,
        about_title:          data.about.title,
        about_subtitle:       data.about.subtitle,
        about_description:    data.about.description,
        about_vision:         data.about.vision,
        about_stats:          data.about.stats,
        contact_title:        data.contact.title,
        contact_subtitle:     data.contact.subtitle,
        contact_btn_text:     data.contact.btnText,
        contact_btn_link:     data.contact.btnLink,
        contact_email:        data.contact.email,
        contact_phone:        data.contact.phone,
        contact_address:      data.contact.address,
        contact_bg_color:     data.contact.bgColor,
        contact_text_color:   data.contact.textColor,
      }

      console.log("Saving payload:", payload) // debug log

      if (homepageId) {
        await updateHomepageData(homepageId, payload)
      } else {
        const created = await createHomepageData(payload)
        setHomepageId(created.id)
      }

      toast.success("Homepage saved successfully!")

    } catch (err) {
      console.error("Save error:", err)
      toast.error("Failed to save. Check console!")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    await fetchData()
    toast("Reset to saved version!", { icon: "🔄" })
  }

  // ── LOADING ──────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading homepage data...</p>
          <p className="text-gray-400 text-xs mt-1">Connecting to backend...</p>
        </div>
      </div>
    )
  }

  // ── NO DATA ──────────────────────────────────────
  if (!data) return null

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homepage Editor</h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit website content without touching any code
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Show error banner if any */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs">
              ⚠️ {error}
            </div>
          )}
          <a
            href="http://localhost:8000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <Eye size={16} /> Preview Site
          </a>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw size={16} /> Reset
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60"
          >
            {saving
              ? <><Loader size={15} className="animate-spin" /> Saving...</>
              : <><Save size={15} /> Save Changes</>
            }
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
        {activeTab === "hero" &&
          <HeroEditor
            data={data.hero}
            onChange={(f, v) => updateSection("hero", f, v)}
          />
        }
        {activeTab === "services" &&
          <ServicesEditor
            data={data.services}
            onChange={v => setData(p => ({ ...p, services: v }))}
          />
        }
        {activeTab === "projects" &&
          <ProjectsEditor
            data={data.projects}
            onChange={v => setData(p => ({ ...p, projects: v }))}
          />
        }
        {activeTab === "testimonials" &&
          <TestimonialsEditor
            data={data.testimonials}
            onChange={v => setData(p => ({ ...p, testimonials: v }))}
          />
        }
        {activeTab === "about" &&
          <AboutEditor
            data={data.about}
            onChange={(f, v) => updateSection("about", f, v)}
          />
        }
        {activeTab === "contact" &&
          <ContactEditor
            data={data.contact}
            onChange={(f, v) => updateSection("contact", f, v)}
          />
        }
      </div>
    </div>
  )
}

export default HomepageEditor