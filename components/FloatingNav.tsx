"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

type Item = { label: string; href: string; tags?: string[] };

const COMPONENTS: Item[] = [
  {
    label: "Cool Todo",
    href: "/components/cool-todo",
    tags: ["todo", "tasks"],
  },
  {
    label: "Text Animation",
    href: "/components/text-animations",
    tags: ["text", "animation", "rotate"],
  },
  {
    label: "Sparkle Button",
    href: "/components/sparkle-button",
    tags: ["button", "sparkle"],
  },
  {
    label: "Fly Testimonial",
    href: "/components/fly-testimonial",
    tags: ["testimonial", "cards"],
  },
  {
    label: "Orbit Animation",
    href: "/components/orbit-animation",
    tags: ["orbit", "motion"],
  },
  {
    label: "Card Split Menu",
    href: "/components/card-split-menu",
    tags: ["menu", "split", "radial"],
  },
  {
    label: "Cookie Card",
    href: "/components/cookie-card",
    tags: ["cookie", "banner"],
  },
  {
    label: "Feature Cards",
    href: "/components/feature-cards",
    tags: ["features", "grid"],
  },
];

export default function FloatingSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false); // 👈 new state for visibility

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter items
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return COMPONENTS;
    return COMPONENTS.filter(({ label, tags }) => {
      const hay = (label + " " + (tags ?? []).join(" ")).toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  // Show floating nav only after scroll
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 80); // 👈 threshold (80px down)
      if (window.scrollY > 80) setOpen(false); // auto-close dropdown on scroll
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQ("");
      setActive(0);
    }
  }, [open]);

  // Keyboard navigation
  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) {
        setOpen(false);
        router.push(item.href);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={rootRef}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Header bar */}
          <motion.button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            className="group relative flex w-[260px] cursor-pointer items-center justify-between rounded-2xl border border-white/50 bg-black/70 px-4 py-2 text-left shadow-lg backdrop-blur-sm outline-none focus:ring-2 focus:ring-white/30"
          >
            <span className="pointer-events-none select-none font-[500] text-white/90 text-sm tracking-wide font-handwriting">
              Search Components
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-white/80">
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20" />
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                className="mt-2 w-[260px] rounded-xl border border-white/20 bg-neutral-900/90 p-2 shadow-xl backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Input */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    ref={inputRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Type a component…"
                    className="w-full rounded-lg bg-neutral-800/80 pl-9 pr-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-amber-400/60"
                  />
                </div>

                {/* Results */}
                <div
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "transparent transparent",
                  }}
                  className="mt-2 max-h-64 overflow-y-auto"
                >
                  {results.length === 0 ? (
                    <div className="px-3 py-3 text-xs text-white/50">
                      No matches. Try “button”, “orbit”, “todo”…
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {results.map((item, i) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                              i === active
                                ? "bg-white/10 text-white"
                                : "text-white/80 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
