// ─────────────────────────────────────────────────────────────────
// HeroEditor.jsx — Maps to #home section in dstp-landing.html
//
// [WEBSITE] Field → HTML element mapping:
//   badge_text       → .section-label div (top label "Enterprise IT Solutions")
//   title_line1      → h1 line 1 — plain text "Engineering the Future"
//   title_coral      → h1 <span> with coral gradient — "Smart Software"
//   title_teal       → h1 <span> with teal gradient — "Intelligent Systems"
//   subtitle         → <p> below h1 (IBM Plex Sans, font-weight:300)
//   btn_primary_text → .btn-primary text ("Explore Services")
//   btn_primary_link → .btn-primary href (e.g. "#services")
//   btn_secondary_text → .btn-secondary text ("Contact Us")
//   btn_secondary_link → .btn-secondary href (e.g. "#contact")
//   badge1/2/3       → .flex.flex-wrap trust badges below buttons
//
// [BACKEND] Current DB fields for hero (HomepageModel flat fields):
//   hero_title    → title_line1
//   hero_subtitle → title_coral
//   banner_text   → title_teal
//   hero_image    → subtitle (temporarily reusing)
//   banner_image  → badge_text (temporarily reusing)
//   stats_title   → btn_primary_text (temporarily reusing)
//   stats_value   → btn_primary_link (temporarily reusing)
//
// [BACKEND] RECOMMENDED: Ask backend to rename/add proper fields:
//   hero_badge_text, hero_title_1, hero_title_coral, hero_title_teal,
//   hero_subtitle, hero_btn1_text, hero_btn1_link, hero_btn2_text,
//   hero_btn2_link, hero_trust_1, hero_trust_2, hero_trust_3
// ─────────────────────────────────────────────────────────────────

const Field = ({ label, value, onChange, hint, placeholder, multiline }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
    {multiline ? (
      <textarea value={value || ""} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder || ""}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none" />
    ) : (
      <input value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
    )}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

function HeroEditor({ data, onChange }) {
  return (
    <div className="space-y-5">

      {/* Section Label + Title */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">🦸 Hero — Headline</h2>
          <p className="text-xs text-gray-400 mt-0.5">The main headline and section label at the top of the page</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Section Badge" value={data.badge_text} onChange={v => onChange("badge_text", v)}
            placeholder="Enterprise IT Solutions"
            hint='Small red label above the h1 — e.g. "Enterprise IT Solutions"' />
          <Field label="Title Line 1 (plain text)" value={data.title_line1} onChange={v => onChange("title_line1", v)}
            placeholder="Engineering the Future"
            hint="First line of the h1 — no color applied" />
          <Field label='Title Line 2 (coral / red gradient)' value={data.title_coral} onChange={v => onChange("title_coral", v)}
            placeholder="Smart Software"
            hint='Second h1 line — shown in coral/red gradient color (#E76F6F)' />
          <Field label='Title Line 3 (teal / green gradient)' value={data.title_teal} onChange={v => onChange("title_teal", v)}
            placeholder="Intelligent Systems"
            hint='Third h1 line — shown in teal/green gradient color (#4F8F84)' />
        </div>
      </div>

      {/* Subtitle */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">📝 Hero — Subtitle Paragraph</h2>
          <p className="text-xs text-gray-400 mt-0.5">Supporting text below the headline — IBM Plex Sans, light weight</p>
        </div>
        <div className="p-6">
          <Field label="Subtitle Text" value={data.subtitle} onChange={v => onChange("subtitle", v)} multiline
            placeholder="DSTP Technology delivers enterprise-grade AI, data engineering, IoT, and cloud solutions…"
            hint="Shown below the headline in gray, font-weight: 300" />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">🔘 Hero — Call-to-Action Buttons</h2>
          <p className="text-xs text-gray-400 mt-0.5">Two buttons below the subtitle</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Primary Button Text" value={data.btn_primary_text} onChange={v => onChange("btn_primary_text", v)}
            placeholder="Explore Services"
            hint="Red/coral button — .btn-primary class" />
          <Field label="Primary Button Link" value={data.btn_primary_link} onChange={v => onChange("btn_primary_link", v)}
            placeholder="#services"
            hint="Where the primary button goes — use #anchor or /page" />
          <Field label="Secondary Button Text" value={data.btn_secondary_text} onChange={v => onChange("btn_secondary_text", v)}
            placeholder="Contact Us"
            hint="Outlined teal button — .btn-secondary class" />
          <Field label="Secondary Button Link" value={data.btn_secondary_link} onChange={v => onChange("btn_secondary_link", v)}
            placeholder="#contact"
            hint="Where the secondary button goes" />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-700">✅ Hero — Trust Badges</h2>
          <p className="text-xs text-gray-400 mt-0.5">Three small badges shown below the CTA buttons with colored dots</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Badge 1 (coral dot)" value={data.badge1} onChange={v => onChange("badge1", v)} placeholder="AI & Data Driven" />
          <Field label="Badge 2 (teal dot)"  value={data.badge2} onChange={v => onChange("badge2", v)} placeholder="100+ Projects" />
          <Field label="Badge 3 (purple dot)" value={data.badge3} onChange={v => onChange("badge3", v)} placeholder="Global Delivery" />
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500 flex justify-between">
          <span>Live Preview</span>
          <span className="text-gray-400">Approximate — actual site uses Syne font + animations</span>
        </div>
        <div className="p-10" style={{ background: "linear-gradient(135deg, #fdfcfb 0%, #f9f4f4 40%, #f0f7f6 100%)" }}>
          <div className="text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: "#E76F6F" }}>
            <span style={{ width: 24, height: 2, background: "#E76F6F", display: "inline-block", borderRadius: 2 }} />
            {data.badge_text || "Section label"}
          </div>
          <h1 className="font-bold leading-tight mb-4" style={{ fontSize: 28, color: "#2d3748", fontFamily: "serif" }}>
            {data.title_line1 || "Title Line 1"}<br />
            <span style={{ background: "linear-gradient(135deg,#E76F6F,#d45858)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {data.title_coral || "Title Line 2"}
            </span><br />
            <span style={{ background: "linear-gradient(135deg,#4F8F84,#3a6b62)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {data.title_teal || "Title Line 3"}
            </span>
          </h1>
          <p className="text-sm mb-5 max-w-md" style={{ color: "#718096", fontWeight: 300 }}>
            {data.subtitle || "Subtitle goes here..."}
          </p>
          <div className="flex gap-3 flex-wrap mb-5">
            <span className="text-xs font-semibold px-4 py-2 rounded-full text-white" style={{ background: "#E76F6F" }}>
              {data.btn_primary_text || "Primary Button"}
            </span>
            <span className="text-xs font-semibold px-4 py-2 rounded-full border-2" style={{ color: "#4F8F84", borderColor: "#4F8F84" }}>
              {data.btn_secondary_text || "Secondary Button"}
            </span>
          </div>
          <div className="flex gap-5 flex-wrap">
            {[
              { text: data.badge1, color: "#E76F6F" },
              { text: data.badge2, color: "#4F8F84" },
              { text: data.badge3, color: "#a78bfa" },
            ].map((b, i) => b.text && (
              <span key={i} className="flex items-center gap-2 text-xs" style={{ color: "#718096" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: b.color, display: "inline-block" }} />
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroEditor