"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MoonBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Moon image — top center, fully blended */}
      <motion.div
        className="absolute left-1/2"
        style={{
          top: "-12%",
          width: "clamp(400px, 50vw, 800px)",
          height: "clamp(600px, 75vw, 1200px)",
          marginLeft: "calc(-1 * clamp(200px, 25vw, 400px))",
          transform: `translate(${mouse.x * -10}px, ${mouse.y * -8}px)`,
          transition: "transform 0.3s ease-out",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        {/* Soft lunar glow behind the moon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 195, 180, 0.15) 0%, rgba(200, 195, 180, 0.05) 40%, transparent 70%)",
          }}
        />

        {/* The real moon photograph */}
        <Image
          src="/moon.png"
          alt="Crescent Moon"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 400px, 50vw"
          priority
        />
      </motion.div>

      {/* Centered moonlight wash */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(200, 195, 180, 0.04) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
