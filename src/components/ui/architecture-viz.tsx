"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Fixed node positions — no random on each render
const NODES = [
  { id: 0, x: 15, y: 35, label: "Edge", color: "#4F46E5" },
  { id: 1, x: 35, y: 15, label: "API", color: "#00E5FF" },
  { id: 2, x: 60, y: 20, label: "Auth", color: "#4F46E5" },
  { id: 3, x: 80, y: 40, label: "DB", color: "#00E5FF" },
  { id: 4, x: 70, y: 70, label: "Cache", color: "#818CF8" },
  { id: 5, x: 45, y: 75, label: "Queue", color: "#4F46E5" },
  { id: 6, x: 20, y: 65, label: "CDN", color: "#00E5FF" },
  { id: 7, x: 50, y: 45, label: "Core", color: "#ffffff" },
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
];

// Data pulse travels from start to end node
interface Pulse {
  id: number;
  connIdx: number;
  progress: number; // 0..1
  color: string;
}

export function ArchitectureViz() {
  const [mounted, setMounted] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const pulseId = { current: 0 };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Spawn pulses at random intervals
  useEffect(() => {
    if (!mounted) return;
    const spawnPulse = () => {
      const connIdx = Math.floor(Math.random() * CONNECTIONS.length);
      const colors = ["#00E5FF", "#4F46E5", "#818CF8", "#ffffff"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const id = pulseId.current++;
      setPulses(prev => [...prev, { id, connIdx, progress: 0, color }]);
      setTimeout(() => setPulses(prev => prev.filter(p => p.id !== id)), 1600);
    };

    const interval = setInterval(spawnPulse, 400);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      {/* Depth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-black/20 to-accent/8" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.12)_0%,transparent_70%)]" />

      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Static connection lines */}
        {CONNECTIONS.map(([s, e], i) => (
          <motion.line
            key={i}
            x1={`${NODES[s].x}%`} y1={`${NODES[s].y}%`}
            x2={`${NODES[e].x}%`} y2={`${NODES[e].y}%`}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}

        {/* Animated data pulses */}
        {pulses.map((pulse) => {
          const [s, e] = CONNECTIONS[pulse.connIdx];
          const x1 = NODES[s].x, y1 = NODES[s].y;
          const x2 = NODES[e].x, y2 = NODES[e].y;
          return (
            <motion.circle
              key={pulse.id}
              r={2.5}
              fill={pulse.color}
              filter="url(#glow)"
              initial={{ offsetDistance: "0%" }}
              animate={{
                cx: [`${x1}%`, `${x2}%`],
                cy: [`${y1}%`, `${y2}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center"
          style={{ left: `${node.x}%`, top: `${node.y}%`, x: "-50%", y: "-50%", zIndex: 2 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "backOut" }}
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute rounded-full border"
            style={{ borderColor: node.color + "40", width: 28, height: 28, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
          />
          {/* Node dot */}
          <div
            className="w-3 h-3 rounded-full border border-white/30 shadow-[0_0_12px_var(--glow)]"
            style={{
              backgroundColor: node.color,
              // @ts-ignore
              "--glow": node.color + "80",
            }}
          />
          {/* Label */}
          <motion.span
            className="mt-2 text-[9px] font-mono text-white/40 tracking-wider select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.08 }}
          >
            {node.label}
          </motion.span>
        </motion.div>
      ))}

      {/* Center ambient glow */}
      <motion.div
        className="absolute rounded-full bg-primary/15 blur-3xl pointer-events-none"
        style={{ width: 200, height: 200, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
