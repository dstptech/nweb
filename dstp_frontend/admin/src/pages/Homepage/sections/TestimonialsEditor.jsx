// ─────────────────────────────────────────────────────────────────
// TestimonialsEditor.jsx — Maps to #testimonials section
//
// [WEBSITE] Each item renders as a .testimonial-card:
//   name   → client name (font-bold)
//   role   → role/company below name
//   review → testimonial text in italic
//   rating → star count (1–5) displayed as ★ icons
//
// [BACKEND] Add: testimonials = models.JSONField(default=list, blank=True)
//   PATCH /api/v1/homepage/homepage/:id/ → { testimonials: [...] }
// ─────────────────────────────────────────────────────────────────

import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save, Star } from "lucide-react"
import toast from "react-hot-toast"

function TestimonialsEditor({ data, onChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editId,   setEditId]   = useState(null)
  const [form,     setForm]     = useState({})

  const openAdd  = () => { setEditId(null); setForm({ name: "", role: "", review: "", rating: 5 }); setShowForm(true) }
  const openEdit = (item) => { setEditId(item.id); setForm({ ...item }); setShowForm(true) }
  const close    = () => { setShowForm(false); setForm({}); setEditId(null) }

  const save = () => {
    if (!form.name?.trim())   { toast.error("Name required!"); return }
    if (!form.review?.trim()) { toast.error("Review required!"); return }
    if (editId) onChange(data.map(t => t.id === editId ? { ...t, ...form } : t))
    else        onChange([...data, { ...form, id: Date.now() }])
    toast.success(editId ? "Updated!" : "Testimonial added!")
    close()
  }

  const remove = (id) => {
    if (!window.confirm("Remove this testimonial?")) return
    onChange(data.filter(t => t.id !== id))
    toast.success("Removed!")
  }

  const Stars = ({ rating, interactive, onRate }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button" onClick={interactive ? () => onRate(s) : undefined}
          className={interactive ? "cursor-pointer" : "cursor-default pointer-events-none"}>
          <Star size={interactive ? 22 : 14} className={s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
        </button>
      ))}
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">💬 Testimonials Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">{data.length} testimonial{data.length !== 1 ? "s" : ""} — renders as .testimonial-card grid</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
          <Plus size={15}/> Add Review
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-sm font-medium">No testimonials yet</p>
          </div>
        ) : data.map(t => (
          <div key={t.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <Stars rating={t.rating || 5} />
            <p className="text-sm text-gray-600 italic mt-3 mb-3 line-clamp-3">"{t.review}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"><Pencil size={13}/></button>
                <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && close()}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={close} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16}/></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Client Name *", key: "name",   ph: "e.g. Rajesh Kumar"      },
                { label: "Role / Company",key: "role",   ph: "e.g. CTO, FinServe India" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
                  <input value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    autoFocus={f.key === "name"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    placeholder={f.ph} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Review *</label>
                <textarea value={form.review || ""} onChange={e => setForm({ ...form, review: e.target.value })} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="What did the client say?" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}>
                      <Star size={24} className={s <= (form.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={close} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2">
                <Save size={15}/> {editId ? "Update" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialsEditor