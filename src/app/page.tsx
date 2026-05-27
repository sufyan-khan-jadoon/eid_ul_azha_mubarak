"use client";

import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicLoader from "@/components/CinematicLoader";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import EidMessage from "@/components/EidMessage";
import MouseGlow from "@/components/MouseGlow";
import Footer from "@/components/Footer";
import MoonBackground from "@/components/MoonBackground";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Cinematic Loader */}
      <CinematicLoader onComplete={() => setLoaded(true)} />

      {/* Mouse glow effect */}
      <MouseGlow />

      {/* Real moon photograph background */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
          >
            <MoonBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Background Scene */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {loaded && (
          <motion.main
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Cinematic top gradient */}
            <div className="fixed top-0 left-0 right-0 h-32 z-20 pointer-events-none bg-gradient-to-b from-[#050505] to-transparent" />

            {/* Hero */}
            <HeroSection />

            {/* Decorative separator */}
            <div className="relative z-10 flex justify-center py-4">
              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold/20" />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className="text-gold/30"
                >
                  <rect
                    x="3"
                    y="3"
                    width="6"
                    height="6"
                    transform="rotate(45 6 6)"
                    fill="currentColor"
                  />
                </svg>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold/20" />
              </motion.div>
            </div>

            {/* Quranic Quote */}
            <QuoteSection />

            {/* Eid Message & Blessings */}
            <EidMessage />

            {/* Footer */}
            <Footer />

            {/* Cinematic bottom gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-24 z-20 pointer-events-none bg-gradient-to-t from-[#050505] to-transparent" />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Full-screen vignette */}
      <div className="fixed inset-0 pointer-events-none z-30 vignette" />
    </>
  );
}
