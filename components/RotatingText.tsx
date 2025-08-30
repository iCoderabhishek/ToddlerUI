"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  text: string[];
  duration?: number;
  transition?: Transition;
  containerClassName?: string;
};

export function FunRotatingText({
  text,
  duration = 2000,
  transition = { duration: 0.5, ease: "easeOut" },
  containerClassName,
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, duration);
    return () => clearInterval(interval);
  }, [text, duration]);

  const currentText = text[index];

  return (
    <div
      className={cn(
        "overflow-hidden h-10 flex items-center justify-center",
        containerClassName
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          initial={{ opacity: 0, y: 20, rotate: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, rotate: 10, scale: 0.9 }}
          transition={transition}
          className="text-lg font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-950 bg-clip-text text-transparent drop-shadow-sm"
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
