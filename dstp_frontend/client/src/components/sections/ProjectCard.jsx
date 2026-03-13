import AppImage from "@/components/ui/AppImage";

export default function ProjectCard({ project, index }) {
  return (
    <div
      className="portfolio-card reveal-hidden bg-white border border-gray-100 shadow-enterprise"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="relative h-52 overflow-hidden">
        <AppImage
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${project.color}90, transparent 50%)`,
          }}
        />
        <div className="absolute bottom-4 left-4">
          <span
            className="text-xs font-bold text-white px-3 py-1.5 rounded-full"
            style={{ background: project.color }}
          >
            {project.metric}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold font-jakarta text-enterprise-mid mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-enterprise-grey leading-relaxed mb-4">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-enterprise-grey border border-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
