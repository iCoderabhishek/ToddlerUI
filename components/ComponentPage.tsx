"use client";

import React, { useState, useEffect, useRef, FC, SVGProps } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// --- UTILITY FUNCTION (as in lib/utils.ts) ---
/**
 * A utility function to merge Tailwind CSS classes conditionally.
 * @param inputs - A list of class values to merge.
 * @returns The merged class string.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- ICON COMPONENTS ---

const ArrowUpIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="4"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 15l6 -6l6 6"></path>
  </svg>
);

const VercelIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 40 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 text-current"
    {...props}
  >
    <path
      d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
      fill="currentColor"
    ></path>
    <path
      d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
      fill="currentColor"
    ></path>
  </svg>
);

const TerminalIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="15"
    width="15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8 9l3 3l-3 3"></path>
    <path d="M13 15l3 0"></path>
    <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
  </svg>
);

// --- REUSABLE UI COMPONENTS ---

interface PushButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PushButton: FC<PushButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md group",
        className
      )}
      {...props}
    >
      <span className="absolute h-full w-full bg-d-muted rounded-md" />
      <span className="absolute inset-0.5 h-[calc(100%-4px)] w-[calc(100%-4px)] translate-y-0.5 rounded-md bg-d-muted group-hover:translate-y-0 transition-transform duration-200 ease-in-out" />
      <span className="relative flex items-center justify-center text-d-fg/80 font-bold text-[10px] px-4 py-1.5">
        {children}
      </span>
    </button>
  );
};

interface TabGroupProps<T extends string> {
  tabs: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

const TabGroup = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabGroupProps<T>) => {
  return (
    <div
      className={cn(
        "bg-d-fg/5 text-d-fg flex w-fit gap-1 rounded-lg p-1 font-semibold text-xs",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "relative cursor-pointer rounded-sm active:scale-[0.98] px-3 py-1 transition-colors",
            activeTab !== tab && "hover:bg-d-fg/5"
          )}
        >
          <div className="relative z-10">{tab}</div>
          {activeTab === tab && (
            <motion.div
              layoutId="active-tab-indicator"
              className="bg-d-fg/10 absolute inset-0 rounded-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

// --- CORE COMPONENT: DYNAMIC SCROLL ISLAND ---

const DYNAMIC_ISLAND_SECTIONS = [
  "All",
  "Dogs",
  "Cats",
  "Birds",
  "Fish",
] as const;
type Section = (typeof DYNAMIC_ISLAND_SECTIONS)[number];

const DynamicScrollIsland: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const progress = useMotionValue(0);
  const displayProgress = useTransform(
    progress,
    (v) => `${Math.round(v * 100)}%`
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const currentProgress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(currentProgress);
      progress.set(currentProgress);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [progress]);

  const circumference = 2 * Math.PI * 10; // 2 * pi * radius
  const strokeDashoffset = useTransform(
    progress,
    (v) => circumference * (1 - v)
  );

  return (
    <div className="box bg-d-sheet relative p-8 rounded-xl">
      {/* --- The Island Itself --- */}
      <div className="relative flex justify-center">
        <div
          className="relative z-50 cursor-pointer select-none text-white/80"
          style={
            {
              "--height-opened": "150px",
              "--width-opened": "350px",
              "--width": "220px",
            } as React.CSSProperties
          }
        >
          <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-10 cursor-pointer items-center overflow-hidden px-1 bg-black"
            style={{ borderRadius: 24 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* Progress Circle & Section Title */}
            <motion.div layout="position" className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  className="stroke-white/20"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  className="stroke-white/80"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 12 12)"
                />
              </svg>
              <div className="flex items-center gap-2">
                <p className="font-bold">{activeSection}</p>
                <motion.div
                  className="mt-0.5 text-white/80"
                  animate={{ rotate: isOpen ? 0 : 180 }}
                >
                  <ArrowUpIcon />
                </motion.div>
              </div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.button
              layout="position"
              className="relative flex h-8 w-14 items-center justify-center overflow-hidden rounded-full text-sm font-bold bg-white/[0.1] transition-colors hover:bg-white/[0.15] ml-auto"
            >
              {displayProgress}
            </motion.button>
          </motion.div>

          {/* Dropdown Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-12 left-0 w-full bg-black/50 backdrop-blur-md rounded-xl p-2"
            >
              {DYNAMIC_ISLAND_SECTIONS.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-2 rounded-md font-medium text-sm transition-colors",
                    activeSection === section
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:bg-white/10"
                  )}
                >
                  {section}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* --- Scrollable Content --- */}
      <div
        ref={scrollContainerRef}
        className="relative mt-8 h-[500px] overflow-y-scroll"
      >
        <div
          className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] 2xl:grid-cols-4"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                className="absolute inset-0 h-full w-full object-cover"
                alt={`Gallery image ${i + 1}`}
                src={`https://source.unsplash.com/random/500x500?sig=${i}&${activeSection.toLowerCase()}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // prevent infinite loop
                  target.src = `https://placehold.co/500x500/1a1a1a/ffffff?text=Image+${
                    i + 1
                  }`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PAGE COMPONENTS ---

const Header: FC = () => (
  <>
    {/* Background Gradients */}
    <div className="bg-d-bg/20 pointer-events-none fixed top-0 z-40 h-[100px] w-full [mask-image:linear-gradient(to_bottom,rgb(0,0,0)_10%,transparent)] backdrop-blur-[8px]"></div>
    <div className="from-bg/90 pointer-events-none fixed top-0 z-40 h-[100px] w-full bg-gradient-to-b to-transparent"></div>

    <header className="fixed top-6 left-1/2 z-50 h-[50px] -translate-x-1/2">
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="flex items-center justify-center overflow-hidden bg-[#EBEBEB] size-10 rounded-lg">
          {/* Placeholder for a logo canvas/component */}
          <div className="size-8 bg-black rounded-sm"></div>
        </div>
        {/* Logo SVG */}
        <svg
          viewBox="0 0 70 41"
          fill="none"
          className="mt-0.5 aspect-[7/4] h-9"
        >
          <path
            d="M0.308766 16.1413V1.03568H5.34397C6.84054 1.03568 8.12032 1.23149 9.18331 1.62312C10.2463 2.01475 11.1065 2.56023 11.7638 3.25956C12.4352 3.94491 12.9247 4.74914 13.2324 5.67226C13.5402 6.59538 13.694 7.58144 13.694 8.63044C13.694 9.65147 13.5192 10.6165 13.1695 11.5257C12.8198 12.4208 12.2883 13.2181 11.575 13.9174C10.8617 14.6027 9.96656 15.1482 8.88959 15.5538C7.81261 15.9455 6.54682 16.1413 5.09221 16.1413H0.308766ZM5.36495 5.33658H4.50477V12.26H5.28103C6.21813 12.26 6.9874 12.1131 7.58883 11.8194C8.19025 11.5257 8.63783 11.1131 8.93155 10.5816C9.23925 10.0501 9.39311 9.43467 9.39311 8.73534C9.39311 8.03601 9.23925 7.43458 8.93155 6.93106C8.63783 6.42754 8.19025 6.03591 7.58883 5.75618C6.9874 5.47645 6.24611 5.33658 5.36495 5.33658ZM21.5592 11.4837C21.4473 11.5397 21.3005 11.6096 21.1186 11.6935C20.9508 11.7635 20.748 11.8334 20.5102 11.9033C20.1186 12.0012 19.7899 12.1271 19.5242 12.281C19.2724 12.4208 19.1465 12.6866 19.1465 13.0782C19.1465 13.3719 19.2514 13.5887 19.4612 13.7286C19.671 13.8545 19.9298 13.9174 20.2375 13.9174C20.4473 13.9174 20.6361 13.8824 20.8039 13.8125C20.9718 13.7426 21.1186 13.6447 21.2445 13.5188C21.3704 13.3929 21.4753 13.246 21.5592 13.0782V11.4837ZM21.5592 8.96612C21.5592 8.72835 21.4054 8.55351 21.0977 8.44162C20.7899 8.31574 20.3424 8.2528 19.7549 8.2528C19.0696 8.2528 18.3982 8.34371 17.7408 8.52554C17.0975 8.69338 16.51 8.89619 15.9785 9.13396L15.7058 5.14776C16.2093 4.88201 16.8387 4.65123 17.594 4.45542C18.3633 4.25961 19.2164 4.1617 20.1536 4.1617C21.4263 4.1617 22.4613 4.35751 23.2586 4.74914C24.0698 5.12678 24.6712 5.69324 25.0629 6.44852C25.4545 7.2038 25.6503 8.15489 25.6503 9.3018V16.1413H21.5592V14.9244C21.1256 15.414 20.6501 15.7916 20.1326 16.0574C19.6151 16.3091 18.9647 16.435 18.1814 16.435C17.2443 16.435 16.4681 16.1902 15.8526 15.7007C15.2512 15.2112 14.9505 14.4839 14.9505 13.5188C14.9505 12.8754 15.0764 12.3439 15.3281 11.9243C15.5799 11.4907 15.9156 11.141 16.3352 10.8753C16.7688 10.6096 17.2443 10.3998 17.7618 10.2459C18.2933 10.092 18.8388 9.96617 19.3983 9.86826C19.8458 9.79833 20.1885 9.73539 20.4263 9.67944C20.6641 9.60951 20.8809 9.54657 21.0767 9.49062C21.2725 9.42069 21.3984 9.35075 21.4543 9.28082C21.5242 9.1969 21.5592 9.092 21.5592 8.96612ZM33.7366 8.2528C33.331 8.2528 32.9604 8.35071 32.6247 8.54652C32.289 8.72835 32.0233 8.9871 31.8274 9.32278C31.6316 9.65846 31.5337 10.0641 31.5337 10.5396C31.5337 11.0152 31.6316 11.4208 31.8274 11.7565C32.0233 12.0782 32.289 12.3299 32.6247 12.5117C32.9604 12.6796 33.331 12.7635 33.7366 12.7635C34.1562 12.7635 34.5339 12.6796 34.8695 12.5117C35.2052 12.3439 35.471 12.0921 35.6668 11.7565C35.8626 11.4208 35.9605 11.0082 35.9605 10.5186C35.9605 10.0151 35.8626 9.59552 35.6668 9.25984C35.471 8.92416 35.2052 8.6724 34.8695 8.50456C34.5339 8.33672 34.1562 8.2528 33.7366 8.2528ZM40.0516 0.19648V16.1413H36.1283V15.1342H36.0444C35.7507 15.5259 35.3101 15.8406 34.7227 16.0783C34.1492 16.3161 33.5128 16.435 32.8135 16.435C31.8065 16.435 30.8833 16.2042 30.0441 15.7427C29.2189 15.2671 28.5616 14.5748 28.072 13.6656C27.5825 12.7425 27.3377 11.6166 27.3377 10.2879C27.3377 8.94514 27.5895 7.81921 28.093 6.91008C28.6105 6.00095 29.2819 5.3156 30.1071 4.85404C30.9463 4.39248 31.8484 4.1617 32.8135 4.1617C33.4849 4.1617 34.1003 4.30157 34.6597 4.5813C35.2332 4.84705 35.6738 5.24567 35.9815 5.77716H36.0654V0.19648H40.0516ZM48.2317 8.2528C47.8261 8.2528 47.4554 8.35071 47.1197 8.54652C46.7841 8.72835 46.5183 8.9871 46.3225 9.32278C46.1267 9.65846 46.0288 10.0641 46.0288 10.5396C46.0288 11.0152 46.1267 11.4208 46.3225 11.7565C46.5183 12.0782 46.7841 12.3299 47.1197 12.5117C47.4554 12.6796 47.8261 12.7635 48.2317 12.7635C48.6513 12.7635 49.0289 12.6796 49.3646 12.5117C49.7003 12.3439 49.966 12.0921 50.1618 11.7565C50.3576 11.4208 50.4556 11.0082 50.4556 10.5186C50.4556 10.0151 50.3576 9.59552 50.1618 9.25984C49.966 8.92416 49.7003 8.6724 49.3646 8.50456C49.0289 8.33672 48.6513 8.2528 48.2317 8.2528ZM54.5467 0.19648V16.1413H50.6234V15.1342H50.5395C50.2458 15.5259 49.8052 15.8406 49.2177 16.0783C48.6443 16.3161 48.0079 16.435 47.3086 16.435C46.3015 16.435 45.3784 16.2042 44.5392 15.7427C43.714 15.2671 43.0566 14.5748 42.5671 13.6656C42.0775 12.7425 41.8328 11.6166 41.8328 10.2879C41.8328 8.94514 42.0845 7.81921 42.5881 6.91008C43.1056 6.00095 43.7769 5.3156 44.6021 4.85404C45.4413 4.39248 46.3435 4.1617 47.3086 4.1617C47.9799 4.1617 48.5953 4.30157 49.1548 4.5813C49.7282 4.84705 50.1688 5.24567 50.4765 5.77716H50.5605V0.19648H54.5467ZM59.7476 20.4212C59.1881 20.4212 58.7056 20.3932 58.2999 20.3373C57.8943 20.2953 57.5237 20.2324 57.188 20.1485L57.4607 16.9175C57.6845 16.9735 57.8873 17.0154 58.0692 17.0434C58.265 17.0854 58.5167 17.1064 58.8244 17.1064C59.314 17.1064 59.6916 17.0504 59.9574 16.9385C60.2231 16.8406 60.384 16.6798 60.4399 16.456L60.4819 16.3091L55.9292 4.45542H60.7126L62.6848 12.5957L64.6149 4.45542H69.0837L64.8247 16.1413C64.559 16.8826 64.2163 17.5749 63.7967 18.2183C63.3911 18.8757 62.8596 19.4072 62.2022 19.8128C61.5588 20.2184 60.7406 20.4212 59.7476 20.4212ZM0.258766 36.1413V21.7557H5.05397C6.47921 21.7557 7.69799 21.9422 8.71031 22.3151C9.72263 22.6881 10.5418 23.2076 11.1678 23.8736C11.8072 24.5262 12.2734 25.2921 12.5664 26.1713C12.8595 27.0504 13.006 27.9894 13.006 28.9884C13.006 29.9608 12.8395 30.8799 12.5065 31.7457C12.1735 32.5982 11.6673 33.3574 10.988 34.0234C10.3087 34.6761 9.45623 35.1956 8.43059 35.5818C7.40495 35.9548 6.19949 36.1413 4.81421 36.1413H0.258766ZM5.07395 25.8516H4.25477V32.445H4.99403C5.88647 32.445 6.61907 32.3051 7.19183 32.0254C7.76459 31.7457 8.19083 31.3527 8.47055 30.8466C8.76359 30.3404 8.91011 29.7543 8.91011 29.0883C8.91011 28.4223 8.76359 27.8496 8.47055 27.3701C8.19083 26.8905 7.76459 26.5176 7.19183 26.2512C6.61907 25.9848 5.91311 25.8516 5.07395 25.8516ZM19.9968 28.2292C19.6505 28.2292 19.3175 28.3424 18.9978 28.5689C18.6781 28.782 18.465 29.1816 18.3585 29.7677H21.5353C21.522 29.4746 21.4487 29.2149 21.3155 28.9884C21.1823 28.762 21.0025 28.5822 20.776 28.449C20.5496 28.3025 20.2899 28.2292 19.9968 28.2292ZM24.3724 35.9814C23.8929 36.1413 23.3734 36.2545 22.814 36.3211C22.2679 36.3877 21.6951 36.421 21.0957 36.421C19.7238 36.421 18.525 36.2079 17.4993 35.7816C16.487 35.3421 15.7011 34.6894 15.1417 33.8236C14.5822 32.9445 14.3025 31.8522 14.3025 30.5469C14.3025 29.428 14.5356 28.429 15.0018 27.5499C15.468 26.6708 16.1207 25.9848 16.9599 25.4919C17.799 24.9858 18.7847 24.7327 19.9169 24.7327C20.7694 24.7327 21.5153 24.8859 22.1547 25.1922C22.8073 25.4853 23.3468 25.8982 23.773 26.431C24.2126 26.9638 24.5389 27.5832 24.7521 28.2891C24.9785 28.9951 25.0917 29.7477 25.0917 30.5469C25.0917 30.8 25.0851 31.053 25.0717 31.3061C25.0584 31.5592 25.0318 31.799 24.9918 32.0254H18.5782C18.7514 32.3717 18.9845 32.6381 19.2775 32.8246C19.5839 33.0111 19.9502 33.1443 20.3764 33.2242C20.8027 33.2908 21.2822 33.3241 21.815 33.3241C22.2546 33.3241 22.6542 33.2975 23.0138 33.2442C23.3734 33.1776 23.7264 33.091 24.0727 32.9844L24.3724 35.9814ZM26.392 35.7017L26.6517 32.7047C26.998 32.8512 27.5109 32.9911 28.1902 33.1243C28.8695 33.2575 29.5621 33.3241 30.2681 33.3241C30.6943 33.3241 31.034 33.2975 31.2871 33.2442C31.5402 33.1909 31.6667 33.0777 31.6667 32.9045C31.6667 32.8113 31.6201 32.738 31.5268 32.6847C31.4469 32.6315 31.2671 32.5715 30.9874 32.5049C30.7077 32.4383 30.2748 32.3451 29.6887 32.2252C28.9827 32.0787 28.3767 31.8789 27.8705 31.6258C27.3643 31.3594 26.9714 30.9931 26.6917 30.5269C26.4253 30.0474 26.2921 29.428 26.2921 28.6688C26.2921 27.9362 26.4719 27.2768 26.8315 26.6907C27.2045 26.0913 27.7573 25.6185 28.4899 25.2722C29.2358 24.9125 30.1682 24.7327 31.2871 24.7327C31.9797 24.7327 32.6257 24.7993 33.2251 24.9325C33.8245 25.0657 34.2774 25.2056 34.5838 25.3521L34.324 29.1483C33.8978 29.0018 33.405 28.8819 32.8455 28.7886C32.2861 28.6821 31.7333 28.6288 31.1872 28.6288C30.7476 28.6288 30.4413 28.6621 30.2681 28.7287C30.1083 28.782 30.0283 28.8819 30.0283 29.0284C30.0283 29.1216 30.0616 29.2016 30.1282 29.2682C30.2082 29.3214 30.3813 29.3747 30.6477 29.428C30.9141 29.4813 31.3337 29.5545 31.9065 29.6478C32.9055 29.8076 33.7113 30.1273 34.324 30.6068C34.9501 31.073 35.2631 31.7723 35.2631 32.7047C35.2631 33.9302 34.8502 34.8559 34.0243 35.4819C33.2118 36.108 31.993 36.421 30.368 36.421C29.5155 36.421 28.743 36.3477 28.0503 36.2012C27.371 36.0547 26.8182 35.8882 26.392 35.7017ZM38.5525 24.3731C37.9131 24.3731 37.3736 24.1733 36.9341 23.7737C36.5078 23.3741 36.2947 22.8479 36.2947 22.1952C36.2947 21.5292 36.5078 21.0031 36.9341 20.6168C37.3603 20.2172 37.8998 20.0174 38.5525 20.0174C39.2051 20.0174 39.7379 20.2172 40.1509 20.6168C40.5771 21.0031 40.7902 21.5292 40.7902 22.1952C40.7902 22.8479 40.5704 23.3741 40.1309 23.7737C39.7046 24.1733 39.1785 24.3731 38.5525 24.3731ZM36.6544 36.1413V25.0124H40.4506V36.1413H36.6544ZM48.1084 28.6288C47.7354 28.6288 47.4024 28.722 47.1094 28.9085C46.8163 29.095 46.5832 29.3481 46.4101 29.6678C46.2369 29.9874 46.1503 30.3537 46.1503 30.7667C46.1503 31.1796 46.2369 31.5459 46.4101 31.8656C46.5832 32.1719 46.8163 32.4117 47.1094 32.5848C47.4024 32.7447 47.7354 32.8246 48.1084 32.8246C48.4813 32.8246 48.8143 32.7513 49.1074 32.6048C49.4004 32.445 49.6335 32.2119 49.8067 31.9055C49.9798 31.5992 50.0664 31.2195 50.0664 30.7667C50.0664 30.3271 49.9798 29.9475 49.8067 29.6278C49.6335 29.3081 49.4004 29.0617 49.1074 28.8885C48.8143 28.7154 48.4813 28.6288 48.1084 28.6288ZM50.2262 35.1822V34.5828H50.1463C49.8666 34.9558 49.4737 35.2555 48.9675 35.4819C48.4613 35.7084 47.8819 35.8216 47.2292 35.8216C46.2835 35.8216 45.4244 35.6218 44.6518 35.2222C43.8926 34.8226 43.2865 34.2299 42.8336 33.444C42.3808 32.6581 42.1543 31.6991 42.1543 30.5669C42.1543 29.2881 42.3874 28.2159 42.8536 27.3501C43.3331 26.4843 43.9592 25.8316 44.7317 25.392C45.5043 24.9525 46.3368 24.7327 47.2292 24.7327C47.8553 24.7327 48.4214 24.8659 48.9275 25.1323C49.447 25.3854 49.8533 25.765 50.1463 26.2712H50.2262V25.0124H53.9625V34.7627C53.9625 36.4676 53.4563 37.8196 52.444 38.8186C51.4317 39.8309 49.9665 40.3371 48.0484 40.3371C47.3957 40.3371 46.8363 40.3171 46.3701 40.2771C45.9172 40.2372 45.5043 40.1706 45.1313 40.0773L45.3911 36.9804C45.6308 37.0337 45.9039 37.0737 46.2103 37.1003C46.5299 37.127 46.8962 37.1403 47.3092 37.1403C48.0551 37.1403 48.6345 37.0604 49.0474 36.9005C49.4737 36.7407 49.7734 36.5142 49.9465 36.2212C50.133 35.9282 50.2262 35.5818 50.2262 35.1822ZM56.1653 36.1413V25.0124H59.9016V26.2712H59.9815C60.3411 25.805 60.7674 25.432 61.2602 25.1523C61.7664 24.8726 62.3991 24.7327 63.1583 24.7327C64.0108 24.7327 64.7301 24.9192 65.3161 25.2921C65.9155 25.6518 66.3684 26.1646 66.6748 26.8306C66.9945 27.4966 67.1543 28.2825 67.1543 29.1882V36.1413H63.3581V30.8266C63.3581 30.4004 63.2982 30.0341 63.1783 29.7277C63.0584 29.408 62.8719 29.1616 62.6188 28.9884C62.3658 28.8153 62.0394 28.7287 61.6398 28.7287C61.0671 28.7287 60.6408 28.9218 60.3611 29.3081C60.0947 29.6811 59.9615 30.1806 59.9615 30.8066V36.1413H56.1653Z"
            className="fill-black dark:fill-white"
          ></path>
        </svg>
      </div>
    </header>
  </>
);

const componentLinks = [
  {
    href: "/components/dynamic-scroll-island-toc",
    label: "Dynamic Scroll Island TOC",
    active: true,
  },
  { href: "/components/sub-select-toggle", label: "Sub Select Toggle" },
  { href: "/components/cool-checkbox", label: "Cool checkbox" },
  {
    href: "/components/animated-blur-testimonials",
    label: "Animated Blur Testimonials",
  },
  { href: "/components/family-button", label: "Family status indicator" },
  { href: "/components/3d-splash-button", label: "Squishy 3D Button" },
];

const Sidebar: FC = () => (
  <aside className="order-1 mt-[40px] flex-col items-center md:flex md:order-none">
    <div className="sticky top-[100px] flex flex-col gap-2">
      <nav className="relative flex flex-col">
        <a
          href="/components"
          className="text-d-fg group relative mt-4 flex items-center gap-2 py-1 text-sm font-medium"
        >
          <span className="text-d-fg/80 group-hover:text-d-fg transition-all duration-300 group-hover:translate-x-4">
            All Components
          </span>
        </a>
        <div className="relative flex flex-col">
          {componentLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium opacity-40 transition-opacity hover:opacity-60",
                link.active && "!opacity-100"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  </aside>
);

const MainContent: FC = () => {
  const [activeTab, setActiveTab] = useState<"Preview" | "Code">("Preview");

  return (
    <main className="min-w-0">
      <h1>Dynamic Scroll Island Filter</h1>
      <p className="text-d-fg/60">
        A dynamic Table of Contents, crafted in React's grace, with scrolling
        magic and animations fair. It tracks thy progress, marks each chosen
        place; perfect for pages long—thy reader's guide with flair!
      </p>
      <br />
      <br />
      <div className="flex items-center justify-between gap-2">
        <TabGroup
          tabs={["Preview", "Code"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="flex gap-2">
          <PushButton>
            <span className="flex items-center gap-1.5">
              Copy prompt <TerminalIcon />
            </span>
          </PushButton>
          <PushButton>
            <a href="#" className="flex items-center gap-1">
              Open in <VercelIcon />
            </a>
          </PushButton>
        </div>
      </div>
      <div className="my-4" />

      {activeTab === "Preview" && <DynamicScrollIsland />}
      {activeTab === "Code" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Component Code</h3>
          <CodeBlock
            code={`// Your component code goes here...\n// For example:\nconst MyComponent = () => <div>Hello World</div>;`}
          />
          <h3 className="text-lg font-semibold">Utility Functions</h3>
          <CodeBlock
            code={`// Your utility code goes here...\n// For example:\nexport const cn = (...) => ...;`}
          />
        </div>
      )}
    </main>
  );
};

const CodeBlock: FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="box code bg-d-sheet relative overflow-hidden rounded-lg">
      <div className="absolute right-2 top-2 z-10">
        <PushButton onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </PushButton>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};

// --- MAIN APP LAYOUT ---

export default function ComponentPage() {
  // Define a dark theme for the body or use a theme provider
  useEffect(() => {
    document.body.classList.add("bg-[#111]", "text-white", "dark");
    // Define CSS variables for colors to match the original design
    const style = document.createElement("style");
    style.innerHTML = `
      :root {
        --d-bg: #111;
        --d-fg: #fff;
        --d-sheet: #1a1a1a;
        --d-muted: #333;
        --d-border: #2a2a2a;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.body.classList.remove("bg-[#111]", "text-white", "dark");
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="grid max-w-[100vw] px-4 pt-24 pb-12 md:grid-cols-[1fr_800px_1fr] md:gap-8">
        <Sidebar />
        <MainContent />
        {/* Right column spacer */}
        <div className="hidden md:block"></div>
      </div>
    </>
  );
}
