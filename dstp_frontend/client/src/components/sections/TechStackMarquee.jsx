const TECH_ROW_1 = [
  { name: "Python",     logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "React",      logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "FastAPI",    logo: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Docker",     logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  { name: "AWS",        logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "TensorFlow", logo: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
];

const TECH_ROW_2 = [
  { name: "Next.js",    logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Kafka",      logo: "https://cdn.simpleicons.org/apachekafka/231F20" },
  { name: "Spark",      logo: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "Terraform",  logo: "https://cdn.simpleicons.org/terraform/7B42BC" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Redis",      logo: "https://cdn.simpleicons.org/redis/FF4438" },
  { name: "GraphQL",    logo: "https://cdn.simpleicons.org/graphql/E10098" },
  { name: "Flutter",    logo: "https://cdn.simpleicons.org/flutter/02569B" },
];

function MarqueeRow({ items, direction = "left", speed = 35 }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, white, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, white, transparent)" }} />
      <div className="flex gap-4 w-max"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}>
        {doubled.map((tech, i) => (
          <div key={`${tech.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default shrink-0">
            <img src={tech.logo} alt={tech.name} className="w-7 h-7 object-contain"
              onError={(e) => { e.target.style.display = "none"; }} />
            <span className="text-sm font-bold text-enterprise-mid whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStackMarquee() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="flex flex-col gap-5 py-4">
        <MarqueeRow items={TECH_ROW_1} direction="left"  speed={35} />
        <MarqueeRow items={TECH_ROW_2} direction="right" speed={40} />
      </div>
    </>
  );
}