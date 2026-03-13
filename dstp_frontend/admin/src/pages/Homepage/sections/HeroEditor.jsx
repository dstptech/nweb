// Reusable input component just for this file
const Field = ({ label, value, onChange, type = "text", hint }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

function HeroEditor({ data, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Section Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-semibold text-gray-700">🦸 Hero Section</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          The first thing visitors see on your website
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Badge text */}
        <Field
          label="Badge Text"
          value={data.badge}
          onChange={v => onChange("badge", v)}
          hint="Small label above the main title"
        />

        {/* Main Title */}
        <Field
          label="Main Title"
          value={data.title}
          onChange={v => onChange("title", v)}
        />

        {/* Highlighted Title */}
        <Field
          label="Highlighted Title (colored text)"
          value={data.titleHighlight}
          onChange={v => onChange("titleHighlight", v)}
          hint="This part appears in accent color"
        />

        {/* Subtitle */}
        <Field
          label="Subtitle / Description"
          value={data.subtitle}
          onChange={v => onChange("subtitle", v)}
        />

        {/* Primary Button */}
        <Field
          label="Primary Button Text"
          value={data.primaryBtn}
          onChange={v => onChange("primaryBtn", v)}
        />

        {/* Primary Button Link */}
        <Field
          label="Primary Button Link"
          value={data.primaryBtnLink}
          onChange={v => onChange("primaryBtnLink", v)}
          hint="e.g. /contact"
        />

        {/* Secondary Button */}
        <Field
          label="Secondary Button Text"
          value={data.secondaryBtn}
          onChange={v => onChange("secondaryBtn", v)}
        />

        {/* Secondary Button Link */}
        <Field
          label="Secondary Button Link"
          value={data.secondaryBtnLink}
          onChange={v => onChange("secondaryBtnLink", v)}
          hint="e.g. /about"
        />

        {/* Background Color */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.bgColor}
              onChange={e => onChange("bgColor", e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <span className="text-sm text-gray-500 font-mono">{data.bgColor}</span>
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.textColor}
              onChange={e => onChange("textColor", e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <span className="text-sm text-gray-500 font-mono">{data.textColor}</span>
          </div>
        </div>

      </div>

      {/* LIVE PREVIEW */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
          Live Preview
        </div>
        <div
          className="p-8 text-center"
          style={{ background: data.bgColor, color: data.textColor }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            {data.badge}
          </span>
          <h1 className="text-3xl font-bold mt-2">
            {data.title}{" "}
            <span className="text-blue-400">{data.titleHighlight}</span>
          </h1>
          <p className="mt-3 opacity-70 text-sm max-w-md mx-auto">{data.subtitle}</p>
          <div className="flex gap-3 justify-center mt-5">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
              {data.primaryBtn}
            </button>
            <button
              className="px-5 py-2 rounded-lg text-sm font-semibold border"
              style={{ borderColor: data.textColor, color: data.textColor }}
            >
              {data.secondaryBtn}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroEditor