"use client";

import { useState, useRef } from "react";
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

type SubmitState = "idle" | "launching" | "done";

export default function ContactClient() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());

  const handleFocus = (name: string) => setFocusedField(name);
  const handleBlur = (name: string, value: string) => {
    setFocusedField(null);
    setFilledFields(prev => {
      const next = new Set(prev);
      if (value.trim()) next.add(name);
      else next.delete(name);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("launching");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mgojkvqj", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitState("done");
        form.reset();
        setFilledFields(new Set());
      } else {
        // Fallback: open mailto
        const name = data.get("firstName") + " " + data.get("lastName");
        const email = data.get("email") as string;
        const message = data.get("message") as string;
        window.location.href = `mailto:build@nexoryn.com?subject=Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        setSubmitState("idle");
      }
    } catch {
      window.location.href = "mailto:build@nexoryn.com?subject=Project Inquiry";
      setSubmitState("idle");
    }
  };

  const fields = ["firstName", "lastName", "email", "domain", "message"];
  const completedCount = filledFields.size;
  const formProgress = (completedCount / fields.length) * 100;

  return (
    <div className="flex flex-col lg:flex-row gap-16 py-12">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight">Let's Build Something Exceptional.</h1>
        </motion.div>

        <motion.p
          className="text-xl text-muted-foreground font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Whether you need a massive enterprise system overhauled, a secure mobile OS developed, or a complete digital growth strategy—our engineers are ready to execute.
        </motion.p>

        {/* Form progress indicator */}
        <motion.div
          className="flex flex-col gap-3 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Mission Brief Progress</span>
            <motion.span className="text-accent font-mono" animate={{ opacity: formProgress > 0 ? 1 : 0.4 }}>
              {Math.round(formProgress)}%
            </motion.span>
          </div>
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{ width: `${formProgress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
          <div className="flex gap-1.5 mt-1">
            {fields.map((f, i) => (
              <motion.div
                key={f}
                className="flex-1 h-1 rounded-full"
                animate={{ background: filledFields.has(f) ? "#00E5FF" : focusedField === f ? "#4F46E5" : "rgba(255,255,255,0.1)" }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Contact methods */}
        <motion.div
          className="flex flex-col gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <ContactMethod icon={<MessageSquare className="w-5 h-5 text-primary" />} title="General Inquiries" detail="hello@nexoryn.com" />
          <ContactMethod icon={<Mail className="w-5 h-5 text-accent" />} title="Engineering & Sales" detail="build@nexoryn.com" />
        </motion.div>
      </div>

      {/* Form side */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <form
          className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col gap-6 border border-white/10 relative overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Ambient glow that strengthens as form fills */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            animate={{ opacity: formProgress / 200, scale: 1 + formProgress / 400 }}
            style={{ background: "radial-gradient(circle, rgba(79,70,229,0.4), transparent)" }}
          />

          <h2 className="text-2xl font-display font-medium mb-2 relative z-10">Project Consultation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedInput name="firstName" label="First Name" placeholder="John" type="text" onFocus={handleFocus} onBlur={handleBlur} focusedField={focusedField} filled={filledFields.has("firstName")} />
            <AnimatedInput name="lastName" label="Last Name" placeholder="Doe" type="text" onFocus={handleFocus} onBlur={handleBlur} focusedField={focusedField} filled={filledFields.has("lastName")} />
          </div>

          <AnimatedInput name="email" label="Work Email" placeholder="john@company.com" type="email" onFocus={handleFocus} onBlur={handleBlur} focusedField={focusedField} filled={filledFields.has("email")} />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Project Domain</label>
            <motion.div
              className="relative"
              animate={{ borderColor: focusedField === "domain" ? "rgba(79,70,229,0.8)" : filledFields.has("domain") ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.1)" }}
            >
              <select
                name="domain"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white appearance-none"
                onFocus={() => handleFocus("domain")}
                onBlur={e => handleBlur("domain", e.target.value)}
              >
                {["Web / SaaS Platform", "Mobile System", "Infrastructure & OS", "Cybersecurity", "Digital Growth", "Other"].map(opt => (
                  <option key={opt} className="bg-black text-white">{opt}</option>
                ))}
              </select>
            </motion.div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">Project Details</label>
            <motion.textarea
              rows={4}
              name="message"
              className="bg-white/5 border rounded-xl px-4 py-3 focus:outline-none transition-colors text-white resize-none"
              placeholder="Tell us about your requirements, scale, and timeline..."
              animate={{ borderColor: focusedField === "message" ? "rgba(79,70,229,0.8)" : filledFields.has("message") ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.1)" }}
              onFocus={() => handleFocus("message")}
              onBlur={e => handleBlur("message", e.target.value)}
            />
          </div>

          {/* Launch button */}
          <AnimatePresence mode="wait">
            {submitState === "idle" && (
              <motion.div key="idle" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                <MagneticButton intensity={0.3} className="w-full">
                  <button type="submit" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition-all w-full group">
                    Launch Mission
                    <motion.span className="group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </button>
                </MagneticButton>
              </motion.div>
            )}

            {submitState === "launching" && (
              <motion.div
                key="launching"
                className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-primary/20 border border-primary/40 py-4 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Rocket className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="font-medium text-primary">Transmitting your brief…</span>
                <motion.div className="flex gap-1">
                  {[0, 0.15, 0.3].map(d => (
                    <motion.div key={d} className="w-1 h-1 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {submitState === "done" && (
              <motion.div
                key="done"
                className="mt-2 flex flex-col items-center justify-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 py-6 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <p className="font-medium text-emerald-400">Mission Brief Received</p>
                <p className="text-sm text-muted-foreground">Our engineering team will respond within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {submitState === "idle" && (
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Our engineering team typically responds within 24 hours.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

interface AnimatedInputProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  focusedField: string | null;
  filled: boolean;
  onFocus: (name: string) => void;
  onBlur: (name: string, value: string) => void;
}

function AnimatedInput({ name, label, placeholder, type, focusedField, filled, onFocus, onBlur }: AnimatedInputProps) {
  const isFocused = focusedField === name;
  return (
    <div className="flex flex-col gap-2">
      <motion.label
        className="text-sm font-medium transition-colors"
        animate={{ color: isFocused ? "#ffffff" : filled ? "#00E5FF" : "rgba(163,163,163,1)" }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {filled && (
          <motion.span className="ml-2 text-accent" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>✓</motion.span>
        )}
      </motion.label>
      <motion.div
        className="relative"
        animate={{
          boxShadow: isFocused
            ? "0 0 0 2px rgba(79,70,229,0.4), 0 0 20px rgba(79,70,229,0.15)"
            : filled
            ? "0 0 0 1px rgba(0,229,255,0.3)"
            : "none"
        }}
        style={{ borderRadius: 12 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-white/20"
          onFocus={() => onFocus(name)}
          onBlur={e => onBlur(name, e.target.value)}
        />
        {isFocused && (
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    </div>
  );
}

function ContactMethod({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors w-fit pr-8 cursor-pointer border border-transparent hover:border-white/10"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-lg text-white">{detail}</p>
      </div>
    </motion.div>
  );
}
