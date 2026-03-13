import { useState, useEffect } from "react"         // ← added useState, useEffect
import { StatsCard } from "../../components"
import {
  FolderOpen,
  Users,
  DollarSign,
  UserCheck,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

// ── MOCK DATA ──────────────────────────────────────────
const statsData = [
  {
    title: "Total Projects",
    value: "1",
    change: "0%",
    trending: "up",
    icon: FolderOpen,
    color: "bg-gradient-to-br from-yellow-300 to-yellow-600",
  },
  {
    title: "Total Clients",
    value: "0",
    change: "0%",
    trending: "Down",
    icon: Users,
    color: "bg-gradient-to-br from-purple-300 to-purple-600",
  },
  {
    title: "Revenue",
    value: "INR -",
    change: "0%",
    trending: "up",
    icon: DollarSign,
    color: "bg-gradient-to-br from-green-300 to-green-600",
  },
  {
    title: "Team Members",
    value: "4",
    change: "0%",
    trending: "up",
    icon: UserCheck,
    color: "bg-gradient-to-br from-blue-300 to-blue-600",
  },
]

const lineData = [
  { month: "Sep", visits: null, inquiries: null },
  { month: "Oct", visits: null, inquiries: null },
  { month: "Nov", visits: null, inquiries: null },
  { month: "Dec", visits: null, inquiries: null },
  { month: "Jan", visits: 10,  inquiries: 0    },
  { month: "Feb", visits: 50,  inquiries: 1    },
]

const barData = [
  { category: "AI & ML",    projects: 1 },
  { category: "Cloud",      projects: 1 },
  { category: "Data Eng",   projects: 1 },
  { category: "IoT",        projects: 0 },
  { category: "Consulting", projects: 0 },
]

const recentActivity = [
  { id: 1, action: "New project added",  user: "Aayushi",  time: "2 min ago",  status: "New"     },
  { id: 2, action: "Client onboarded",   user: "Ankit",    time: "1 hr ago",   status: "Success" },
  { id: 3, action: "Invoice generated",  user: "Taaransh", time: "3 hrs ago",  status: "Pending" },
  { id: 4, action: "Team member added",  user: "Aayushi",  time: "1 day ago",  status: "Success" },
  { id: 5, action: "Service updated",    user: "Ankit",    time: "2 days ago", status: "Updated" },
]

const statusColors = {
  New:     "bg-blue-100 text-blue-600",
  Success: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Updated: "bg-purple-100 text-purple-600",
}

// ── DYNAMIC GREETING ───────────────────────────────────
const getGreeting = () => {
  const hour = new Date().getHours()  // 0–23

  if (hour >= 5 && hour < 12) {
    return { text: "Good Morning" }
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good Afternoon"}
  } else if (hour >= 17 && hour < 21) {
    return { text: "Good Evening"}
  }
}

// ── COMPONENT ──────────────────────────────────────────
function DashboardPage() {

  // Live clock — updates every second
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)   // cleanup when page unmounts
  }, [])

  const greeting = getGreeting()

  return (
    <div className="space-y-6">

      {/* ── GREETING HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {greeting.emoji} {greeting.text}, Aayushi!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening today.
          </p>
        </div>

        {/* Live date + clock — hidden on mobile */}
        <div className="text-right hidden md:block">
          <p className="text-sm font-semibold text-gray-700">
            {time.toLocaleDateString("en-IN", {
              weekday: "long",
              year:    "numeric",
              month:   "long",
              day:     "numeric",
            })}
          </p>
         
        </div>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LINE CHART */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Platform Analytics
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits"    stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="inquiries" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">
            Projects by Category
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip />
              <Bar dataKey="projects" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ── RECENT ACTIVITY TABLE ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-700">Recent Activity</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentActivity.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.action}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.user}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{item.time}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DashboardPage