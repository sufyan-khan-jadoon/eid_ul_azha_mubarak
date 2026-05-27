"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 py-24 px-4">
      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center">
        {/* Opening quote mark */}
        <motion.div
          className="text-gold/15 text-8xl font-serif leading-none mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          &ldquo;
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          className="font-serif text-xl sm:text-2xl md:text-3xl text-moonlight/60 leading-relaxed font-light italic"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          It is not their meat nor their blood that reaches Allah;
          it is your piety that reaches Him.
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="h-[1px] w-12 mx-auto bg-gold/20" />
          <p className="text-gold/40 text-sm tracking-[0.3em] uppercase mt-4">
            Surah Al-Hajj 22:37
          </p>
        </motion.div>
      </div>
    </section>
  );
}
