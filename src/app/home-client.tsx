"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Cpu, Layers, Shield, Zap, LayoutTemplate, Activity } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArchitectureViz } from "@/components/ui/architecture-viz";
import { useRef, useEffect, useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.1 }
};

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="flex flex-col gap-16 md:gap-32">
      {/* Hero Section */}
      <section ref={heroRef} className="flex flex-col items-center text-center gap-8 pt-20 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground mb-4 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          Engineering Systems of the Future
        </motion.div>

        <motion.div style={{ y: headlineY, scale: headlineScale, opacity: headlineOpacity }}>
          <motion.h1
            className="text-6xl md:text-8xl font-display font-semibold tracking-tight text-foreground max-w-5xl leading-[1.1]"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Where Infrastructure <br />
            <motion.span
              className="premium-gradient-text inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Meets Intelligence.
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-xl text-muted-foreground max-w-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nexoryn designs, builds, secures, and scales intelligent digital systems. From custom operating systems to high-frequency trading infrastructure.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MagneticButton>
            <Link href="/contact" className="flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Start a Project
            </Link>
          </MagneticButton>
          <MagneticButton intensity={0.3}>
            <Link href="/services" className="group flex items-center justify-center rounded-full px-8 py-4 text-base font-medium text-white hover:bg-white/5 transition-all">
              Explore Systems
              <motion.span className="ml-2" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
              </motion.span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Hero Visualization */}
        <motion.div
          className="w-full max-w-5xl h-[280px] sm:h-[400px] mt-16 rounded-2xl glass-panel relative overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <ArchitectureViz />
          <motion.div
            className="absolute bottom-4 left-6 text-muted-foreground font-medium text-sm z-10 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Network Infrastructure Online
          </motion.div>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <motion.section
        className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 relative"
        {...stagger}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50" />
        <MetricCard end={99.99} suffix="%" label="Uptime SLA" decimals={2} />
        <MetricCard end={1} prefix="<" suffix="ms" label="Execution Latency" />
        <MetricCard end={250} suffix="+" label="Systems Deployed" />
        <MetricCard end={0} suffix="" label="Zero-Day Breaches" />
      </motion.section>

      {/* Engineering Ecosystem */}
      <section className="flex flex-col gap-16 relative">
        <motion.div className="flex flex-col gap-4 max-w-3xl" {...fadeUp}>
          <h2 className="text-4xl font-display font-semibold tracking-tight">The Engineering Ecosystem</h2>
          <p className="text-xl text-muted-foreground">
            We don't just write code. We architect interconnected systems across distinct domains of technology.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
          variants={{ initial: {}, whileInView: {} }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {/* Connecting line */}
          <div className="absolute inset-0 -z-10 hidden lg:block opacity-20 pointer-events-none">
            <svg className="w-full h-full">
              <motion.path
                d="M 150 100 Q 300 50 450 100 T 750 100"
                fill="transparent"
                stroke="url(#ecogradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="ecogradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <EcosystemCard icon={<Layers className="h-6 w-6 text-primary" />} title="Web & SaaS Platforms" description="Scalable, resilient web applications and enterprise software built for global audiences." animationType="layers" />
          <EcosystemCard icon={<Cpu className="h-6 w-6 text-accent" />} title="Infrastructure & OS" description="Custom operating systems, Linux environments, and uncompromising developer tooling." animationType="pulse" />
          <EcosystemCard icon={<Shield className="h-6 w-6 text-indigo-400" />} title="Cybersecurity" description="Zero-trust architecture, threat intelligence, and proactive security assessments." animationType="shield" />
          <EcosystemCard icon={<Activity className="h-6 w-6 text-pink-500" />} title="Trading Technology" description="Sub-millisecond execution engines and comprehensive risk analytics systems." animationType="chart" />
          <EcosystemCard icon={<LayoutTemplate className="h-6 w-6 text-emerald-400" />} title="Mobile Systems" description="Native Android and iOS applications with exceptional performance and design." animationType="mobile" />
          <EcosystemCard icon={<Zap className="h-6 w-6 text-amber-400" />} title="Digital Growth" description="Data-driven marketing, brand strategy, and continuous growth automation." animationType="glow" />
        </motion.div>
      </section>

      {/* About / Philosophy */}
      <motion.section
        className="flex flex-col gap-8 p-6 sm:p-12 rounded-3xl glass-panel relative overflow-hidden group"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 mix-blend-screen"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <h2 className="text-3xl font-display font-semibold relative z-10">Built Beyond Software.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground text-lg leading-relaxed relative z-10">
          <p>We approach engineering from first principles. Our teams don't just assemble frameworks—we dissect problems to their core and build robust, secure, and beautiful systems capable of scaling to millions of users.</p>
          <p>Nexoryn bridges the gap between raw, uncompromising technical infrastructure and elegant, human-centered design. Our mission is to accelerate the creation of the world's most capable systems.</p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]" />
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-24 flex flex-col items-center text-center gap-8 relative rounded-3xl overflow-hidden glass-panel border-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none mix-blend-screen" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight max-w-2xl relative z-10">
          Ready to build something exceptional?
        </h2>
        <p className="text-xl text-muted-foreground max-w-xl relative z-10">
          Join the organizations trusting Nexoryn to design, build, and secure their most critical infrastructure.
        </p>
        <MagneticButton intensity={0.5}>
          <Link href="/contact" className="mt-4 relative z-10 flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-base font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
            Let's Build Together
          </Link>
        </MagneticButton>
      </motion.section>
    </div>
  );
}

