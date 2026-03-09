const Field = ({ label, value, onChange, hint }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

function ContactEditor({ data, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-semibold text-gray-700">📞 Contact / CTA Section</h2>
        <p className="text-xs text-gray-400 mt-0.5">Bottom call-to-action and contact details</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Section Title"    value={data.title}    onChange={v => onChange("title", v)} />
        <Field label="Subtitle"         value={data.subtitle} onChange={v => onChange("subtitle", v)} />
        <Field label="Button Text"      value={data.btnText}  onChange={v => onChange("btnText", v)} />
        <Field label="Button Link"      value={data.btnLink}  onChange={v => onChange("btnLink", v)} hint="e.g. /contact" />
        <Field label="Email"            value={data.email}    onChange={v => onChange("email", v)} />
        <Field label="Phone"            value={data.phone}    onChange={v => onChange("phone", v)} />
        <Field label="Address"          value={data.address}  onChange={v => onChange("address", v)} />

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Background Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={data.bgColor} onChange={e => onChange("bgColor", e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer" />
              <span className="text-xs text-gray-400 font-mono">{data.bgColor}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Text Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={data.textColor} onChange={e => onChange("textColor", e.target.value)} className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer" />
              <span className="text-xs text-gray-400 font-mono">{data.textColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">Live Preview</div>
        <div className="p-8 text-center" style={{ background: data.bgColor, color: data.textColor }}>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p className="mt-2 opacity-70 text-sm">{data.subtitle}</p>
          <button className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold">
            {data.btnText}
          </button>
          <div className="mt-4 flex justify-center gap-6 text-sm opacity-70">
            <span>📧 {data.email}</span>
            <span>📞 {data.phone}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactEditor