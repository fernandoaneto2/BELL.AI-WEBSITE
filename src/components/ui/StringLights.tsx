"use client";

import { cn } from "@/lib/utils";

interface StringLightsProps {
  className?: string;
  bulbs?: number;
  light?: boolean;
}

export function StringLights({ className, bulbs = 12, light }: StringLightsProps) {
  const wireColor = light ? "rgba(229,197,128,0.4)" : "rgba(201,162,75,0.3)";
  const bulbColor = light ? "#E5C580" : "#C9A24B";
  const glowColor = light ? "rgba(229,197,128,0.5)" : "rgba(201,162,75,0.4)";

  const width = 800;
  const height = 60;
  const spacing = width / (bulbs + 1);

  const points = Array.from({ length: bulbs }, (_, i) => {
    const x = spacing * (i + 1);
    const sag = Math.sin((i / (bulbs - 1)) * Math.PI) * 12;
    const y = 12 + sag;
    return { x, y };
  });

  const wirePath =
    `M0,8 ` +
    points.map((p) => `Q${p.x},${p.y + 8} ${p.x},${p.y}`).join(" ") +
    ` Q${width},8 ${width},8`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-full", className)}
    >
      <path d={wirePath} stroke={wireColor} strokeWidth="1.5" fill="none" />
      {points.map((p, i) => (
        <g key={i}>
          {/* wire to bulb */}
          <line
            x1={p.x}
            y1={p.y}
            x2={p.x}
            y2={p.y + 10}
            stroke={wireColor}
            strokeWidth="1"
          />
          {/* glow */}
          <ellipse
            cx={p.x}
            cy={p.y + 16}
            rx="5"
            ry="6"
            fill={glowColor}
            filter="blur(3px)"
          />
          {/* bulb */}
          <ellipse
            cx={p.x}
            cy={p.y + 16}
            rx="4"
            ry="5"
            fill={bulbColor}
            opacity="0.9"
          />
          {/* highlight */}
          <circle cx={p.x - 1} cy={p.y + 13} r="1" fill="white" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}
