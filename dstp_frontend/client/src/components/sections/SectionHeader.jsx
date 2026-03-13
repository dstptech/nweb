import Icon from "@/components/ui/AppIcon";

export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  highlight,
  highlightType = "coral",
  subtitle,
  darkMode = false,
}) {
  const gradientClass =
    highlightType === "teal" ? "gradient-text-teal" : "gradient-text-coral";

  return (
    <div className="text-center max-w-2xl mx-auto mb-16 reveal-hidden">
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{
            background:
              highlightType === "teal"
                ? "rgba(79,143,132,0.1)"
                : "rgba(231,111,111,0.1)",
            color: highlightType === "teal" ? "#4F8F84" : "#E76F6F",
          }}
        >
          {badgeIcon && <Icon name={badgeIcon} size={14} />}
          {badge}
        </div>
      )}
      <h2
        className={`text-4xl lg:text-5xl font-extrabold font-jakarta leading-tight tracking-tight mb-5 ${darkMode ? "text-white" : "text-enterprise-mid"}`}
      >
        {title}{" "}
        {highlight && <span className={gradientClass}>{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={`text-base leading-relaxed ${darkMode ? "text-white/60" : "text-enterprise-grey"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
