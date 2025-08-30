"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [rotations, setRotations] = useState<number[]>([]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    // Set client-side flag and generate rotations only on client
    setIsClient(true);
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials.length]);

  useEffect(() => {
    if (autoplay && isClient) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isClient]);

  // Don't render dynamic content until client-side
  if (!isClient) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="relative h-80 w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.src}
                  className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out origin-bottom",
                    isActive(index)
                      ? "opacity-100 scale-100 z-40 rotate-0"
                      : "opacity-70 scale-95 z-10"
                  )}
                  style={{
                    transform: isActive(index)
                      ? "translateZ(0px) scale(1) rotate(0deg)"
                      : "translateZ(-100px) scale(0.95) rotate(0deg)",
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <div>
              <h3 className="text-2xl font-bold text-amber-900">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-amber-600">
                {testimonials[active].designation}
              </p>
              <p className="mt-8 text-lg text-amber-700">
                {testimonials[active].quote}
              </p>
            </div>
            <div className="flex gap-4 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 hover:bg-amber-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-amber-800 transition-transform duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 hover:bg-amber-300 transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-amber-800 transition-transform duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out origin-bottom",
                  isActive(index)
                    ? "opacity-100 scale-100 z-40 rotate-0"
                    : "opacity-70 scale-95 z-10"
                )}
                style={{
                  transform: isActive(index)
                    ? "translateZ(0px) scale(1) rotate(0deg)"
                    : `translateZ(-100px) scale(0.95) rotate(${
                        rotations[index] || 0
                      }deg)`,
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                }}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <div
            key={active}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <h3 className="text-2xl font-bold text-amber-900">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-amber-600">
              {testimonials[active].designation}
            </p>
            <p className="mt-8 text-lg text-amber-700">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="inline-block animate-in fade-in slide-in-from-bottom-1 duration-200"
                  style={{
                    animationDelay: `${index * 20}ms`,
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 hover:bg-amber-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-amber-800 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 hover:bg-amber-300 transition-colors"
            >
              <ArrowRight className="h-4 w-4 text-amber-800 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
