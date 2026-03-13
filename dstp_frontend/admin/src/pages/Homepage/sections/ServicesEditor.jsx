import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save } from "lucide-react"
import toast from "react-hot-toast"

function ServicesEditor({ data, onChange }) {
  const [editId, setEditId]   = useState(null)
  const [form, setForm]       = useState({})
  const [showForm, setShowForm] = useState(false)

  const handleAdd = () => {
    setEditId(null)
    setForm({ title: "", description: "", icon: "🔧", color: "#3b82f6" })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ ...item })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.title) { toast.error("Title is required!"); return }
    if (editId) {
      onChange(data.map(s => s.id === editId ? { ...s, ...form } : s))
      toast.success("Service updated!")
    } else {
      onChange([...data, { ...form, id: Date.now() }])
      toast.success("Service added!")
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    onChange(data.filter(s => s.id !== id))
    toast.success("Service removed!")
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">🛠️ Services Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage your service cards</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(service => (
          <div
            key={service.id}
            className="border border-gray-100 rounded-xl p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            {/* Icon with color */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: service.color + "22" }}
            >
              {service.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-700 text-sm">{service.title}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{service.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleEdit(service)}
                className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  placeholder="e.g. Cloud Solutions"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
                  placeholder="Brief description of the service"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Icon (emoji)</label>
                  <input
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                    placeholder="🔧"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Card Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.color}
                      onChange={e => setForm({ ...form, color: e.target.value })}
                      className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400 font-mono">{form.color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
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

export default ServicesEditor