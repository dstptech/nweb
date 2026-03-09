import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save, Star } from "lucide-react"
import toast from "react-hot-toast"

function TestimonialsEditor({ data, onChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState(null)
  const [form, setForm]         = useState({})

  const handleAdd = () => {
    setEditId(null)
    setForm({ name: "", role: "", review: "", rating: 5, avatar: "" })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ ...item })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.review) { toast.error("Name and review required!"); return }
    if (editId) {
      onChange(data.map(t => t.id === editId ? { ...t, ...form } : t))
      toast.success("Testimonial updated!")
    } else {
      onChange([...data, { ...form, id: Date.now() }])
      toast.success("Testimonial added!")
    }
    setShowForm(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">💬 Testimonials Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">Client reviews and ratings</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold">
          <Plus size={15} /> Add Review
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(t => (
          <div key={t.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} className={s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
              ))}
            </div>
            <p className="text-sm text-gray-600 italic mb-3">"{t.review}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"><Pencil size={13} /></button>
                <button onClick={() => { onChange(data.filter(x => x.id !== t.id)); toast.success("Removed!") }} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Client Name", key: "name",   placeholder: "e.g. Raj Sharma"         },
                { label: "Role",        key: "role",   placeholder: "e.g. CTO, TechCorp"       },
                { label: "Avatar URL",  key: "avatar", placeholder: "https://..."               },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
                  <input value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Review</label>
                <textarea value={form.review || ""} onChange={e => setForm({ ...form, review: e.target.value })}
                  rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="What did the client say?" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setForm({ ...form, rating: s })}>
                      <Star size={24} className={s <= (form.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2">
                <Save size={15} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialsEditor