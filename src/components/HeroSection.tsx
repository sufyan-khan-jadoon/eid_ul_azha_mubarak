"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return offset;
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallax = useParallax();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  };

  const handleImageMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
    >
      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left — Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          style={{
            transform: `translate(${parallax.x * -8}px, ${parallax.y * -5}px)`,
          }}
        >
          {/* Ornamental line */}
          <motion.div
            className="flex items-center gap-3 justify-center lg:justify-start mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">
              A Blessed Celebration
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-serif"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold-gradient text-glow leading-[1.1] mb-2">
              Eid ul Azha
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gold-gradient text-glow leading-[1.05]">
              Mubarak
            </span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center gap-4 justify-center lg:justify-start my-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="h-[1px] flex-1 max-w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold">
              <path
                d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8Z"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
            <div className="h-[1px] flex-1 max-w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          {/* From line */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-moonlight/80 font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            From{" "}
            <span className="text-gold-gradient font-serif font-semibold text-2xl sm:text-3xl">
              Sufyan Khan
            </span>
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-sm sm:text-base text-moonlight/40 max-w-md mx-auto lg:mx-0 leading-relaxed tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            May this blessed occasion bring peace to your heart,
            <br className="hidden sm:block" />
            joy to your home, and warmth to your soul.
          </motion.p>
        </motion.div>

        {/* Right — Cinematic Photo */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative group cursor-pointer"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
            style={{
              perspective: "1000px",
              transform: `translate(${parallax.x * 12}px, ${parallax.y * 8}px)`,
            }}
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-8 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)",
              }}
            />

            {/* Glass frame */}
            <motion.div
              className="relative rounded-2xl overflow-hidden glass"
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Gold border glow */}
              <div className="absolute inset-0 rounded-2xl border border-gold/20 z-10 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
                }}
              />

              {/* The image */}
              <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] md:w-[360px] md:h-[480px]">
                <Image
                  src="/image.png"
                  alt="Sufyan Khan"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                  priority
                />
              </div>

              {/* Cinematic overlay gradient */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.1) 0%, transparent 30%, transparent 60%, rgba(5,5,5,0.6) 100%)",
                }}
              />

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <p className="text-gold/60 text-xs tracking-[0.3em] uppercase">
                  Sufyan Khan
                </p>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" className="text-gold/30">
                <path
                  d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-4 h-4"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" className="text-gold/20">
                <path
                  d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
