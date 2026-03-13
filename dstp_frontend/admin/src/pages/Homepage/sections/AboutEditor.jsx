const Field = ({ label, value, onChange, multiline, hint }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
      />
    ) : (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
      />
    )}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

function AboutEditor({ data, onChange }) {
  const updateStat = (id, field, value) => {
    onChange("stats", data.stats.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-semibold text-gray-700">👥 About / Team Section</h2>
        <p className="text-xs text-gray-400 mt-0.5">Company info and stats</p>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title"    value={data.title}    onChange={v => onChange("title", v)} />
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange("subtitle", v)} />
        </div>
        <Field label="Description" value={data.description} onChange={v => onChange("description", v)} multiline />
        <Field label="Vision Statement" value={data.vision} onChange={v => onChange("vision", v)} multiline />

        {/* Stats */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">📊 Stats</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.stats.map(stat => (
              <div key={stat.id} className="border border-gray-100 rounded-xl p-3 space-y-2">
                <input
                  value={stat.value}
                  onChange={e => updateStat(stat.id, "value", e.target.value)}
                  className="w-full text-center text-xl font-bold text-blue-600 outline-none border-b border-gray-100 pb-1"
                  placeholder="120+"
                />
                <input
                  value={stat.label}
                  onChange={e => updateStat(stat.id, "label", e.target.value)}
                  className="w-full text-center text-xs text-gray-500 outline-none"
                  placeholder="Projects Completed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutEditor