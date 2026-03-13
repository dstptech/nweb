import { Link } from "react-router-dom";
import Icon from "@/components/ui/AppIcon";

export default function ServiceCard({ service, index }) {
  return (
    <Link to={`/services/${service.id}`} className="block">
      <div
        className="service-card reveal-hidden group cursor-pointer"
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div
          className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color}05 0%, transparent 60%)`,
          }}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${service.color}15, ${service.color}28)`,
          }}
        >
          <Icon
            name={service.icon}
            size={26}
            style={{ color: service.color }}
          />
        </div>

        <h3 className="text-lg font-bold font-jakarta text-enterprise-mid mb-3 relative z-10">
          {service.title}
        </h3>
        <p className="text-sm text-enterprise-grey leading-relaxed mb-5 relative z-10">
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-2 relative z-10">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${service.color}12`, color: service.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          style={{ background: `${service.color}15` }}
        >
          <Icon
            name="ArrowRightIcon"
            size={14}
            style={{ color: service.color }}
          />
        </div>
      </div>
    </Link>
  );
}
