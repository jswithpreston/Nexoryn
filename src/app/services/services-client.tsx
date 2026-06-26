"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Shield, Zap, LayoutTemplate, Activity, Server } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function ServicesClient() {
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
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground w-fit"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.span className="h-2 w-2 rounded-full bg-primary" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          Six Interconnected Domains
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight">Our Engineering Ecosystem.</h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed">
          We don't operate in silos. Nexoryn treats technology as an interconnected ecosystem, providing end-to-end expertise across software, infrastructure, security, and digital growth.
        </p>
      </motion.section>

      {/* Connection diagram hint */}
      <div className="relative hidden lg:block h-1">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {[16, 33, 50, 66, 83].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 -top-[3px]"
            style={{ left: `${pos}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>

      {/* Domain cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.1 }}
      >
        <DomainCard
          icon={<Layers className="w-8 h-8 text-primary" />}
          color="primary"
          title="Web Applications & SaaS Platforms"
          items={["High-performance React & Next.js Frontends", "Scalable Node.js & Go Backends", "Enterprise Architecture Design", "Cloud-Native Deployments (AWS, GCP)"]}
          animationType="layers"
        />
        <DomainCard
          icon={<LayoutTemplate className="w-8 h-8 text-emerald-400" />}
          color="emerald"
          title="Mobile Systems"
          items={["Native Android (Kotlin) & iOS (Swift)", "Cross-Platform React Native Apps", "Secure Compartmentalized Environments", "Complex Hardware Integrations"]}
          animationType="mobile"
        />
        <DomainCard
          icon={<Server className="w-8 h-8 text-accent" />}
          color="accent"
          title="Infrastructure & OS"
          items={["Custom Linux Systems & Kernels", "Developer Environments & Tooling", "Bare-Metal Orchestration", "High-Availability Container Clusters"]}
          animationType="infra"
        />
        <DomainCard
          icon={<Shield className="w-8 h-8 text-indigo-400" />}
          color="indigo"
          title="Cybersecurity"
          items={["Zero-Trust Architecture Implementation", "Advanced Threat Modeling & Intelligence", "Penetration Testing & Red Teaming", "Automated Compliance Systems"]}
          animationType="security"
        />
        <DomainCard
          icon={<Activity className="w-8 h-8 text-pink-500" />}
          color="pink"
          title="Trading Technology"
          items={["Sub-millisecond Execution Engines", "Real-time Risk Analytics Platforms", "Quantitative Algorithm Dashboards", "Secure Financial Infrastructure"]}
          animationType="trading"
        />
        <DomainCard
          icon={<Zap className="w-8 h-8 text-amber-400" />}
          color="amber"
          title="Digital Growth & Marketing"
          items={["Data-Driven Brand Strategy", "Social Media Management & Content", "Growth Automation Systems", "Predictive Marketing Analytics"]}
          animationType="growth"
        />
      </motion.div>

      {/* CTA */}
      <motion.section
        className="py-12 border-t border-white/10 mt-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display font-semibold mb-2">Need a custom solution?</h3>
            <p className="text-muted-foreground">Our engineering team is ready to architect your next platform.</p>
          </div>
          <MagneticButton intensity={0.3}>
            <Link href="/contact" className="px-6 py-3 rounded-full bg-white text-black font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all whitespace-nowrap">
              Consult with Engineering
            </Link>
          </MagneticButton>
        </div>
      </motion.section>
    </div>
  );
}

const colorMap: Record<string, string> = {
  primary: "rgba(79,70,229,",
  emerald: "rgba(52,211,153,",
  accent: "rgba(0,229,255,",
  indigo: "rgba(129,140,248,",
  pink: "rgba(236,72,153,",
  amber: "rgba(251,191,36,",
};

function DomainCard({ icon, title, items, animationType, color }: { icon: React.ReactNode; title: string; items: string[]; animationType: string; color: string }) {
  const glowColor = colorMap[color] || "rgba(79,70,229,";

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="p-8 rounded-3xl glass-panel flex flex-col gap-6 group relative overflow-hidden border border-white/5 hover:border-white/15 transition-colors duration-500"
    >
      {/* Corner glow on hover */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ background: `${glowColor}0.15)` }}
      />

      {/* Activity indicator */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <DomainMicroAnim type={animationType} color={color} />
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-display font-medium">{title}</h3>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-3 text-muted-foreground"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * idx, duration: 0.5 }}
          >
            <motion.span
              className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0"
              whileHover={{ scale: 2, backgroundColor: "rgba(255,255,255,0.8)" }}
            />
            <span className="leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function DomainMicroAnim({ type, color }: { type: string; color: string }) {
  const c = colorMap[color] || "rgba(79,70,229,";
  if (type === "layers") return (
    <div className="flex flex-col gap-1">
      {[16, 12, 16].map((w, i) => (
        <motion.div key={i} className="h-0.5 rounded-full" style={{ width: w, background: `${c}0.8)` }}
          animate={{ x: [0, i === 1 ? -4 : 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  );
  if (type === "mobile") return (
    <motion.div className="w-4 h-6 border rounded-sm relative" style={{ borderColor: `${c}0.6)` }}
      animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full" style={{ background: `${c}0.6)` }} />
    </motion.div>
  );
  if (type === "infra") return (
    <div className="flex flex-col gap-1">
      {[0, 0.3, 0.6].map((d, i) => (
        <motion.div key={i} className="w-3 h-0.5 rounded-full" style={{ background: `${c}0.7)` }}
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: d }} />
      ))}
    </div>
  );
  if (type === "security") return (
    <motion.div className="w-4 h-4 border rounded-sm" style={{ borderColor: `${c}0.6)` }}
      animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
  );
  if (type === "trading") return (
    <div className="flex items-end gap-0.5 h-4">
      {[[40, 100], [70, 30], [55, 85]].map(([a, b], i) => (
        <motion.div key={i} className="w-1 rounded-t-sm" style={{ background: `${c}0.8)` }}
          animate={{ height: [`${a}%`, `${b}%`, `${a}%`] }} transition={{ duration: 1 + i * 0.2, repeat: Infinity }} />
      ))}
    </div>
  );
  if (type === "growth") return (
    <motion.div className="w-3 h-3 rounded-full blur-[2px]" style={{ background: `${c}0.9)` }}
      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
  );
  return null;
}
