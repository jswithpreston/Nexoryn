"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const smoothX = useSpring(mouseX, { damping: 60, stiffness: 80, mass: 1.5 });
  const smoothY = useSpring(mouseY, { damping: 60, stiffness: 80, mass: 1.5 });

  useEffect(() => {
    setIsMounted(true);
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReduced]);

  // Canvas grid — pauses on hidden tab, skips if reduced motion
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;
    let paused = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (paused) return;
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 64;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * gridSize;
          const py = y * gridSize;
          const wave = Math.sin(t + x * 0.3 + y * 0.2) * 0.5 + 0.5;
          const alpha = 0.02 + wave * 0.025;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.5;
          if (x < cols - 1) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + gridSize, py); ctx.stroke(); }
          if (y < rows - 1) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + gridSize); ctx.stroke(); }
        }
      }

      // Primary scan sweep
      const sweepY = ((t * 0.15) % 1) * canvas.height;
      const sg = ctx.createLinearGradient(0, sweepY - 80, 0, sweepY + 80);
      sg.addColorStop(0, "rgba(79,70,229,0)"); sg.addColorStop(0.5, "rgba(79,70,229,0.04)"); sg.addColorStop(1, "rgba(79,70,229,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, sweepY - 80, canvas.width, 160);

      // Accent sweep
      const s2Y = ((t * 0.07 + 0.5) % 1) * canvas.height;
      const sg2 = ctx.createLinearGradient(0, s2Y - 60, 0, s2Y + 60);
      sg2.addColorStop(0, "rgba(0,229,255,0)"); sg2.addColorStop(0.5, "rgba(0,229,255,0.025)"); sg2.addColorStop(1, "rgba(0,229,255,0)");
      ctx.fillStyle = sg2; ctx.fillRect(0, s2Y - 60, canvas.width, 120);

      // Node pulses
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (Math.sin(t * 2 + x * 1.7 + y * 1.3) > 0.97) {
            ctx.beginPath(); ctx.arc(x * gridSize, y * gridSize, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,229,255,0.4)"; ctx.fill();
          }
        }
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [prefersReduced]);

  if (!isMounted) return null;

  // Reduced motion: just a static bg
  if (prefersReduced) {
    return (
      <div className="fixed inset-0 -z-10 bg-[#050505] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/4 rounded-full blur-[120px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050505]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cursor-reactive glow */}
      <motion.div className="absolute w-[900px] h-[900px] rounded-full bg-primary/8 blur-[140px] mix-blend-screen"
        style={{ left: "50%", top: "50%", x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] mix-blend-screen"
        style={{ left: "50%", top: "50%", x: smoothX, y: smoothY, translateX: "-20%", translateY: "-80%" }}
      />

      {/* Atmospheric orbs */}
      <motion.div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-primary/6 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4], x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[130px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-accent/4 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2], x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
