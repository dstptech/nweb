export default function AINetworkViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full opacity-20 animate-blob-morph"
        style={{
          background:
            "radial-gradient(circle, #E76F6F 0%, #4F8F84 50%, transparent 70%)",
        }}
      />

      <div
        className="absolute w-80 h-80 rounded-full border border-coral-400/20 animate-spin-slow"
        style={{ borderStyle: "dashed" }}
      />
      <div
        className="absolute w-56 h-56 rounded-full border border-teal/20"
        style={{
          animation: "spin-slow 15s linear infinite reverse",
          borderStyle: "dashed",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="w-80 h-80 relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="200"
          y1="200"
          x2="120"
          y2="100"
          stroke="#E76F6F"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
        />
        <line
          x1="200"
          y1="200"
          x2="300"
          y2="120"
          stroke="#4F8F84"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
          style={{ animationDelay: "0.5s" }}
        />
        <line
          x1="200"
          y1="200"
          x2="320"
          y2="250"
          stroke="#E76F6F"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
          style={{ animationDelay: "1s" }}
        />
        <line
          x1="200"
          y1="200"
          x2="260"
          y2="330"
          stroke="#4F8F84"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
          style={{ animationDelay: "1.5s" }}
        />
        <line
          x1="200"
          y1="200"
          x2="120"
          y2="310"
          stroke="#E76F6F"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
          style={{ animationDelay: "2s" }}
        />
        <line
          x1="200"
          y1="200"
          x2="80"
          y2="230"
          stroke="#4F8F84"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          className="network-line"
          style={{ animationDelay: "2.5s" }}
        />
        <line
          x1="200"
          y1="200"
          x2="160"
          y2="70"
          stroke="#E76F6F"
          strokeWidth="1"
          strokeOpacity="0.25"
          className="network-line"
          style={{ animationDelay: "0.8s" }}
        />
        <line
          x1="120"
          y1="100"
          x2="300"
          y2="120"
          stroke="#4F8F84"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
        <line
          x1="300"
          y1="120"
          x2="320"
          y2="250"
          stroke="#E76F6F"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
        <line
          x1="320"
          y1="250"
          x2="260"
          y2="330"
          stroke="#4F8F84"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
        <line
          x1="120"
          y1="310"
          x2="80"
          y2="230"
          stroke="#E76F6F"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />

        <circle
          cx="120"
          cy="100"
          r="8"
          fill="#E76F6F"
          opacity="0.8"
          className="network-node"
        />
        <circle cx="120" cy="100" r="16" fill="#E76F6F" opacity="0.15" />
        <circle
          cx="300"
          cy="120"
          r="6"
          fill="#4F8F84"
          opacity="0.8"
          className="network-node"
          style={{ animationDelay: "0.4s" }}
        />
        <circle cx="300" cy="120" r="12" fill="#4F8F84" opacity="0.15" />
        <circle
          cx="320"
          cy="250"
          r="7"
          fill="#E76F6F"
          opacity="0.8"
          className="network-node"
          style={{ animationDelay: "0.8s" }}
        />
        <circle cx="320" cy="250" r="14" fill="#E76F6F" opacity="0.15" />
        <circle
          cx="260"
          cy="330"
          r="5"
          fill="#4F8F84"
          opacity="0.8"
          className="network-node"
          style={{ animationDelay: "1.2s" }}
        />
        <circle cx="260" cy="330" r="10" fill="#4F8F84" opacity="0.15" />
        <circle
          cx="120"
          cy="310"
          r="6"
          fill="#E76F6F"
          opacity="0.8"
          className="network-node"
          style={{ animationDelay: "1.6s" }}
        />
        <circle cx="120" cy="310" r="12" fill="#E76F6F" opacity="0.15" />
        <circle
          cx="80"
          cy="230"
          r="5"
          fill="#4F8F84"
          opacity="0.8"
          className="network-node"
          style={{ animationDelay: "2s" }}
        />
        <circle cx="80" cy="230" r="10" fill="#4F8F84" opacity="0.15" />
        <circle
          cx="160"
          cy="70"
          r="4"
          fill="#E76F6F"
          opacity="0.6"
          className="network-node"
          style={{ animationDelay: "2.4s" }}
        />

        <circle
          cx="200"
          cy="200"
          r="28"
          fill="url(#centerGrad)"
          opacity="0.95"
        />
        <circle
          cx="200"
          cy="200"
          r="40"
          fill="url(#centerGradOuter)"
          opacity="0.2"
        />
        <circle
          cx="200"
          cy="200"
          r="55"
          fill="url(#centerGradOuter)"
          opacity="0.08"
        />
        <text
          x="200"
          y="208"
          textAnchor="middle"
          fontSize="22"
          fill="white"
          opacity="0.95"
        >
          ⚡
        </text>

        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E76F6F" />
            <stop offset="100%" stopColor="#4F8F84" />
          </radialGradient>
          <radialGradient id="centerGradOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E76F6F" />
            <stop offset="100%" stopColor="#4F8F84" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div
        className="absolute top-8 right-8 glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-coral-500 animate-float"
        style={{ animationDelay: "0s" }}
      >
        AI / ML
      </div>
      <div
        className="absolute bottom-12 left-4 glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-teal animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        Cloud Native
      </div>
      <div className="absolute top-1/3 right-2 glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-coral-500 animate-float-delayed">
        IoT Edge
      </div>
      <div className="absolute bottom-1/4 right-10 glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-teal animate-float-slow">
        Data Platform
      </div>
    </div>
  );
}
