// ─────────────────────────────────────────────────────────────────
// AboutEditor.jsx — Maps to #about section in dstp-landing.html
//
// [WEBSITE] Field → HTML element mapping:
//   section_label   → .section-label div ("About DSTP Technology")
//   title           → h2 plain text ("Where Intelligence Meets")
//   title_highlight → h2 <span style="color:var(--coral)"> ("Engineering")
//   para1           → first <p> paragraph in the left column
//   para2           → second <p> paragraph in the left column
//   skills[]        → progress bars (label + percent) on the left side
//   pillars[]       → 4 pillar cards in the 2x2 grid on the right side
//
// [BACKEND] Add: about = models.JSONField(default=dict, blank=True)
//   PATCH /api/v1/homepage/homepage/:id/ → { about: { ... } }
// ─────────────────────────────────────────────────────────────────

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

const Field = ({ label, value, onChange, hint, placeholder, multiline }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
    {multiline ? (
      <textarea value={value || ""} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder || ""}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none" />
    ) : (
      <input value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
    )}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

function AboutEditor({ data, onChange, onSkillsChange, onPillarsChange }) {

  const updateSkill = (id, field, val) =>
    onSkillsChange(data.skills.map(s => s.id === id ? { ...s, [field]: field === "percent" ? Number(val) : val } : s))

  const addSkill = () => {
    if (data.skills.length >= 8) { alert("Maximum 8 skill bars."); return }
    onSkillsChange([...data.skills, { id: Date.now(), label: "New Skill", percent: 80 }])
  }

  const removeSkill = (id) => {
    if (data.skills.length <= 1) { alert("Need at least 1 skill."); return }
    onSkillsChange(data.skills.filter(s => s.id !== id))
  }

  const updatePillar = (id, field, val) =>
    onPillarsChange(data.pillars.map(p => p.id === id ? { ...p, [field]: val } : p))

  return (
    <div className="space-y-5">

      {/* Heading */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">🏢 About — Section Heading</h2>
          <p className="text-xs text-gray-400 mt-0.5">Top label + h2 heading on the left side of #about</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section Label" value={data.section_label} onChange={v => onChange("section_label", v)}
            placeholder="About DSTP Technology"
            hint='Small coral label above the h2 — e.g. "About DSTP Technology"' />
          <Field label="Title (plain text)" value={data.title} onChange={v => onChange("title", v)}
            placeholder="Where Intelligence Meets"
            hint="First part of the h2 heading — plain dark color" />
          <Field label="Title Highlight (coral color)" value={data.title_highlight} onChange={v => onChange("title_highlight", v)}
            placeholder="Engineering"
            hint='Second part of h2 — shown in coral (#E76F6F), e.g. "Engineering"' />
        </div>
      </div>

      {/* Paragraphs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">📝 About — Description Paragraphs</h2>
          <p className="text-xs text-gray-400 mt-0.5">Two paragraphs shown on the left below the heading</p>
        </div>
        <div className="p-6 space-y-5">
          <Field label="Paragraph 1" value={data.para1} onChange={v => onChange("para1", v)} multiline
            placeholder="DSTP Technology Private Limited is a premier Indian IT solutions company…" />
          <Field label="Paragraph 2" value={data.para2} onChange={v => onChange("para2", v)} multiline
            placeholder="From AI-powered analytics platforms to IoT device ecosystems…" />
        </div>
      </div>

      {/* Skill Bars */}
      {/* [WEBSITE] These render as animated progress bars on the left side of the about section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-700">📊 About — Skill / Expertise Bars</h2>
            <p className="text-xs text-gray-400 mt-0.5">Animated progress bars shown below the paragraphs — label + percentage</p>
          </div>
          <button onClick={addSkill} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
            <Plus size={13} /> Add Bar
          </button>
        </div>
        <div className="p-6 space-y-4">
          {data.skills.map(skill => (
            <div key={skill.id} className="flex items-center gap-3">
              <div className="flex-1">
                <input value={skill.label || ""} onChange={e => updateSkill(skill.id, "label", e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-400 mb-2"
                  placeholder="Skill label" />
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${skill.percent}%`, background: "linear-gradient(to right, #E76F6F, #4F8F84)" }} />
                  </div>
                  <input type="number" min={0} max={100} value={skill.percent || 0}
                    onChange={e => updateSkill(skill.id, "percent", e.target.value)}
                    className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center outline-none focus:border-blue-400" />
                  <span className="text-xs text-red-400 font-medium" style={{ color: "#E76F6F" }}>{skill.percent}%</span>
                </div>
              </div>
              {data.skills.length > 1 && (
                <button onClick={() => removeSkill(skill.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Cards */}
      {/* [WEBSITE] These render as the 4 feature cards in the 2x2 grid on the right side */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">🃏 About — Pillar Cards (2×2 grid, right side)</h2>
          <p className="text-xs text-gray-400 mt-0.5">4 feature cards shown on the right side of the about section</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.pillars.map(pillar => (
            <div key={pillar.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: pillar.color === "coral" ? "rgba(231,111,111,0.12)" : "rgba(79,143,132,0.12)", color: pillar.color === "coral" ? "#E76F6F" : "#4F8F84" }}>
                  {pillar.color === "coral" ? "C" : "T"}
                </div>
                <div className="flex-1">
                  <input value={pillar.title || ""} onChange={e => updatePillar(pillar.id, "title", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-blue-400"
                    placeholder="Pillar title" />
                </div>
                <select value={pillar.color || "coral"} onChange={e => updatePillar(pillar.id, "color", e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none bg-white focus:border-blue-400">
                  <option value="coral">Coral</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
              <textarea value={pillar.desc || ""} onChange={e => updatePillar(pillar.id, "desc", e.target.value)}
                rows={2} placeholder="Brief description..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-400 resize-none" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AboutEditor