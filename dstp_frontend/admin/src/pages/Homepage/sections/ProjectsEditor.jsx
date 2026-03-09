import { useState } from "react"
import { Plus, Trash2, Pencil, X, Save } from "lucide-react"
import toast from "react-hot-toast"

const statusColors = {
  Completed: "bg-green-100 text-green-600",
  Ongoing:   "bg-blue-100 text-blue-600",
  Paused:    "bg-yellow-100 text-yellow-600",
}

function ProjectsEditor({ data, onChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState(null)
  const [form, setForm]         = useState({})

  const handleAdd = () => {
    setEditId(null)
    setForm({ title: "", client: "", category: "", status: "Ongoing", image: "" })
    setShowForm(true)
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ ...item })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.title) { toast.error("Title required!"); return }
    if (editId) {
      onChange(data.map(p => p.id === editId ? { ...p, ...form } : p))
      toast.success("Project updated!")
    } else {
      onChange([...data, { ...form, id: Date.now() }])
      toast.success("Project added!")
    }
    setShowForm(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-700">🗂️ Projects Section</h2>
          <p className="text-xs text-gray-400 mt-0.5">Featured projects on homepage</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold">
          <Plus size={15} /> Add Project
        </button>
      </div>

      <div className="p-6 space-y-3">
        {data.map(project => (
          <div key={project.id} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="flex-1">
              <p className="font-semibold text-gray-700 text-sm">{project.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{project.client} · {project.category}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600">
                <Pencil size={13} />
              </button>
              <button onClick={() => { onChange(data.filter(p => p.id !== project.id)); toast.success("Removed!") }} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">{editId ? "Edit Project" : "Add Project"}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Project Title", key: "title",    placeholder: "e.g. Smart City Platform" },
                { label: "Client Name",   key: "client",   placeholder: "e.g. Mumbai Corp"         },
                { label: "Category",      key: "category", placeholder: "e.g. IoT, AI, Cloud"      },
                { label: "Image URL",     key: "image",    placeholder: "https://..."               },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
                  <input value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 bg-white">
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>Paused</option>
                </select>
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

export default ProjectsEditor