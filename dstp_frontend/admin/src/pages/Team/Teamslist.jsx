import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, X, Save, Search, Download, SlidersHorizontal, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import toast from "react-hot-toast"

// ── MOCK DATA ────────────────────────────────────────
const mockMembers = [
  { id: 1,  name: "Aayushi Bishnoi",   email: "aayushi@dstp.com",   role: "Admin",     department: "Engineering", status: "Active",   joined: "2026-02-15" },
  { id: 2,  name: "Priya Mehta",    email: "priya@dstp.com",   role: "Editor",    department: "Marketing",   status: "Active",   joined: "2024-02-14" },
  { id: 3,  name: "Rahul Verma",    email: "rahul@dstp.com",   role: "Admin",     department: "Engineering", status: "Active",   joined: "2023-11-05" },
  { id: 4,  name: "Sneha Patel",    email: "sneha@dstp.com",   role: "Moderator", department: "Support",     status: "Active",   joined: "2024-03-20" },
  { id: 5,  name: "Karan Singh",    email: "karan@dstp.com",   role: "Viewer",    department: "Sales",       status: "Active",   joined: "2024-04-01" },
  { id: 6,  name: "Ananya Gupta",   email: "ananya@dstp.com",  role: "Editor",    department: "Design",      status: "Active",   joined: "2024-01-28" },
  { id: 7,  name: "Dev Malhotra",   email: "dev@dstp.com",     role: "Viewer",    department: "Finance",     status: "Inactive", joined: "2023-09-15" },
  { id: 8,  name: "Ritu Joshi",     email: "ritu@dstp.com",    role: "Editor",    department: "Marketing",   status: "Active",   joined: "2024-05-11" },
  { id: 9,  name: "Mohit Agarwal",  email: "mohit@dstp.com",   role: "Moderator", department: "Support",     status: "Active",   joined: "2024-02-28" },
  { id: 10, name: "Nisha Kapoor",   email: "nisha@dstp.com",   role: "Admin",     department: "Engineering", status: "Active",   joined: "2023-12-01" },
  { id: 11, name: "Vikram Das",     email: "vikram@dstp.com",  role: "Viewer",    department: "Sales",       status: "Suspended",joined: "2024-06-03" },
  { id: 12, name: "Pooja Reddy",    email: "pooja@dstp.com",   role: "Editor",    department: "Design",      status: "Active",   joined: "2024-03-09" },
]

// ── HELPERS ──────────────────────────────────────────
const getInitials = (name) =>
  name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

const avatarColors = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
  "bg-pink-500",  "bg-teal-500",  "bg-red-500",   "bg-indigo-500",
]
const getAvatarColor = (name) =>
  avatarColors[name.charCodeAt(0) % avatarColors.length]

const roleStyles = {
  Admin:     "bg-green-100 text-green-700 border border-green-200",
  Editor:    "bg-gray-100  text-gray-600  border border-gray-200",
  Moderator: "bg-orange-100 text-orange-600 border border-orange-200",
  Viewer:    "bg-gray-100  text-gray-500  border border-gray-200",
}

const statusStyles = {
  Active:    "bg-green-100 text-green-700",
  Inactive:  "bg-gray-100  text-gray-500",
  Suspended: "bg-red-100   text-red-600",
}

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "1 day ago"
  if (days < 7)  return `${days} days ago`
  if (days < 30) return `${Math.floor(days/7)} weeks ago`
  return `${Math.floor(days/30)} months ago`
}

const ROWS_OPTIONS = [5, 10, 15, 25]

const emptyForm = {
  name: "", email: "", role: "Viewer",
  department: "Engineering", status: "Active", joined: ""
}