// --- Subcomponents ---

function MetricCard({ end, suffix, prefix = "", label, decimals = 0 }: { end: number; suffix: string; prefix?: string; label: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * end);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center text-center p-4 relative z-10"
      variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }}
    >
      <div className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-2 flex items-baseline">
        {prefix && <span className="text-accent mr-0.5">{prefix}</span>}
        <span>{decimals > 0 ? display.toFixed(decimals) : Math.round(display)}</span>
        <span className="text-accent ml-1">{suffix}</span>
      </div>
      <div className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

function EcosystemCard({ icon, title, description, animationType }: { icon: React.ReactNode; title: string; description: string; animationType: string }) {
  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col gap-4 p-8 rounded-2xl glass-panel group transition-colors hover:bg-white/[0.04] relative overflow-hidden"
    >
      {/* Hover glow sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      {/* Bottom ambient line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="flex justify-between items-start relative z-10">
        <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div className="h-8 w-8 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
          <MicroAnimation type={animationType} />
        </div>
      </div>

      <h3 className="text-xl font-display font-medium text-foreground mt-2 relative z-10">{title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed relative z-10">{description}</p>
    </motion.div>
  );
}

function MicroAnimation({ type }: { type: string }) {
  if (type === "pulse") return (
    <motion.div className="w-2 h-2 rounded-full bg-accent"
      animate={{ scale: [1, 2, 1], opacity: [1, 0.4, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }} />
  );
  if (type === "shield") return (
    <motion.div className="w-4 h-4 border border-indigo-400 rounded-sm"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
  );
  if (type === "layers") return (
    <div className="flex flex-col gap-1">
      {[0, 0.2, 0.4].map((d, i) => (
        <motion.div key={i} className="h-0.5 bg-primary rounded-full" style={{ width: i === 1 ? 12 : 16 }}
          animate={{ x: [0, i === 1 ? -3 : 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: d }} />
      ))}
    </div>
  );
  if (type === "chart") return (
    <div className="flex items-end gap-0.5 h-4">
      {[[40, 100], [80, 30], [60, 90]].map(([a, b], i) => (
        <motion.div key={i} className="w-1 bg-pink-500 rounded-t-sm"
          animate={{ height: [`${a}%`, `${b}%`, `${a}%`] }}
          transition={{ duration: 1 + i * 0.2, repeat: Infinity }} />
      ))}
    </div>
  );
  if (type === "mobile") return (
    <motion.div className="w-3 h-5 border border-emerald-400 rounded-sm relative"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-emerald-400 rounded-full" />
    </motion.div>
  );
  if (type === "glow") return (
    <motion.div className="w-3 h-3 bg-amber-400 rounded-full blur-[2px]"
      animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }} />
  );
  return null;
}
