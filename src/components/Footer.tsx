"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/20" />
          <svg width="16" height="16" viewBox="0 0 100 100" className="text-gold/30">
            <path
              d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C35 85 28 68 28 50 C28 32 35 15 50 5Z"
              fill="currentColor"
            />
          </svg>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/20" />
        </div>

        <p className="text-moonlight/20 text-xs tracking-[0.3em] uppercase">
          Eid ul Azha Mubarak
        </p>

        <p className="text-moonlight/15 text-xs">
          Crafted with love by Sufyan Khan
        </p>
      </motion.div>
    </footer>
  );
}
