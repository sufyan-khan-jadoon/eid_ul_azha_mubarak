"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function IslamicStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon
        points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
        fill="currentColor"
      />
    </svg>
  );
}

export default function EidMessage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const blessings = [
    "May your sacrifice be accepted",
    "May your prayers be answered",
    "May your heart find peace",
    "May your home be filled with joy",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-32 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative top */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold/50" />
          <IslamicStar className="w-4 h-4 text-gold/60" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Arabic-style "Eid Mubarak" ornamental */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-gold text-xl tracking-[0.5em] uppercase font-medium">
            عيد الأضحى مبارك
          </p>
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gold-gradient text-glow leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Wishing You a Blessed
          <br />
          Eid ul Azha
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-moonlight/80 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          On this sacred day of sacrifice and devotion, may the spirit of
          Eid bring you closer to your loved ones, fill your heart with
          gratitude, and bless you with endless happiness.
        </motion.p>

        {/* Blessing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {blessings.map((blessing, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-6 group hover:border-gold/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <p className="text-moonlight text-sm sm:text-base font-semibold tracking-wide group-hover:text-gold transition-colors duration-500">
                {blessing}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="text-moonlight/70 text-sm font-semibold tracking-[0.3em] uppercase">
            With love & prayers
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">
            Sufyan Khan
          </p>
        </motion.div>

        {/* Decorative bottom */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold/50" />
          <IslamicStar className="w-4 h-4 text-gold/60" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>
      </div>
    </section>
  );
}
