"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { label: "Web & SaaS Platforms" },
  { label: "Mobile Systems" },
  { label: "Infrastructure & OS" },
  { label: "Cybersecurity" },
  { label: "Trading Technology" },
  { label: "Digital Growth" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight">
              NEXORYN
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              Engineering intelligent digital systems that scale, secure, and endure.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="mailto:hello@nexoryn.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-fit"
              >
                <Mail className="w-3.5 h-3.5" />
                hello@nexoryn.com
              </a>
              <a
                href="mailto:build@nexoryn.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors w-fit"
              >
                <Mail className="w-3.5 h-3.5" />
                build@nexoryn.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Navigation</span>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Services</span>
            <ul className="flex flex-col gap-2">
              {services.map(({ label }) => (
                <li key={label}>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Start Building</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ready to engineer something exceptional? Let's talk.
            </p>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all px-4 py-2.5 rounded-xl w-fit"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Nexoryn. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-muted-foreground/60">Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
