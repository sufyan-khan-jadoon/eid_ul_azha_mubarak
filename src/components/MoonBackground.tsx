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
      {/* Moon image — positioned upper right, parallax reactive */}
      <motion.div
        className="absolute"
        style={{
          top: "-5%",
          right: "-8%",
          width: "clamp(350px, 45vw, 700px)",
          height: "clamp(525px, 67vw, 1050px)",
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -10}px)`,
          transition: "transform 0.3s ease-out",
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Soft lunar glow behind the moon */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[45%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 195, 180, 0.12) 0%, rgba(200, 195, 180, 0.04) 50%, transparent 70%)",
          }}
        />

        {/* The real moon photograph */}
        <Image
          src="/moon.jpg"
          alt="Crescent Moon"
          fill
          className="object-contain"
          style={{ mixBlendMode: "lighten" }}
          sizes="(max-width: 768px) 350px, 45vw"
          priority
        />
      </motion.div>

      {/* Subtle animated moonlight wash on the scene */}
      <motion.div
        className="absolute top-0 right-0 w-[50%] h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(200, 195, 180, 0.03) 0%, transparent 60%)",
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
