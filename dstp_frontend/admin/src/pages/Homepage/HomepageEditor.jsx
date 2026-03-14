import { useState, useEffect, useCallback } from "react"
import { Save, RotateCcw, Eye, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"
import { getHomepageData, updateHomepageData, createHomepageData } from "../../api/homepageApi"

import HeroEditor         from "./sections/HeroEditor"
import AboutEditor        from "./sections/AboutEditor"
import ServicesEditor     from "./sections/ServicesEditor"
import TechStackEditor    from "./sections/TechStackEditor"
import ProjectsEditor     from "./sections/ProjectsEditor"
import TestimonialsEditor from "./sections/TestimonialsEditor"
import ContactEditor      from "./sections/ContactEditor"

// ─────────────────────────────────────────────────────────────────
// TAB DEFINITIONS
// Each tab maps to one section of dstp-landing.html
// id → matches state key, liveInDB → already saved to Django model
//
// [BACKEND] Hero fields are already in HomepageModel (flat fields).
// All other sections need JSONField added to the model before they save.
// ─────────────────────────────────────────────────────────────────
const tabs = [
  { id: "hero",         label: "Hero",         emoji: "🦸", liveInDB: true  },
  { id: "about",        label: "About",        emoji: "🏢", liveInDB: false },
  { id: "services",     label: "Services",     emoji: "🛠️", liveInDB: false },
  { id: "tech",         label: "Tech Stack",   emoji: "⚙️", liveInDB: false },
  { id: "projects",     label: "Projects",     emoji: "🗂️", liveInDB: false },
  { id: "testimonials", label: "Testimonials", emoji: "💬", liveInDB: false },
  { id: "contact",      label: "Contact/CTA",  emoji: "📞", liveInDB: false },
]

// ─────────────────────────────────────────────────────────────────
// DEFAULT DATA
// Pre-filled with the actual content from dstp-landing.html
// so the admin sees real data, not blank fields.
// ─────────────────────────────────────────────────────────────────
const defaultData = {
  hero: {
    badge_text:         "Enterprise IT Solutions",
    title_line1:        "Engineering the Future",
    title_coral:        "Smart Software",
    title_teal:         "Intelligent Systems",
    subtitle:           "DSTP Technology delivers enterprise-grade AI, data engineering, IoT, and cloud solutions — built to scale, designed to transform.",
    btn_primary_text:   "Explore Services",
    btn_primary_link:   "#services",
    btn_secondary_text: "Contact Us",
    btn_secondary_link: "#contact",
    badge1: "AI & Data Driven",
    badge2: "100+ Projects",
    badge3: "Global Delivery",
  },
  about: {
    section_label:    "About DSTP Technology",
    title:            "Where Intelligence Meets",
    title_highlight:  "Engineering",
    para1: "DSTP Technology Private Limited is a premier Indian IT solutions company dedicated to delivering intelligent, scalable, and future-ready technology solutions. We bridge the gap between cutting-edge research and real-world enterprise deployments.",
    para2: "From AI-powered analytics platforms to IoT device ecosystems and enterprise software, our multidisciplinary teams craft solutions that drive measurable business impact for clients across industries.",
    skills: [
      { id: 1, label: "Artificial Intelligence & ML",  percent: 95 },
      { id: 2, label: "Data Engineering & Analytics",  percent: 90 },
      { id: 3, label: "Smart Devices & IoT",           percent: 85 },
      { id: 4, label: "Enterprise Software",           percent: 92 },
    ],
    pillars: [
      { id: 1, title: "AI & Machine Learning",  desc: "Intelligent models that learn and adapt to your data landscape.",          color: "coral" },
      { id: 2, title: "Data Engineering",       desc: "Scalable pipelines and analytics that turn raw data into insights.",      color: "teal"  },
      { id: 3, title: "Smart Devices / IoT",    desc: "Connected hardware and firmware that bridge the physical-digital world.", color: "teal"  },
      { id: 4, title: "Enterprise Software",    desc: "Custom platforms and ERPs engineered for growth at scale.",               color: "coral" },
    ],
  },
  services: [
    { id: 1, title: "AI & Machine Learning",          desc: "Custom ML models, NLP pipelines, computer vision systems, and predictive analytics solutions built for enterprise scale.",   color: "coral"  },
    { id: 2, title: "Data Engineering & Analytics",   desc: "End-to-end data pipelines, warehousing, real-time streaming, and BI dashboards that empower data-driven decisions.",         color: "teal"   },
    { id: 3, title: "Cloud & DevOps Engineering",     desc: "Cloud-native architectures, CI/CD pipelines, Kubernetes orchestration, and infrastructure automation on AWS, GCP & Azure.",  color: "purple" },
    { id: 4, title: "Web & Mobile Development",       desc: "Performant, pixel-perfect web apps and cross-platform mobile applications using React, Next.js, Flutter, and React Native.",  color: "amber"  },
    { id: 5, title: "IoT & Intelligent Devices",      desc: "Smart hardware design, embedded systems, sensor networks, and industrial IoT platforms with real-time monitoring capabilities.", color: "coral" },
    { id: 6, title: "Enterprise Software Solutions",  desc: "Bespoke ERP, CRM, and workflow automation platforms engineered to streamline operations and maximize productivity.",            color: "teal"   },
  ],
  tech_stack: [
    { id: 1, name: "Python",     color: "#3776ab" },
    { id: 2, name: "React",      color: "#61dafb" },
    { id: 3, name: "Kubernetes", color: "#326CE5" },
    { id: 4, name: "Docker",     color: "#2496ED" },
    { id: 5, name: "AWS",        color: "#FF9900" },
    { id: 6, name: "PostgreSQL", color: "#336791" },
    { id: 7, name: "TensorFlow", color: "#FF6F00" },
    { id: 8, name: "FastAPI",    color: "#009688" },
  ],
  projects: [
    { id: 1, badge: "AI Platform",      title: "AI News Intelligence Platform",  desc: "Real-time news aggregation with NLP-driven sentiment analysis, entity extraction, and trend forecasting dashboards.", tags: ["Python","FastAPI","TensorFlow","React"], bg: "#1a2535" },
    { id: 2, badge: "Data Engineering", title: "Real-Time Data Pipeline",        desc: "Enterprise-scale streaming pipeline processing millions of events per second with anomaly detection.",               tags: ["Kafka","Spark","GCP","PostgreSQL"],     bg: "#0f2a28" },
    { id: 3, badge: "IoT Platform",     title: "Smart Manufacturing IoT Suite",  desc: "Industrial IoT system connecting 500+ sensors across factories with predictive maintenance AI.",                     tags: ["MQTT","Python","React","AWS IoT"],      bg: "#1a1525" },
  ],
  testimonials: [
    { id: 1, name: "Rajesh Kumar",  role: "CTO, FinServe India",       review: "DSTP's AI platform transformed our fraud detection rates — a 40% improvement in 3 months.", rating: 5 },
    { id: 2, name: "Priya Sharma",  role: "VP Engineering, RetailMax", review: "The data pipeline they built handles 10M+ events daily without a hitch. Exceptional engineering.", rating: 5 },
    { id: 3, name: "Arjun Mehta",   role: "Founder, SmartBuild",       review: "Their IoT suite is running 24/7 across our 8 factories. Rock-solid and feature-rich.", rating: 5 },
  ],
  contact: {
    cta_title:    "Ready to Build the Future?",
    cta_subtitle: "Let's engineer something extraordinary together.",
    btn_text:     "Start a Project",
    btn_link:     "#contact",
    email:        "info@dstp.com",
    phone:        "+91 (India)",
    address:      "India",
    bg_from:      "#1a2535",
    bg_to:        "#1e3a38",
  },
}

function mapApiToState(r) {
  return {
    hero: {
      badge_text:         r.banner_image       || defaultData.hero.badge_text,
      title_line1:        r.hero_title         || defaultData.hero.title_line1,
      title_coral:        r.hero_subtitle      || defaultData.hero.title_coral,
      title_teal:         r.banner_text        || defaultData.hero.title_teal,
      subtitle:           r.hero_image         || defaultData.hero.subtitle,
      btn_primary_text:   r.stats_title        || defaultData.hero.btn_primary_text,
      btn_primary_link:   r.stats_value        || defaultData.hero.btn_primary_link,
      btn_secondary_text: defaultData.hero.btn_secondary_text,
      btn_secondary_link: defaultData.hero.btn_secondary_link,
      badge1: defaultData.hero.badge1,
      badge2: defaultData.hero.badge2,
      badge3: defaultData.hero.badge3,
    },
    about:        r.about        || defaultData.about,
    services:     r.services     || defaultData.services,
    tech_stack:   r.tech_stack   || defaultData.tech_stack,
    projects:     r.projects     || defaultData.projects,
    testimonials: r.testimonials || defaultData.testimonials,
    contact:      r.contact      || defaultData.contact,
  }
}

function mapStateToPayload(data) {
  return {
    // ── Text fields — safe to send as strings ────────────────────
    hero_title:    data.hero.title_line1      || "",
    hero_subtitle: data.hero.title_coral      || "",
    banner_text:   data.hero.title_teal       || "",
    stats_title:   data.hero.btn_primary_text || "",
    stats_value:   data.hero.btn_primary_link || "",

    // ── hero_image & banner_image intentionally EXCLUDED ─────────
    // [BACKEND] hero_image and banner_image are ImageField in Django.
    // Sending a plain string to an ImageField causes:
    //   "The submitted data was not a file. Check the encoding type on the form."
    // To update these images, implement a separate file upload endpoint:
    //   POST /api/v1/homepage/upload-image/
    //   Content-Type: multipart/form-data
    //   Body: { field: "hero_image", file: <File> }
    // Then store the returned URL and send it back as a URLField, not ImageField.
    // OR: change hero_image and banner_image to URLField in the Django model
    //     so admins can paste image URLs directly instead of uploading files.

    // ── Uncomment when backend adds JSONFields to HomepageModel ──
    // about:        data.about,
    // services:     data.services,
    // tech_stack:   data.tech_stack,
    // projects:     data.projects,
    // testimonials: data.testimonials,
    // contact:      data.contact,
  }
}

function HomepageEditor() {
  const [activeTab,  setActiveTab]  = useState("hero")
  const [data,       setData]       = useState(null)
  const [homepageId, setHomepageId] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [error,      setError]      = useState(null)
  const [isDirty,    setIsDirty]    = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); setError(null)
      const response = await getHomepageData()
      if (response) { setHomepageId(response.id); setData(mapApiToState(response)) }
      else           { setData(defaultData); setHomepageId(null) }
      setIsDirty(false)
    } catch (err) {
      if (err.code === "ERR_NETWORK")        setError("Cannot connect to backend. Is Django running on port 8000?")
      else if (err.response?.status === 401) setError("Not authorized. Please log in first.")
      else if (err.response?.status === 404) setError("API endpoint not found.")
      else if (err.response?.status === 500) setError("Backend server error.")
      else                                   setError("Something went wrong. Check the console.")
      setData(defaultData)
    } finally { setLoading(false) }
  }, [])

  const updateSection = useCallback((section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setIsDirty(true)
  }, [])

  const updateArray = useCallback((section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
    setIsDirty(true)
  }, [])

  const updateNestedArray = useCallback((section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
    setIsDirty(true)
  }, [])

  const handleSave = async () => {
    if (!data.hero.title_line1?.trim()) { toast.error("Hero Title cannot be empty!"); setActiveTab("hero"); return }
    try {
      setSaving(true)
      const payload = mapStateToPayload(data)
      if (homepageId) { await updateHomepageData(homepageId, payload) }
      else { const c = await createHomepageData(payload); setHomepageId(c.id) }
      setIsDirty(false)
      toast.success("Homepage saved! ✅")
    } catch (err) {
      const e = err.response?.data
      if (e) { const first = Object.values(e)[0]; toast.error(`Save failed: ${Array.isArray(first) ? first[0] : first}`) }
      else toast.error("Failed to save. Please try again.")
    } finally { setSaving(false) }
  }

  const handleReset = async () => {
    if (isDirty && !window.confirm("Reset to last saved version? Unsaved changes will be lost.")) return
    await fetchData(); toast("Reset to saved version", { icon: "🔄" })
  }

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading homepage data...</p>
      </div>
    </div>
  )
  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homepage Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit every section of the DSTP website without touching code</p>
          {isDirty && (
            <p className="text-xs text-amber-500 mt-1 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> You have unsaved changes
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs max-w-xs">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <a href={import.meta.env.VITE_WEBSITE_URL || "http://localhost:3000"} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Eye size={16} /> Preview Site
          </a>
          <button onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <RotateCcw size={16} /> Reset
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all">
            {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* API status */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
        <p className="text-xs font-semibold text-blue-700 mb-2">API Integration Status</p>
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => (
            <span key={t.id} className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${t.liveInDB ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {t.liveInDB ? <CheckCircle2 size={11}/> : <AlertCircle size={11}/>}
              {t.label}{!t.liveInDB && " (needs backend)"}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit flex-wrap">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "bg-white text-blue-600 shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"}`}>
            <span>{tab.emoji}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "hero"         && <HeroEditor         data={data.hero}         onChange={(f,v) => updateSection("hero",f,v)} />}
        {activeTab === "about"        && <AboutEditor        data={data.about}        onChange={(f,v) => updateSection("about",f,v)} onSkillsChange={v => updateNestedArray("about","skills",v)} onPillarsChange={v => updateNestedArray("about","pillars",v)} />}
        {activeTab === "services"     && <ServicesEditor     data={data.services}     onChange={v => updateArray("services",v)} />}
        {activeTab === "tech"         && <TechStackEditor    data={data.tech_stack}   onChange={v => updateArray("tech_stack",v)} />}
        {activeTab === "projects"     && <ProjectsEditor     data={data.projects}     onChange={v => updateArray("projects",v)} />}
        {activeTab === "testimonials" && <TestimonialsEditor data={data.testimonials} onChange={v => updateArray("testimonials",v)} />}
        {activeTab === "contact"      && <ContactEditor      data={data.contact}      onChange={(f,v) => updateSection("contact",f,v)} />}
      </div>
    </div>
  )
}

export default HomepageEditor