// ── MAIN COMPONENT ───────────────────────────────────
function TeamsList() {
  const [members, setMembers]       = useState(mockMembers)
  const [search, setSearch]         = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortField, setSortField]   = useState("name")
  const [sortDir, setSortDir]       = useState("asc")
  const [page, setPage]             = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showForm, setShowForm]     = useState(false)
  const [editId, setEditId]         = useState(null)
  const [form, setForm]             = useState(emptyForm)
  const [showDelete, setShowDelete] = useState(null)

  // ── FILTER + SEARCH + SORT ────────────────────────
  const filtered = members
    .filter(m => filterStatus === "All" || m.status === filterStatus)
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortField] || ""
      const bv = b[sortField] || ""
      return sortDir === "asc"
        ? av.localeCompare(bv)
        : bv.localeCompare(av)
    })

  const totalPages  = Math.ceil(filtered.length / rowsPerPage)
  const paginated   = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDir("asc") }
  }

  // ── CRUD ──────────────────────────────────────────
  const handleAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const handleEdit = (member) => {
    setEditId(member.id)
    setForm({ ...member })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required!")
      return
    }
    if (editId) {
      setMembers(prev => prev.map(m => m.id === editId ? { ...m, ...form } : m))
      toast.success("Member updated!")
    } else {
      setMembers(prev => [...prev, { ...form, id: Date.now() }])
      toast.success("Member added!")
    }
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id))
    setShowDelete(null)
    toast.success("Member removed!")
  }

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Role", "Department", "Status", "Joined"],
      ...filtered.map(m => [m.name, m.email, m.role, m.department, m.status, m.joined])
    ].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a"); a.href = url; a.download = "team.csv"; a.click()
    toast.success("Exported!")
  }

  // reset page on filter/search change
  useEffect(() => { setPage(1) }, [search, filterStatus, rowsPerPage])

  // ── SORT ICON ─────────────────────────────────────
  const SortIcon = ({ field }) => (
    <span className="inline-flex flex-col ml-1 opacity-40">
      <ChevronUp   size={10} className={sortField === field && sortDir === "asc"  ? "opacity-100 text-blue-500" : ""} />
      <ChevronDown size={10} className={sortField === field && sortDir === "desc" ? "opacity-100 text-blue-500" : ""} style={{ marginTop: -4 }} />
    </span>
  )

  return (
    <div className="space-y-5">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-start justify-between">
        <div>
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 mb-1">
            Dashboard &rsaquo; <span className="text-gray-600">Team</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-800">Team</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage team members, roles, and permissions.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* ── MAIN CARD ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Status Filter Tabs */}
        <div className="px-6 pt-5 border-b border-gray-100">
          <div className="flex gap-1">
            {["All", "Active", "Inactive", "Suspended"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px
                  ${filterStatus === s
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Actions */}
        <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-gray-50">
          {/* Search */}
          <div className="relative w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={14} /> Columns
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* ── TABLE ── */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  { label: "Name",       field: "name"       },
                  { label: "Role",       field: "role"       },
                  { label: "Department", field: "department" },
                  { label: "Status",     field: "status"     },
                  { label: "Joined",     field: "joined"     },
                ].map(col => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                  >
                    {col.label}
                    <SortIcon field={col.field} />
                  </th>
                ))}
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400 text-sm">
                    No members found
                  </td>
                </tr>
              ) : paginated.map(member => (
                <tr key={member.id} className="hover:bg-gray-50/60 transition-colors group">

                  {/* Name + Email */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(member.name)}`}>
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role badge */}
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${roleStyles[member.role] || roleStyles.Viewer}`}>
                      {member.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {member.department}
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[member.status]}`}>
                      {member.status}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-3.5 text-sm text-gray-400">
                    {timeAgo(member.joined)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setShowDelete(member)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── PAGINATION ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing {filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, filtered.length)} of {filtered.length} results
          </p>

          <div className="flex items-center gap-4">
            {/* Rows per page */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              Rows
              <select
                value={rowsPerPage}
                onChange={e => setRowsPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-blue-400 bg-white"
              >
                {ROWS_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            {/* Page buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                .reduce((acc, n, i, arr) => {
                  if (i > 0 && n - arr[i - 1] > 1) acc.push("...")
                  acc.push(n)
                  return acc
                }, [])
                .map((n, i) =>
                  n === "..." ? (
                    <span key={`dots-${i}`} className="px-2 text-gray-400 text-xs">...</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors
                        ${page === n
                          ? "bg-blue-600 text-white"
                          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                    >
                      {n}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {editId ? "Edit Member" : "Add Member"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editId ? "Update member details" : "Add a new team member"}
                </p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email *</label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="arjun@dstp.com"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Role + Department */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  >
                    {["Admin", "Editor", "Moderator", "Viewer"].map(r => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Department</label>
                  <select
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  >
                    {["Engineering", "Marketing", "Design", "Sales", "Support", "Finance"].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status + Joined */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  >
                    {["Active", "Inactive", "Suspended"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Join Date</label>
                  <input
                    type="date"
                    value={form.joined}
                    onChange={e => setForm({ ...form, joined: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={15} /> {editId ? "Update" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Remove Member?</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              <span className="font-semibold text-gray-700">{showDelete.name}</span> will be permanently removed from the team.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDelete.id)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamsList