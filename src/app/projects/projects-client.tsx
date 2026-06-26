"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Lock, Activity, Smartphone } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useRef } from "react";

export default function ProjectsClient() {
  return (
    <div className="flex flex-col gap-24 py-12">
      <motion.section
        className="flex flex-col gap-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground w-fit"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.span className="h-2 w-2 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          Production Systems
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight">Our Work.</h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed">
          From uncompromising mobile environments to low-latency trading engines, explore the systems we've architected and deployed.
        </p>
      </motion.section>

      <div className="flex flex-col gap-20 md:gap-32">
        <ProjectCaseStudy
          title="ELEVATE OS"
          category="Custom Operating System"
          icon={<Smartphone className="w-6 h-6 text-primary" />}
          description="A secure, compartmentalized mobile environment designed from the kernel up for complete privacy, data sovereignty, and hardware-level encryption."
          gradient="from-indigo-500/20 to-blue-600/20"
          accentColor="#4F46E5"
          visualType="mobile"
          stats={[{ label: "Boot Time", value: "0.8s" }, { label: "Encrypted", value: "100%" }, { label: "Kernel LOC", value: "420k" }]}
        />
        <ProjectCaseStudy
          title="TRADEGUARD"
          category="Financial Infrastructure"
          icon={<Activity className="w-6 h-6 text-emerald-400" />}
          description="Real-time risk mitigation engine analyzing market anomalies with sub-millisecond latency. Built for high-frequency trading firms requiring unshakeable stability."
          gradient="from-emerald-500/20 to-teal-600/20"
          accentColor="#34D399"
          visualType="trading"
          stats={[{ label: "Latency", value: "<1ms" }, { label: "Uptime", value: "99.99%" }, { label: "Daily Vol", value: "$2B+" }]}
          reverse
        />
        <ProjectCaseStudy
          title="NEXORYN SECURE"
          category="Cybersecurity Platform"
          icon={<Lock className="w-6 h-6 text-pink-500" />}
          description="Next-generation automated threat intelligence platform combining continuous vulnerability scanning with zero-trust architectural policies."
          gradient="from-pink-500/20 to-rose-600/20"
          accentColor="#EC4899"
          visualType="security"
          stats={[{ label: "Threats Blocked", value: "14k+" }, { label: "Scan Depth", value: "L7" }, { label: "CVEs Caught", value: "0-day" }]}
        />
      </div>
    </div>
  );
}

interface CaseStudyProps {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  visualType: string;
  stats: { label: string; value: string }[];
  reverse?: boolean;
}

function ProjectCaseStudy({ title, category, description, icon, gradient, accentColor, visualType, stats, reverse = false }: CaseStudyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Text side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {icon}
          {category}
        </div>
        <h2 className="text-4xl font-display font-semibold">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>

        {/* Live stats */}
        <div className="flex gap-6 pt-2">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="text-xl font-display font-semibold" style={{ color: accentColor }}>{s.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <MagneticButton intensity={0.2}>
          <button className="flex items-center gap-2 text-primary hover:text-white transition-colors w-fit font-medium mt-4 group">
            Read Case Study
            <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </button>
        </MagneticButton>
      </div>

      {/* Visual side */}
      <motion.div
        style={{ y }}
        className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl glass-panel relative overflow-hidden flex items-center justify-center p-8 group border border-white/5 hover:border-white/20 transition-all duration-700"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen`} />

        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 origin-left"
          style={{ background: accentColor, scaleX: scrollYProgress }}
        />

        <div className="relative z-10 w-full h-full rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
          {visualType === "mobile" && <MobileVisual accentColor={accentColor} />}
          {visualType === "trading" && <TradingVisual accentColor={accentColor} />}
          {visualType === "security" && <SecurityVisual accentColor={accentColor} />}
        </div>

        {/* Status badge */}
        <motion.div
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-muted-foreground"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          System Active
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileVisual({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-[180px]">
      {/* Status bar */}
      <div className="w-full h-6 rounded-lg border border-white/10 bg-white/5 flex items-center px-3 gap-1 relative overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0 w-1/3" style={{ background: `${accentColor}25` }} animate={{ x: ["-100%", "400%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/30" />)}
      </div>
      {/* Main screen */}
      <div className="w-full h-28 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden">
        <motion.div className="w-14 h-14 rounded-full border flex items-center justify-center" style={{ borderColor: `${accentColor}60` }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
          <div className="w-7 h-7 rounded-full blur-sm" style={{ background: `${accentColor}30` }} />
        </motion.div>
        {/* Encryption pulse rings */}
        {[1.8, 2.5].map((s, i) => (
          <motion.div key={i} className="absolute inset-0 rounded-xl border" style={{ borderColor: `${accentColor}20` }}
            animate={{ scale: [1, s], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }} />
        ))}
      </div>
      {/* Bottom bar */}
      <div className="w-full h-6 rounded-lg border border-white/10 bg-white/5" />
      {/* System metrics */}
      <div className="flex gap-2 w-full mt-1">
        {["CPU", "MEM", "SEC"].map((label, i) => (
          <motion.div key={i} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: accentColor }}
              animate={{ width: [`${20 + i * 15}%`, `${60 + i * 10}%`, `${20 + i * 15}%`] }} transition={{ duration: 2 + i, repeat: Infinity }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TradingVisual({ accentColor }: { accentColor: string }) {
  const heights = [35, 55, 45, 70, 50, 80, 60, 90, 65, 75, 55, 85];
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      {/* Price ticker */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-white/40">NEXO/USD</span>
        <motion.span className="text-xs font-mono" style={{ color: accentColor }}
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          LIVE
        </motion.span>
      </div>
      {/* Chart */}
      <div className="flex-1 flex items-end justify-between gap-1">
        {heights.map((h, i) => (
          <motion.div key={i} className="w-full rounded-t-sm"
            style={{ background: `${accentColor}90` }}
            animate={{ height: [`${h}%`, `${Math.min(h + 25, 95)}%`, `${h}%`] }}
            transition={{ duration: 1.5 + (i % 3) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }} />
        ))}
      </div>
      {/* Activity line */}
      <div className="flex items-center gap-2">
        <motion.div className="flex-1 h-px" style={{ background: `${accentColor}40` }} animate={{ scaleX: [0, 1] }} transition={{ duration: 1.5 }} />
        <span className="text-xs font-mono" style={{ color: accentColor }}>+2.4%</span>
      </div>
    </div>
  );
}

function SecurityVisual({ accentColor }: { accentColor: string }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:20px_20px]" />
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)` }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Threat nodes */}
      {[{ x: "25%", y: "30%" }, { x: "70%", y: "25%" }, { x: "60%", y: "70%" }, { x: "30%", y: "72%" }].map((pos, i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full"
          style={{ left: pos.x, top: pos.y, background: accentColor + "80" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }} />
      ))}
      {/* Core shield */}
      <div className="relative z-10 w-20 h-20 rounded-full border flex items-center justify-center bg-black/60"
        style={{ borderColor: `${accentColor}50` }}>
        <Lock className="w-7 h-7" style={{ color: accentColor }} />
        <motion.div className="absolute inset-0 rounded-full border"
          style={{ borderColor: `${accentColor}30` }}
          animate={{ scale: [1, 2], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }} />
      </div>
    </div>
  );
}
