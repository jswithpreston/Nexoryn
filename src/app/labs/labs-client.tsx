"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { FlaskConical, Cpu, Network, Lightbulb } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Autonomous node system — positions animate independently
const NODE_COUNT = 18;
// No module-level Math.random — initialized inside useEffect to avoid hydration mismatch

function AutonomousNodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: string }>>([]);

  useEffect(() => {
    const colors = ["#4F46E5", "#00E5FF", "#818CF8", "#ffffff"];
    nodes.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      size: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let paused = false;

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (paused) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.current.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 5 || n.x > 95) n.vx *= -1;
        if (n.y < 5 || n.y > 95) n.vy *= -1;
      });

      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const a = nodes.current[i];
          const b = nodes.current[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 22) {
            ctx.beginPath();
            ctx.moveTo((a.x / 100) * w, (a.y / 100) * h);
            ctx.lineTo((b.x / 100) * w, (b.y / 100) * h);
            ctx.strokeStyle = `rgba(79,70,229,${(1 - dist / 22) * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.current.forEach(n => {
        const px = (n.x / 100) * w;
        const py = (n.y / 100) * h;
        ctx.beginPath();
        ctx.arc(px, py, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "cc";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, n.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "18";
        ctx.fill();
      });
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" />;
}

export default function LabsClient() {
  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero */}
      <motion.section
        className="flex flex-col gap-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-sm text-accent w-fit mb-2"
          whileHover={{ scale: 1.05 }}
        >
          <FlaskConical className="w-4 h-4" />
          Research & Development
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight">Nexoryn Innovation Lab.</h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed">
          Where our engineers explore the edge of what's possible. The Innovation Lab is our dedicated division for experimental technologies, AI architectures, and future computing paradigms.
        </p>

        {/* Live activity indicators */}
        <div className="flex gap-4 flex-wrap pt-2">
          {[
            { label: "Active Experiments", value: "7", color: "#00E5FF" },
            { label: "Compute Allocated", value: "94%", color: "#4F46E5" },
            { label: "Researchers Online", value: "12", color: "#34D399" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <motion.span className="w-2 h-2 rounded-full" style={{ background: stat.color }}
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5 + i * 0.3, repeat: Infinity }} />
              <span className="font-mono font-semibold" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Autonomous node visualization panel */}
      <motion.div
        className="w-full h-[200px] rounded-2xl glass-panel relative overflow-hidden border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <AutonomousNodeCanvas />
        <div className="absolute bottom-4 left-6 text-xs font-mono text-white/30 z-10">
          RESEARCH NETWORK — {NODE_COUNT} ACTIVE NODES
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-2 z-10">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-xs font-mono text-white/30">LIVE</span>
        </div>
      </motion.div>

      {/* Lab projects */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.12 }}
      >
        <LabProject
          icon={<Network className="w-8 h-8 text-purple-400" />}
          title="Neural Network Infrastructure"
          status="Active Research"
          statusColor="#A78BFA"
          description="Developing proprietary orchestrators for distributed LLM training and inference across heterogeneous GPU clusters. Optimizing memory bandwidth for massive context windows."
          visualType="network"
          progress={72}
        />
        <LabProject
          icon={<Cpu className="w-8 h-8 text-cyan-400" />}
          title="Next-Gen Embedded Systems"
          status="Prototyping"
          statusColor="#22D3EE"
          description="Writing custom, memory-safe kernels in Rust for IoT and edge devices. Focusing on ultra-low power consumption with robust zero-trust cryptographic guarantees."
          visualType="cpu"
          progress={45}
        />
        <LabProject
          icon={<Lightbulb className="w-8 h-8 text-amber-400" />}
          title="Generative UI Frameworks"
          status="Internal Tooling"
          statusColor="#FBBF24"
          description="Building compiler-level tools that translate natural language specifications directly into production-ready React component architectures with perfect accessibility."
          visualType="generative"
          progress={88}
        />
      </motion.div>
    </div>
  );
}

interface LabProjectProps {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  icon: React.ReactNode;
  visualType: string;
  progress: number;
}

function LabProject({ title, description, status, statusColor, icon, visualType, progress }: LabProjectProps) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="p-8 rounded-3xl glass-panel flex flex-col gap-6 relative overflow-hidden group border border-white/5 hover:border-white/15 transition-all min-h-[300px]"
    >
      {/* Background visual */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden mix-blend-screen">
        <LabVisualBg type={visualType} color={statusColor} />
      </div>

      {/* Large faded icon */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700 scale-150 z-0">
        {icon}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <motion.span
          className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/10 flex items-center gap-2"
          style={{ color: statusColor }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }}
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          {status}
        </motion.span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto pt-4">
        <h3 className="text-2xl font-display font-medium mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Research Progress</span>
            <span style={{ color: statusColor }}>{progress}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${statusColor}80, ${statusColor})` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LabVisualBg({ type, color }: { type: string; color: string }) {
  if (type === "network") return (
    <motion.div className="absolute -right-20 -top-20 w-72 h-72 border rounded-full" style={{ borderColor: color }}
      animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 5, repeat: Infinity }} />
  );
  if (type === "cpu") return (
    <motion.div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px]"
      style={{ color }}
      animate={{ backgroundPosition: ["0px 0px", "32px 32px"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
  );
  if (type === "generative") return (
    <motion.div className="absolute inset-0 blur-3xl" style={{ background: `radial-gradient(ellipse at 80% 80%, ${color}40, transparent 70%)` }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }} />
  );
  return null;
}
