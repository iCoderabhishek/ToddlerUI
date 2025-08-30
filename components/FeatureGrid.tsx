"use client";

import { useState } from "react";
import { motion, AnimatePresence, TargetAndTransition } from "motion/react";

// Feature type
export interface Feature {
  id: number | string;
  title: string;
  description: string;
  iconUrl?: string;
}

// Animated floating circles
interface AnimatedCirclesProps {
  floating?: boolean;
  colors?: string[]; // optional custom colors
  size?: number; // optional circle size
}

const AnimatedCircles = ({
  floating,
  colors = ["#F472B6", "#A78BFA", "#FACC15", "#4ADE80"],
  size = 8,
}: AnimatedCirclesProps) => {
  const circleVariants: Record<string, TargetAndTransition> = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const floatingTransition: TargetAndTransition = {
    y: floating ? [0, -4, 0] : 0,
    x: floating ? [0, 3, 0] : 0,
    transition: floating
      ? { repeat: Infinity, repeatType: "mirror", duration: 2 }
      : { duration: 0 },
  };

  const positions = [
    "top-4 left-4",
    "top-4 right-4",
    "bottom-4 left-4",
    "bottom-4 right-4",
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} rounded-full shadow-inner`}
          style={{
            width: size,
            height: size,
            backgroundColor: colors[i % colors.length],
          }}
          variants={circleVariants}
          transition={{ delay: 0.1 * (i + 1) }}
          animate={floatingTransition}
        />
      ))}
    </>
  );
};

// FeatureCard props
interface FeatureCardProps {
  feature: Feature;
  size?: { width?: string; height?: string };
  hoverBgColor?: string;
  floatingCircles?: boolean;
}

const FeatureCard = ({
  feature,
  size = { width: "w-full", height: "h-64" },
  hoverBgColor = "#FEF3C7",
  floatingCircles = true,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center p-6 border border-gray-200 rounded-2xl bg-white shadow-lg ${size.width} ${size.height}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.06 : 1,
        rotateX: isHovered ? -6 : 0,
        rotateY: isHovered ? 6 : 0,
        boxShadow: isHovered
          ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          : "0 10px 20px rgba(0,0,0,0.1)",
        backgroundColor: isHovered ? hoverBgColor : "#FFFFFF",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 14,
        mass: 0.8,
      }}
      style={{ perspective: 1200 }}
    >
      {/* Default content */}
      <motion.div
        className="flex flex-col items-center justify-center space-y-4 absolute inset-0"
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center justify-center w-12 h-12 p-2 bg-gray-100 rounded-xl shadow-sm"
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <img src={feature.iconUrl} alt={feature.title} className="w-8 h-8" />
        </motion.div>
        <h3 className="text-gray-900 text-md font-semibold text-center">
          {feature.title}
        </h3>
      </motion.div>

      {/* Hover content */}
      <motion.div
        className="flex flex-col items-center justify-center space-y-2 p-6 absolute inset-0"
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.h3
          className="text-gray-900 text-md font-semibold text-center"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3 }}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          className="text-gray-600 text-center text-xm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {feature.description}
        </motion.p>

        {/* Floating circles */}
        <AnimatedCircles floating={isHovered && floatingCircles} />
      </motion.div>
    </motion.div>
  );
};

// FeaturesGrid props
interface FeaturesGridProps {
  featuresArray?: Feature[];
  cardSize?: { width?: string; height?: string };
  hoverBgColor?: string;
  floatingCircles?: boolean;
}

const FeaturesGrid = ({
  featuresArray,
  cardSize,
  hoverBgColor,
  floatingCircles = true,
}: FeaturesGridProps) => {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {featuresArray?.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            size={cardSize}
            hoverBgColor={hoverBgColor}
            floatingCircles={floatingCircles}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
