// ─────────────────────────────────────────────────────────────────
// TechStackEditor.jsx — Maps to #tech section in dstp-landing.html
// THIS IS A NEW SECTION — was not in the previous HomepageEditor.
//
// [WEBSITE] Each tech item renders as a .tech-chip in the grid:
//   name  → chip label text (e.g. "Python", "React")
//   color → hex color used for the icon background tint + SVG fill
//           The website renders a small SVG icon per technology.
//
// [BACKEND] Add: tech_stack = models.JSONField(default=list, blank=True)
//   PATCH /api/v1/homepage/homepage/:id/ → { tech_stack: [...] }
//
// [FRONTEND/WEBSITE] When rendering tech chips on the website:
//   Loop over tech_stack array.
//   For each item, render a .tech-chip div with:
//     - A colored SVG icon (keyed to item.name or item.color)
//     - item.name as the label
//   The SVG icons are hardcoded in the HTML by name. If you add a new
//   tech, you'll need to add its SVG to the website's chip renderer.
// ─────────────────────────────────────────────────────────────────

import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save } from "lucide-react"
import toast from "react-hot-toast"

function TechStackEditor({ data, onChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editId,   setEditId]   = useState(null)
  const [form,     setForm]     = useState({})

  const openAdd  = () => { setEditId(null); setForm({ name: "", color: "#3b82f6" }); setShowForm(true) }
  const openEdit = (item) => { setEditId(item.id); setForm({ ...item }); setShowForm(true) }
  const close    = () => { setShowForm(false); setForm({}); setEditId(null) }

  const save = () => {
    if (!form.name?.trim()) { toast.error("Technology name required!"); return }
    if (editId) onChange(data.map(t => t.id === editId ? { ...t, ...form } : t))
    else        onChange([...data, { ...form, id: Date.now() }])
    toast.success(editId ? "Updated!" : "Technology added!")
    close()
  }

  const remove = (id) => {
    if (!window.confirm("Remove this technology?")) return
    onChange(data.filter(t => t.id !== id))
    toast.success("Removed!")
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">⚙️ Technology Stack Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {data.length} tech chip{data.length !== 1 ? "s" : ""} — renders as .tech-chip grid in #tech
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
          <Plus size={15} /> Add Technology
        </button>
      </div>

      {/* Grid of chips */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.length === 0 ? (
          <div className="col-span-4 text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">⚙️</div>
            <p className="text-sm font-medium">No technologies added yet</p>
          </div>
        ) : data.map(t => (
          <div key={t.id} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:shadow-sm transition-shadow group relative">
            {/* Color dot preview */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: t.color + "22", color: t.color, border: `1px solid ${t.color}33` }}>
              {t.name?.charAt(0) || "T"}
            </div>
            <span className="text-sm font-medium text-gray-700 flex-1 truncate">{t.name}</span>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => openEdit(t)} className="p-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-600"><Pencil size={11}/></button>
              <button onClick={() => remove(t.id)} className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={11}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* Note for website dev */}
      <div className="mx-6 mb-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="text-xs text-amber-700 font-semibold mb-1">Website Developer Note</p>
        <p className="text-xs text-amber-600">
          Each chip uses a custom SVG icon keyed to the technology name. When adding a new technology here,
          also add its SVG icon to the <code className="bg-amber-100 px-1 rounded">techIcons</code> map in the website's Tech section component.
          The <code className="bg-amber-100 px-1 rounded">color</code> field controls the icon tint.
        </p>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && close()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Technology" : "Add Technology"}</h3>
              <button onClick={close} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Technology Name *</label>
                <input value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  placeholder="e.g. Python, React, Docker" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Brand Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={form.color || "#3b82f6"} onChange={e => setForm({ ...form, color: e.target.value })}
                    className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                  <span className="text-xs text-gray-400 font-mono">{form.color || "#3b82f6"}</span>
                  <span className="text-xs text-gray-400">Used for icon background tint</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={close} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2">
                <Save size={15}/> {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TechStackEditor