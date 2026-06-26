"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 glass-panel">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 justify-between">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
            NEXORYN
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-1 transition-colors ${active ? "text-white" : "text-muted-foreground hover:text-white"}`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton intensity={0.4}>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                Start a Project
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-[#0A0A0A] border-l border-white/10 flex flex-col p-8 gap-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close */}
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-lg">NEXORYN</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-muted-foreground hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2">
                {links.map(({ href, label }, i) => {
                  const active = pathname === href;
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                          active
                            ? "bg-white/5 text-white border border-white/10"
                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        )}
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-base font-medium w-full hover:bg-white/90 transition-colors"
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
