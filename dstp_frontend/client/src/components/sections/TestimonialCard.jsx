import AppImage from "@/components/ui/AppImage";

export default function TestimonialCard({ t, index }) {
  return (
    <div
      className="glass-card rounded-2xl p-7 reveal-hidden hover:shadow-enterprise transition-all duration-400 group"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex gap-1 mb-5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-coral-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-enterprise-mid text-sm leading-relaxed mb-6 font-medium italic">
        "{t.quote}"
      </blockquote>

      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-coral-100 shrink-0">
          <AppImage
            src={t.avatar}
            alt={t.avatarAlt}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="font-bold text-enterprise-mid text-sm">{t.name}</div>
          <div className="text-xs text-enterprise-grey">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}
