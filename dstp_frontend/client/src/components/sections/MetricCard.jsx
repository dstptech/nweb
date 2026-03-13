import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { useCounter } from "@/hooks/useCounter";

export default function MetricCard({ metric, index }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useCounter(metric.value, 2200, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="metric-card reveal-hidden text-center"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{
          background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}30)`,
        }}
      >
        <Icon name={metric.icon} size={26} style={{ color: metric.color }} />
      </div>
      <div
        className="text-5xl font-extrabold font-jakarta mb-2 tracking-tight"
        style={{ color: metric.color }}
      >
        {count}
        {metric.suffix}
      </div>
      <div className="text-sm font-semibold text-enterprise-grey uppercase tracking-widest">
        {metric.label}
      </div>
    </div>
  );
}
