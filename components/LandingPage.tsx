"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Apple, Beer, Coffee, Sparkle } from "lucide-react";
import SparkleButton from "./SparkleButton";
import NeonButton from "./NeonButton";
import CoolTodo from "./CoolTodo";
import FlyTestimonial from "./FlyTestimonial";
import CookieCard from "./CookieCard";
import HoveredBox from "./HoveredBox";
import CardSplitMenu from "./CardSplitMenu";
import OrbitAnimation from "./OrbitMotion";
import FeaturesGrid from "./FeatureGrid";
import { GitHubStarsButton } from "./GithubStarts";
import { FunRotatingText } from "./RotatingText";
import Link from "next/link";
import FloatingNavbar from "./FloatingNav";

export default function LandingPage() {
  return (
    <div className="min-h-screen  bg-white p-8 mb-2">
      <FloatingNavbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-auto">
        {/* Large Hero (spanning 3 cols x 2 rows) */}
        <div className="relative col-span-3 h-auto row-span-2 rounded-2xl bg-amber-50 p-8 flex flex-col justify-center border border-neutral1-200">
          <h1 className="text-5xl font-bold bg-gradient-to-tl from-black  to-neutral-600 text-transparent bg-clip-text inline-block">
            Quickly integrate UI components into your project.
          </h1>
          <div className="flex flex-col gap-2 py-2">
            <p className="text-neutral-500 mt-2 text-md">
              Copy code. Paste it. Enjoy your component!
            </p>
          </div>

          <motion.button
            animate={{
              y: [-9, -14, -9], // jump up & down
              boxShadow: [
                "0 0 10px rgba(0,0,0,0.5)",
                "0 15px 25px rgba(0,0,0,0.3)",
                "0 0 10px rgba(0,0,0,0.5)",
              ],
              rotateX: 25,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-4 max-w-md flex items-center gap-2 cursor-pointer rounded-2xl bg-gradient-to-tl from-black to-neutral-600 text-white px-4 py-2 hover:opacity-90 transition"
          >
            <Link
              href="https://x.com/0bhishek"
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-white">
                <Image
                  src="/x-social-media-black-icon.svg"
                  width={16}
                  height={16}
                  alt="X"
                />
              </div>
              <span className="font-medium">Follow for updates</span>
            </Link>
          </motion.button>
        </div>
        {/* Tall Block */}
        <div className="col-span-3 row-span-2 rounded-2xl bg-neutral-100 border border-amber-100 p-6 flex items-center justify-center relative">
          {/* Corner label */}
          <span className="absolute top-2 left-2 z-10 text-xs font-medium tracking-wide uppercase text-amber-600 bg-amber-50 px-2 py-0.5  rounded-full shadow-sm">
            COOL TODO
          </span>

          <div className="flex flex-col gap-2">
            <Link
              href="/components/cool-todo"
              className="col-span-2 row-span-2"
            >
              <h1 className="bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-xl font-bold">
                Try tapping the todos
              </h1>
            </Link>
            <CoolTodo
              todos={[
                { id: 1, title: "Vibe code", completed: false },
                { id: 2, title: "Eat", completed: false },
                { id: 3, title: "Go to sleep", completed: false },
                { id: 4, title: "Wake Up", completed: false },
                { id: 5, title: "Repeat", completed: false },
              ]}
            />
          </div>
        </div>

        {/* Wide Block */}
        {/* Small cards */}
        <div className="col-span-2 rounded-2xl relative">
          {/* Fixed Cookie Card (overrides everything) */}
          <div className="fixed bottom-6 left-6 z-[9999]">
            <CookieCard
              heading="Taste our cookies 🍪"
              placement="bottom-left"
              className="bg-purple-200 shadow-xl"
              message="Cookies component"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Text Animations Card */}
            <Link href="/components/text-animations" className="relative block">
              <div className="bg-neutral-100 rounded-2xl p-2 border border-amber-100 h-full">
                <h1 className="pt-4 text-center bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-md font-bold">
                  Text Animations
                </h1>
                <FunRotatingText
                  text={[
                    "Playful Animations ",
                    "Made by Todlerr",
                    "Nothing Fancy",
                  ]}
                />
              </div>
              <p className="absolute top-2 right-2 text-[10px] font-semibold bg-neutral-700 text-neutral-50 px-2 py-1 rounded-md shadow">
                Text Animations
              </p>
            </Link>

            {/* Sparkle Button Card */}
            <Link href="/components/sparkle-button" className="relative block">
              <div className="bg-neutral-100 border border-amber-100 rounded-2xl p-2 h-full">
                <h1 className="pt-4 text-center bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-md font-bold">
                  Sparkle Button
                </h1>
                <div className="flex justify-center py-4">
                  <SparkleButton />
                </div>
              </div>
              <p className="absolute top-2 right-2 text-[10px] font-semibold bg-neutral-700 text-neutral-50 px-2 py-1 rounded-md shadow">
                Sparkle Button
              </p>
            </Link>

            {/* GitHub Stars Card */}
            <div className="relative block col-span-2">
              <div className="bg-neutral-100 border border-amber-100 rounded-2xl p-2 h-full flex flex-col justify-center items-center">
                <h1 className="pt-4 text-center bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-md font-bold">
                  GitHub Stars
                </h1>
                <div className="flex justify-center py-4">
                  <GitHubStarsButton
                    repo="todlerrui/todlerrui"
                    username=""
                    className="bg-neutral-100 border border-amber-100 rounded-xl p-2"
                  />
                </div>
              </div>
              <Link href={"/components/github-stars"}>
                <p className="absolute top-2 right-2 text-[10px] font-semibold bg-neutral-700 text-neutral-50 px-2 py-1 rounded-md shadow">
                  GitHub Stars
                </p>
              </Link>
            </div>
            {/* card split */}
            {/* Card Split Menu */}
            <div className="relative block col-span-2 cursor-pointer">
              <div className="bg-neutral-100 border border-amber-100 rounded-2xl p-2 h-full flex flex-col justify-center items-center">
                <h1 className="pt-4 text-center bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-md font-bold">
                  Split Menu
                </h1>
                <div className="flex justify-center py-4 ">
                  <CardSplitMenu
                    direction="right"
                    items={[
                      {
                        icon: <Beer />,
                        name: "Beer",
                        value: "beer",
                        metadata: { description: "A refreshing drink" },
                      },
                      {
                        icon: <Coffee />,
                        name: "Coffee",
                        value: "coffee",
                        metadata: {
                          description: "Wake up and smell the coffee",
                        },
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Corner label */}
              <Link href={"/components/card-split-menu"}>
                <p className="absolute top-2 right-2 text-[10px] font-semibold bg-neutral-700 text-neutral-50 px-2 py-1 rounded-md shadow">
                  Card Split Menu
                </p>
              </Link>
            </div>
          </div>
          {/* Placeholder / Coming Soon card to fill gap */}
          <div className="relative block flex-1 mt-4">
            <div className="bg-neutral-50 border border-dashed border-amber-200 rounded-xl p-2 h-full flex items-center justify-center">
              <span className="text-neutral-400 text-sm font-medium">
                You can ask for new components (:D)
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex cursor-pointer flex-col justify-center items-center border border-amber-50 bg-neutral-100 col-span-2 row-span-2 aspect-square p-6 relative overflow-hidden rounded-2xl"
          style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
        >
          <Link href={"/components/fly-testimonial"}>
            <p className="absolute top-3 left-3 text-xs font-medium tracking-wide uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md w-fit shadow-sm">
              Fly Testimonial
            </p>
          </Link>

          <Link
            href="/components/fly-testimonial"
            className="col-span-2 row-span-2"
          >
            <h1 className="bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-xl font-bold">
              Try touching the cards
            </h1>
          </Link>

          <FlyTestimonial speed="fast" font="arial" />
        </div>

        <Link
          href="/components/orbit-animation"
          className="col-span-2 row-span-2 relative block"
        >
          {/* Corner label (sits outside the overflow div) */}
          <span className="absolute top-2 left-2 z-10 text-xs font-medium tracking-wide uppercase text-amber-600 bg-amber-50 px-2 py-0.5   rounded-full shadow-sm">
            Orbit Animation
          </span>

          <div className="flex flex-col justify-center items-center border border-amber-100 bg-neutral-50 aspect-square p-6 relative overflow-hidden rounded-xl">
            <OrbitAnimation />
          </div>
        </Link>
      </div>
      <Link href="/components/feature-cards" className="block relative">
        <div className="border flex flex-col justify-center border-amber-50 bg-neutral-100  mt-20 rounded-2xl">
          <span className="absolute top-2 left-2 z-10 text-xs font-medium tracking-wide uppercase text-amber-600 bg-amber-50 px-2 py-0.5   rounded-full shadow-sm">
            Feature Cards
          </span>

          <h1 className="pt-4 text-center bg-gradient-to-br from-neutral-500 to-black text-transparent bg-clip-text text-xl font-bold">
            ...and moree!
          </h1>
          <FeaturesGrid featuresArray={featuresArray} />
        </div>
      </Link>
      <div className="grid grid-cols-3 row-span-1 gap-4 auto-rows-[200px] bg-neutral-100 mt-3"></div>
    </div>
  );
}

const featuresArray = [
  {
    id: 1,
    title: "Beautiful Components",
    description:
      "Pre-built, minimal, and stylish UI components ready to drop into your project.",
    iconUrl:
      "https://framerusercontent.com/images/2uFL5TmA8WQRvj0Ebn4lQiVnC6w.svg",
  },
  {
    id: 2,
    title: "Copy & Paste Ready",
    description:
      "No installation needed — grab the code and use it instantly in React or Next.js.",
    iconUrl:
      "https://framerusercontent.com/images/bETpr23FcycPpDEVRNWUBZp0cY.svg",
  },
  {
    id: 3,
    title: "Modern Stack",
    description:
      "Built with Tailwind CSS v4, Framer Motion, and Next.js for the latest developer experience.",
    iconUrl:
      "https://framerusercontent.com/images/KdSgRUeowWQPPaGZY0WatpAGvPs.svg",
  },
  {
    id: 4,
    title: "Customizable",
    description:
      "Easily tweak animations, styles, and layouts to match your brand identity.",
    iconUrl:
      "https://framerusercontent.com/images/qsV5rO9Z0v9AJ5BPcJjI9yPmU.svg",
  },
  {
    id: 5,
    title: "Responsive by Default",
    description:
      "All components are designed to work seamlessly across mobile, tablet, and desktop.",
    iconUrl:
      "https://framerusercontent.com/images/qsV5rO9Z0v9AJ5BPcJjI9yPmU.svg",
  },
  {
    id: 6,
    title: "Minimal Setup",
    description:
      "Drop components into your project without worrying about configs or boilerplate.",
    iconUrl:
      "https://framerusercontent.com/images/qsV5rO9Z0v9AJ5BPcJjI9yPmU.svg",
  },
];
