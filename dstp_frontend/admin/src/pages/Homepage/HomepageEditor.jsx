import { useState, useEffect } from "react"
import { Save, RotateCcw, Eye, Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { getHomepageData, updateHomepageData, createHomepageData } from "../../api/homepageApi"

import HeroEditor         from "./sections/HeroEditor"
import ServicesEditor     from "./sections/ServicesEditor"
import ProjectsEditor     from "./sections/ProjectsEditor"
import TestimonialsEditor from "./sections/TestimonialsEditor"
import AboutEditor        from "./sections/AboutEditor"
import ContactEditor      from "./sections/ContactEditor"

// ── TAARANSH'S API ONLY HAS THESE 7 FIELDS ────────────
// hero_title, hero_subtitle, hero_image,
// banner_text, banner_image,
// stats_title, stats_value
// ──────────────────────────────────────────────────────

const tabs = [
  { id: "hero",         label: "Hero",         emoji: "🦸" },
  { id: "services",     label: "Services",     emoji: "🛠️" },
  { id: "projects",     label: "Projects",     emoji: "🗂️" },
  { id: "testimonials", label: "Testimonials", emoji: "💬" },
  { id: "about",        label: "About/Team",   emoji: "👥" },
  { id: "contact",      label: "Contact/CTA",  emoji: "📞" },
]

const defaultData = {
  hero: {
    hero_title:      "",
    hero_subtitle:   "",
    hero_image:      "",
    banner_text:      "",
    banner_image:     "",
    stats_title:     "",
    stats_value:     "",
    updated_on:      null,
    bgColor:          "#0a0f1e",
    textColor:        "#ffffff",
  },
  about: {
    title:       "",
    stats: [{ id: 1, value: "", label: "Stat 1" }],
    subtitle:    "",
    description: "",
    vision:      "",
  },
  services:     [],
  projects:     [],
  testimonials: [],
  contact: {
    title: "", subtitle: "", btnText: "",
    btnLink: "", email: "", phone: "",
    address: "", bgColor: "#1e293b", textColor: "#ffffff",
  }
}

function HomepageEditor() {
  const [activeTab,  setActiveTab]  = useState("hero")
  const [data,       setData]       = useState(null)
  const [homepageId, setHomepageId] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("📡 Fetching homepage data...")
      const response = await getHomepageData()
      console.log("✅ API Response:", response)

      if (response) {
        setHomepageId(response.id)
        setData({
          hero: {
            hero_title:      response.hero_title    || "",
            hero_subtitle:   response.hero_subtitle || "",
            hero_image:      response.hero_image    || "",
            banner_text:     response.banner_text   || "",
            banner_image:    response.banner_image  || "",
            stats_title:     response.stats_title   || "",
            stats_value:     response.stats_value   || "",
            updated_on:      response.updated_on    || null,
            bgColor:          "#0a0f1e",
            textColor:        "#ffffff",
          },
          about: {
            title:       response.stats_title || "",
            stats: [{ id: 1, value: response.stats_value || "", label: "Stat 1" }],
            subtitle:    "",
            description: "",
            vision:      "",
          },
          services:     [],
          projects:     [],
          testimonials: [],
          contact: {
            title: "", subtitle: "", btnText: "",
            btnLink: "", email: "", phone: "",
            address: "", bgColor: "#1e293b", textColor: "#ffffff",
          }
        })
      } else {
        console.log("⚠️ No data, using defaults")
        setData(defaultData)
      }

    } catch (err) {
      console.error("❌ Fetch error:", err)
      if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to backend. Is Django running on port 8000?")
      } else if (err.response?.status === 401) {
        setError("Not authorized. Please login first.")
      } else if (err.response?.status === 404) {
        setError("API endpoint not found.")
      } else {
        setError("Something went wrong. Check console.")
      }
      setData(defaultData)
    } finally {
      setLoading(false)
    }
  }

  const updateSection = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }))
  }

  // ── SAVE — only sends the 7 fields the API accepts ──
  const handleSave = async () => {
    try {
      setSaving(true)

      const payload = {
        hero_title:    data.hero.hero_title       || "Default Hero Title",
        hero_subtitle: data.hero.hero_subtitle    || "Subtitle",
        hero_image:    data.hero.hero_image   || null,
        banner_text:   data.hero.banner_text       || "Default Banner Text",
        banner_image:  data.hero.banner_image || null,
        stats_title:   data.hero.stats_title      || "Default Stats Title",
        stats_value:   data.hero.stats_value || "Default Stats Value",
      }

      console.log("📤 Sending payload:", payload)

      if (homepageId) {
        await updateHomepageData(homepageId, payload)
        console.log("✅ Updated! ID:", homepageId)
      } else {
        const created = await createHomepageData(payload)
        setHomepageId(created.id)
        console.log("✅ Created! ID:", created.id)
      }

      toast.success("Homepage saved successfully! ✅")

    } catch (err) {
      console.error("Save error:", err)
      console.error("Django error:", err.response?.data)
}finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    await fetchData()
    toast("Reset to saved version!", { icon: "🔄" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading homepage data...</p>
          <p className="text-gray-400 text-xs mt-1">Connecting to backend...</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homepage Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit website content without touching any code</p>
        </div>

        <div className="flex items-center gap-3">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs max-w-xs">
              ⚠️ {error}
            </div>
          )}

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} /> Preview Site
          </a>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {saving
              ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
              : <><Save size={15} /> Save Changes</>
            }
          </button>
        </div>
      </div>

      {/* INFO BANNER */}
      {/* <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-start gap-3">
        <span>ℹ️</span>
        <div>
          <p className="text-sm font-semibold text-amber-800">Fields currently saving to database:</p>
          <p className="text-xs text-amber-700 mt-0.5">
            Hero Title · Hero Subtitle · Hero Image · Badge Text · Banner Image · Stats Title · Stats Value
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            Services, Projects, Testimonials & Contact → ask Taaransh to add these to the API model.
          </p>
        </div>
      </div> */}

      {/* TABS */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit flex-wrap">
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