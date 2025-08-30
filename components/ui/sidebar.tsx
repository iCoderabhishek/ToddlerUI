"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarCategory } from "@/types";
import Image from "next/image";
import { motion } from "motion/react";

interface SidebarProps {
  categories: SidebarCategory[];
}

export function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="fixed top-30 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 lg:sticky lg:block lg:self-start">
      <div>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 hover:opacity-95 transition"
          aria-label="TodlerrUI Home"
        >
          <Image
            src="/logo.png"
            width={50}
            height={50}
            alt="TodlerrUI"
            priority
            className="shrink-0"
          />
          <span className="text-lg font-light tracking-tight from-neutral-800 via-neutral-900 to-black">
            TodlerrUI
          </span>
        </Link>
      </div>
      <motion.button
        animate={{
          y: [-9, -14, -9], // jump up & down
          boxShadow: [
            "0 0 5px rgba(0,0,0,0.5)",
            "0 5px 25px rgba(0,0,0,0.3)",
            "0 0 10px rgba(0,0,0,0.5)",
          ],
          rotateX: 25,
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-4 max-w-md flex items-center gap-2 cursor-pointer rounded-2xl  bg-gradient-to-b from bg-amber-100 to-neutral-200 text-neutral-700 px-4 py-2 hover:opacity-90 transition"
      >
        <Link href="https://x.com/0bhishek" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white">
            <Image
              src="/x-social-media-black-icon.svg"
              width={16}
              height={16}
              alt="X"
            />
          </div>
          <span className="font-medium" >Follow for updates</span>
        </Link>
      </motion.button>
      <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
        <div className="h-full w-full rounded-[inherit] overflow-y-auto">
          <div className="w-full">
            {categories.map((category, index) => (
              <div key={index} className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-amber-900">
                  {category.title}
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className={cn(
                        "group relative flex w-full items-center rounded-md border border-transparent px-2 py-1 transition duration-200 hover:translate-x-1 hover:text-amber-800",
                        item.active
                          ? "text-amber-800 font-medium bg-amber-100"
                          : "text-amber-700 hover:bg-amber-50"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
