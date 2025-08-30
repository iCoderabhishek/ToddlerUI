import React from "react";
import { motion } from "motion/react";

function HoveredBox() {
  return (
    <div
      className="[perspective::1000px] [transform-style:preserve-3d] h-screen w-full bg-neutral-950 flex items-center justify-center "
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 1px, transparent 0.5px)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
    >
      <motion.button
        initial={{ rotate: 0 }}
        whileHover={{
          rotateX: 25,
          rotateY: 10,
          boxShadow: "0px 20px 50px rgba(8,112,184,0.7)",
          y: -5,
        }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.3, ease: "anticipate" }}
        style={{ translateZ: 100 }}
        className="group relative text-neutral-500 px-12 py-4 rounded-lg bg-black shadow-[0px_1px_2px_0px_rgb(255,255,255,0,1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0,1)_inset"
      >
        <span className="group-hover:text-cyan-500 transition-colors duration-300">
          Hover
        </span>
        <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-500 h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-px bg-gradient-to-r from-transparent via-cyan-500 h-[4px] w-full blur-sm mx-auto"></span>
      </motion.button>
    </div>
  );
}

export default HoveredBox;
