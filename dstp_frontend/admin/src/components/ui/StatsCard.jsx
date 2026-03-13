import { TrendingUp, TrendingDown } from "lucide-react"

function StatsCard({ title, value, change, trending, icon: Icon, color }) {
  const isUp = trending === "up"

  return (
    <div className="
      bg-white rounded-2xl p-5
      border border-gray-100
      shadow-sm

      cursor-pointer
      transition-all duration-300 ease-in-out

      hover:-translate-y-2
      hover:shadow-xl
      hover:shadow-gray-200
      hover:border-gray-200
    ">

      {/* TOP ROW — title + icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* MIDDLE — big number */}
      <p className="text-3xl font-bold text-gray-800 mt-4">{value}</p>

      {/* BOTTOM — trending */}
      <div className="flex items-center gap-1.5 mt-4">
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
          ${isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
        >
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
        <p className="text-xs text-gray-400">vs last month</p>
      </div>

    </div>
  )
}

export default StatsCard