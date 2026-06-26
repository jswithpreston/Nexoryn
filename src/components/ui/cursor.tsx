"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorState = "default" | "hover" | "text";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastParticle = useRef({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 500, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Spawn particle if moved enough
      const dx = e.clientX - lastParticle.current.x;
      const dy = e.clientY - lastParticle.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 12) {
        lastParticle.current = { x: e.clientX, y: e.clientY };
        const id = particleId.current++;
        setParticles(prev => [
          ...prev.slice(-8),
          { id, x: e.clientX, y: e.clientY, opacity: 0.5, scale: 1 }
        ]);
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 500);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.closest("a");
      const isButton = target.tagName === "BUTTON" || target.closest("button");
      const isText = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if (isText) setState("text");
      else if (isLink || isButton) setState("hover");
      else setState("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  const size = state === "hover" ? 56 : state === "text" ? 4 : 28;
  const bgOpacity = state === "hover" ? "bg-white/10" : "bg-white/5";

  return (
    <>
      {/* Particle trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full bg-accent"
          style={{ translateX: "-50%", translateY: "-50%" }}
          initial={{ x: p.x, y: p.y, width: 4, height: 4, opacity: 0.4 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 z-[100] pointer-events-none rounded-full border border-white/25 ${bgOpacity} backdrop-blur-sm mix-blend-difference flex items-center justify-center`}
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      >
        {state === "hover" && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        <motion.div
          className="w-1 h-1 bg-white rounded-full"
          animate={{ scale: state === "text" ? 0 : 1, opacity: state === "text" ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
