import { useState } from "react"
import { Plus, Search, Pencil, Trash2, X, Check } from "lucide-react"
import toast from "react-hot-toast"

// ── MOCK DATA ──────────────────────────────────────
// Later you'll replace this with real API calls
const initialServices = [
  { id: 1, name: "Cloud Infrastructure",  category: "Cloud",     status: "Active", created: "Jan 12, 2025" },
  { id: 2, name: "Cybersecurity Audit",   category: "Security",  status: "Active", created: "Feb 3, 2025"  },
  { id: 3, name: "Data Analytics",        category: "Analytics", status: "Draft",  created: "Feb 18, 2025" },
  { id: 4, name: "IT Consulting",         category: "Consulting",status: "Active", created: "Mar 1, 2025"  },
  { id: 5, name: "AI & ML Solutions",     category: "AI & ML",   status: "Active", created: "Mar 10, 2025" },
]

// Empty form state — used when creating new service
const emptyForm = { name: "", category: "", status: "Active" }

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-600",
  Draft:  "bg-yellow-100 text-yellow-600",
  Inactive: "bg-red-100 text-red-500",
}

function ServicesList() {
  // ── STATE ──────────────────────────────────────
  // services = the list of all services
  const [services, setServices]       = useState(initialServices)
  // search = what user typed in search box
  const [search, setSearch]           = useState("")
  // showModal = is the add/edit form open?
  const [showModal, setShowModal]     = useState(false)
  // editingService = which service are we editing? null = creating new
  const [editingService, setEditing]  = useState(null)
  // form = current values in the form inputs
  const [form, setForm]               = useState(emptyForm)
  // deleteId = which service id is being deleted?
  const [deleteId, setDeleteId]       = useState(null)

  // ── FILTER ─────────────────────────────────────
  // Filter services based on search input
  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  // ── HANDLERS ───────────────────────────────────

  // Open modal for creating new service
  const handleAdd = () => {
    setEditing(null)       // no service being edited
    setForm(emptyForm)     // clear the form
    setShowModal(true)     // open modal
  }

  // Open modal for editing existing service
  const handleEdit = (service) => {
    setEditing(service)    // remember which service we're editing
    setForm({              // pre-fill form with service data
      name: service.name,
      category: service.category,
      status: service.status
    })
    setShowModal(true)     // open modal
  }

  // Save — either create or update
  const handleSave = () => {
    // Validation — don't save if name or category is empty
    if (!form.name || !form.category) {
      toast.error("Please fill in all fields!")
      return
    }

    if (editingService) {
      // UPDATE existing service
      setServices(services.map(s =>
        s.id === editingService.id
          ? { ...s, ...form }  // merge old data with new form data
          : s
      ))
      toast.success("Service updated successfully!")
    } else {
      // CREATE new service
      const newService = {
        id: services.length + 1,   // simple id generation
        ...form,
        created: new Date().toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric"
        })
      }
      setServices([...services, newService])
      toast.success("Service created successfully!")
    }

    setShowModal(false)   // close modal
    setForm(emptyForm)    // reset form
  }

  // Delete a service
  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id))
    setDeleteId(null)
    toast.success("Service deleted!")
  }

  // ── RENDER ─────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your service offerings
          </p>
        </div>

        {/* Add Service button */}
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full max-w-sm shadow-sm">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
        />
        {/* Clear search button */}
        {search && (
          <button onClick={() => setSearch("")}>
            <X size={14} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Table header */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              // Empty state — shown when no results found
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No services found. Try a different search or add a new one!
                </td>
              </tr>
            ) : (
              filtered.map((service, index) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Row number */}
                  <td className="px-6 py-4 text-sm text-gray-400">{index + 1}</td>

                  {/* Service name */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {service.name}
                  </td>

                  {/* Category badge */}
                  <td className="px-6 py-4">
                    <span className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[service.status]}`}>
                      {service.status}
                    </span>
                  </td>

                  {/* Created date */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {service.created}
                  </td>

                  {/* Action buttons */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      {/* Edit button */}
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => setDeleteId(service.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table footer — shows count */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {services.length} services
          </p>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ───────────────────── */}
      {showModal && (
        // Backdrop — clicking it closes modal
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Modal box — stop click from closing when clicking inside */}
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >

            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-4">

              {/* Service Name */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Infrastructure"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud, AI & ML, Security"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>

              {/* Status dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} />
                {editingService ? "Save Changes" : "Create Service"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ───────────────── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">

            {/* Warning icon */}
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <Trash2 size={22} className="text-red-500" />
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-gray-800">Delete Service?</h2>
              <p className="text-sm text-gray-500">
                This action cannot be undone. Are you sure?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default ServicesList