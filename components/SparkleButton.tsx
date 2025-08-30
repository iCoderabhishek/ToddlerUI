"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function SparkleButton({ text = "Hover Me" }) {
  const [hovered, setHovered] = useState(false);

  // Sparkle positions (could be randomized for variety)
  const sparkles = [
    { x: -40, y: -10 },
    { x: 50, y: -20 },
    { x: -20, y: 40 },
    { x: 70, y: 30 },
  ];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Button */}
      <motion.button
        className="px-6 py-2 cursor-pointer rounded-md border-2 border-amber-400 text-amber-600 font-medium relative overflow-hidden perspective-dramatic"
        animate={{
          boxShadow: hovered
            ? "0 0 20px rgba(251, 191, 36, 1)" // amber-200 in RGBA
            : "0 0 0px rgba(251, 191, 36, 0)", // no shadow when not hovered
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: hovered ? -10 : 0, x: 0 }}
      >
        {text}
      </motion.button>
      <div className="absolute inset-x-0 -bottom-px h-px w-full bg-red-500 bg-gradient-to-r from transparent via-sky-600 to transparent" />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-amber-900 pointer-events-none"
          style={{ left: s.x, top: s.y }}
          animate={{
            scale: hovered ? [0, 1.2, 0] : 0,
            opacity: hovered ? [0, 1, 0] : 0,
            rotate: [0, 360],
          }}
          transition={{
            repeat: hovered ? Infinity : 0,
            duration: 1.5,
            delay: i * 0.3,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

export default SparkleButton;
