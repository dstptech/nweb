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
 
        {/* Hero Title */}
        <Field
          label="Hero Title"
          value={data.hero_title}
          onChange={v => onChange("hero_title", v)}
          hint="Main heading shown in the hero section"
        />
 
        {/* Hero Subtitle */}
        <Field
          label="Hero Subtitle"
          value={data.hero_subtitle}
          onChange={v => onChange("hero_subtitle", v)}
          hint="Supporting text below the title"
        />
 
        {/* Hero Image URL */}
        <Field
          label="Hero Image URL"
          value={data.hero_image}
          onChange={v => onChange("hero_image", v)}
          hint="Link to the main hero background/feature image"
        />
 
        {/* Banner Text */}
        <Field
          label="Banner Text"
          value={data.banner_text}
          onChange={v => onChange("banner_text", v)}
          hint="Text shown inside the banner strip"
        />
 
        {/* Banner Image URL */}
        <Field
          label="Banner Image URL"
          value={data.banner_image}
          onChange={v => onChange("banner_image", v)}
          hint="Image used in the banner area"
        />
 
        {/* Stats Title */}
        <Field
          label="Stats Title"
          value={data.stats_title}
          onChange={v => onChange("stats_title", v)}
          hint='e.g. "Projects Completed"'
        />
 
        {/* Stats Value */}
        <Field
          label="Stats Value"
          value={data.stats_value}
          onChange={v => onChange("stats_value", v)}
          hint='e.g. "120+" or "5 Years"'
        />
 
      </div>
 
      {/* LIVE PREVIEW */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
          Live Preview
        </div>
        <div
          className="p-8 text-center"
          style={{ background: "#0a0f1e", color: "#ffffff" }}
        >
          <h1 className="text-3xl font-bold mt-2">
            {data.hero_title || <span className="opacity-30 italic">Hero Title</span>}
          </h1>
          <p className="mt-3 opacity-70 text-sm max-w-md mx-auto">
            {data.hero_subtitle || <span className="opacity-30 italic">Hero subtitle goes here...</span>}
          </p>
 
          {/* Banner strip preview */}
          {data.banner_text && (
            <div className="mt-5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg inline-block">
              {data.banner_text}
            </div>
          )}
 
          {/* Stats preview */}
          {(data.stats_title || data.stats_value) && (
            <div className="mt-5 flex justify-center gap-1 text-blue-400">
              <span className="text-2xl font-bold">{data.stats_value}</span>
              <span className="text-sm self-end mb-1 opacity-70">{data.stats_title}</span>
            </div>
          )}
        </div>
      </div>
 
    </div>
  )
}
 
export default HeroEditor
 


