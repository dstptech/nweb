// ─────────────────────────────────────────────────────────────────
// ProjectsEditor.jsx — Maps to #portfolio section in dstp-landing.html
//
// [WEBSITE] Each project renders as a .project-card:
//   badge → small colored label top-left (e.g. "AI Platform")
//   title → h3 inside the card (white text)
//   desc  → <p> below title (gray, light weight)
//   tags  → tech stack chips at the bottom (shown on hover overlay)
//   bg    → CSS background color of the card (dark hex, e.g. "#1a2535")
//
// [BACKEND] Add: projects = models.JSONField(default=list, blank=True)
//   PATCH /api/v1/homepage/homepage/:id/ → { projects: [...] }
// ─────────────────────────────────────────────────────────────────

import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save } from "lucide-react"
import toast from "react-hot-toast"

function ProjectsEditor({ data, onChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editId,   setEditId]   = useState(null)
  const [form,     setForm]     = useState({})
  const [tagInput, setTagInput] = useState("")

  const openAdd  = () => { setEditId(null); setForm({ badge: "", title: "", desc: "", tags: [], bg: "#1a2535" }); setTagInput(""); setShowForm(true) }
  const openEdit = (item) => { setEditId(item.id); setForm({ ...item, tags: [...(item.tags || [])] }); setTagInput(""); setShowForm(true) }
  const close    = () => { setShowForm(false); setForm({}); setEditId(null) }

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    if ((form.tags || []).includes(t)) { toast.error("Tag already exists"); return }
    setForm({ ...form, tags: [...(form.tags || []), t] })
    setTagInput("")
  }

  const removeTag = (tag) => setForm({ ...form, tags: (form.tags || []).filter(t => t !== tag) })

  const save = () => {
    if (!form.title?.trim()) { toast.error("Title required!"); return }
    if (editId) onChange(data.map(p => p.id === editId ? { ...p, ...form } : p))
    else        onChange([...data, { ...form, id: Date.now() }])
    toast.success(editId ? "Project updated!" : "Project added!")
    close()
  }

  const remove = (id) => {
    if (!window.confirm("Remove this project?")) return
    onChange(data.filter(p => p.id !== id))
    toast.success("Removed!")
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">🗂️ Projects / Portfolio Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">{data.length} project{data.length !== 1 ? "s" : ""} — renders as .project-card grid in #portfolio</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
          <Plus size={15}/> Add Project
        </button>
      </div>

      <div className="p-6 space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🗂️</div>
            <p className="text-sm font-medium">No projects added yet</p>
          </div>
        ) : data.map(p => (
          <div key={p.id} className="flex items-start gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
            {/* Dark bg preview swatch */}
            <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ background: p.bg || "#1a2535" }}>
              {p.badge?.charAt(0) || "P"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(231,111,111,0.15)", color: "#E76F6F" }}>
                  {p.badge || "No badge"}
                </span>
              </div>
              <p className="font-semibold text-sm text-gray-700 truncate">{p.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{p.desc}</p>
              {(p.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"><Pencil size={13}/></button>
              <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && close()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Project" : "Add Project"}</h3>
              <button onClick={close} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16}/></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Badge Label</label>
                  <input value={form.badge || ""} onChange={e => setForm({ ...form, badge: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                    placeholder="e.g. AI Platform" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Card Background Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={form.bg || "#1a2535"} onChange={e => setForm({ ...form, bg: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                    <span className="text-xs text-gray-400 font-mono">{form.bg || "#1a2535"}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Project Title *</label>
                <input value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  placeholder="e.g. AI News Intelligence Platform" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
                <textarea value={form.desc || ""} onChange={e => setForm({ ...form, desc: e.target.value })} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="Brief project description" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Tech Tags</label>
                <div className="flex gap-2 mb-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="e.g. Python, React, FastAPI (press Enter)" />
                  <button onClick={addTag} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-600 transition-colors">
                    Add
                  </button>
                </div>
                {(form.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500 transition-colors">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={close} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2">
                <Save size={15}/> {editId ? "Update" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsEditor