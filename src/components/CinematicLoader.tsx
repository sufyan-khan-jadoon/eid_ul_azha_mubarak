"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

function CrescentMoonSVG() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d478" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C35 85 28 68 28 50 C28 32 35 15 50 5Z"
        fill="url(#moonGrad)"
        filter="url(#moonGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* Star */}
      <motion.circle
        cx="68"
        cy="30"
        r="3"
        fill="#f0d478"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </motion.svg>
  );
}

function GoldenParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #f0d478, #d4af37)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(212, 175, 55, 0.6)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function CinematicLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">(
    "loading"
  );

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase("revealing"), 2800);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      handleComplete();
    }, 3800);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow behind moon */}
          <motion.div
            className="absolute"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <GoldenParticles />

          <div className="relative flex flex-col items-center gap-8">
            <CrescentMoonSVG />

            {/* Bismillah-inspired ornamental text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <p
                className="text-gold-gradient text-sm tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Preparing your experience
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-[1px] overflow-hidden"
              style={{ background: "rgba(212, 175, 55, 0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #d4af37, transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* Corner ornaments */}
          {[
            "top-8 left-8",
            "top-8 right-8 rotate-90",
            "bottom-8 left-8 -rotate-90",
            "bottom-8 right-8 rotate-180",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path
                  d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20Z"
                  fill="#d4af37"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
