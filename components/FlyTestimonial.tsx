import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const reviewers = [
  {
    id: 1,
    name: "Mr. Abhishek",
    avatar:
      "https://pbs.twimg.com/profile_images/1792263106363564032/84ENGWSS_400x400.jpg",
    review:
      "TodlerrUI is super clean and minimal, exactly what I needed for my projects.",
  },
  {
    id: 2,
    name: "Mrs Jane",
    avatar: "https://i.pravatar.cc/150?img=6",
    review:
      "I love how smooth and modern the components feel, saves me so much time.",
  },
  {
    id: 3,
    name: "Mr. Dev",
    avatar: "https://i.pravatar.cc/150?img=7",
    review:
      "Integration was effortless, and the UI looks professional out of the box.",
  },
  {
    id: 4,
    name: "Mr. Arora",
    avatar: "https://i.pravatar.cc/150?img=8",
    review:
      "TodlerrUI helped me ship faster without compromising on design quality.",
  },
];

const speedMap = {
  slow: 1.2, // seconds
  normal: 0.8,
  medium: 0.5,
  fast: 0.3,
};

interface TestimonialProps {
  className?: string;
  font?: string;
  speed?: "slow" | "normal" | "medium" | "fast";
}
function FlyTestimonial({
  className = "",
  font = "font-serif",
  speed = "normal",
}: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flyDirection, setFlyDirection] = useState(null as string | null);

  const animationSpeed = speedMap[speed] ?? speedMap.normal;

  const handleFly = (direction: string) => {
    setFlyDirection(direction);

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % reviewers.length);
      setFlyDirection(null);
    }, animationSpeed * 1000);
  };

  return (
    <div
      className={`h-auto  flex flex-col items-center justify-center ${className} ${font}`}
    >
      <div className="relative  w-56 h-auto">
        {reviewers.map((reviewer, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={reviewer.id}
              drag
              dragConstraints={{
                left: -120,
                right: 120,
                top: -100,
                bottom: 10,
              }}
              animate={
                isActive && flyDirection === "left"
                  ? { x: -300, opacity: 0, rotate: -20 }
                  : isActive && flyDirection === "right"
                  ? { x: 300, opacity: 0, rotate: 20 }
                  : { x: 0, opacity: 1, rotate: index === 0 ? 6 : 7 }
              }
              transition={{ duration: animationSpeed, ease: "easeInOut" }}
              className={`absolute top-0 left-0 flex flex-col items-start justify-center h-auto w-56 border border-amber-900 bg-[#f7f7f7e2]  pt-4
                ${isActive ? "z-20" : "z-10"}`}
            >
              <h2 className="font-mono font-medium text-md px-4 flex items-center -tracking-normal">
                <img
                  className="w-8 h-8 rounded-[2px] mr-2"
                  src={reviewer.avatar}
                  alt="avatar"
                />
                {reviewer.name}
              </h2>
              <p className="px-4 py-3 flex-1 text-md font-semibold">
                "{reviewer.review}"
              </p>
            </motion.div>
          );
        })}

        <TestimonialButtons
          onLeftClick={() => handleFly("left")}
          onRightClick={() => handleFly("right")}
        />
      </div>
    </div>
  );
}

function TestimonialButtons({
  onLeftClick,
  onRightClick,
}: {
  onLeftClick: React.MouseEventHandler<HTMLButtonElement>;
  onRightClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="flex items-center justify-center px-2 py-1 rounded-lg gap-16 mt-48">
      <button onClick={onLeftClick} className="cursor-pointer bg-slate-200">
        <ArrowLeft className="text-3xl" />
      </button>

      <button onClick={onRightClick} className="cursor-pointer bg-slate-200">
        <ArrowRight className="text-3xl" />
      </button>
    </div>
  );
}

export default FlyTestimonial;
