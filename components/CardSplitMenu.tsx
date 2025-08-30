import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useState, useEffect, useId } from "react";
import { X, Menu } from "lucide-react";

export interface MenuItem {
  icon: React.ReactElement;
  name?: string;
  metadata?: any;
  value?: any;
}

interface CardSplitMenuProps {
  items: MenuItem[];
  className?: string;
  onChange?: (item: MenuItem) => void;
  direction?: "left" | "right" | "top" | "bottom";
  autoTrigger?: boolean; // 👈 new prop
  openDelay?: number; // 👈 delay before auto-open (ms)
  closeDelay?: number; // 👈 delay before auto-close (ms)
  repeat?: boolean; // 👈 optional: should it loop
}

function CardSplitMenu({
  items,
  className = "",
  onChange,
  direction = "top",
  autoTrigger = true,
  openDelay = 1000,
  closeDelay = 3000,
  repeat = false,
}: CardSplitMenuProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  function handleClick(item: MenuItem) {
    setOpen(false);
    onChange?.(item);
  }

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto trigger open/close
  useEffect(() => {
    if (!autoTrigger) return;

    let openTimeout: NodeJS.Timeout;
    let closeTimeout: NodeJS.Timeout;

    const triggerCycle = () => {
      openTimeout = setTimeout(() => setOpen(true), openDelay);
      closeTimeout = setTimeout(() => {
        setOpen(false);
        if (repeat) triggerCycle();
      }, openDelay + closeDelay);
    };

    triggerCycle();

    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  }, [autoTrigger, openDelay, closeDelay, repeat]);

  const getCardPosition = (index: number) => {
    const spacing = 60;
    const offset = 20;

    switch (direction) {
      case "top":
        return { y: -(spacing * (index + 1) + offset), x: 0 };
      case "bottom":
        return { y: spacing * (index + 1) + offset, x: 0 };
      case "left":
        return { x: -(spacing * (index + 1) + offset), y: 0 };
      case "right":
        return { x: spacing * (index + 1) + offset, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const menuId = `card-split-menu-${id}`;

  return (
    <MotionConfig
      transition={{
        type: "spring",
        duration: 0.4,
        bounce: 0.2,
      }}
    >
      <div className="relative">
        <div
          id={menuId}
          role="menu"
          aria-hidden={!open}
          className="absolute top-0 left-0"
        >
          <div className="relative w-12 h-12">
            <AnimatePresence>
              {open &&
                items.map((item, index) => {
                  const position = getCardPosition(index);
                  return (
                    <motion.button
                      key={index}
                      aria-label={item.name}
                      tabIndex={open ? 0 : -1}
                      role="menuitem"
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0.8,
                        opacity: 0,
                        rotate: 0,
                      }}
                      animate={{
                        x: position.x,
                        y: position.y,
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                      }}
                      exit={{
                        x: 0,
                        y: 0,
                        scale: 0.8,
                        opacity: 0,
                        rotate: 180,
                      }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        duration: 0.4,
                        bounce: 0.3,
                      }}
                      className="absolute inset-0 flex w-12 h-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-110 transition-all duration-200"
                      onClick={() => handleClick(item)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                      <span className="sr-only">{item.name}</span>
                    </motion.button>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          className={`relative z-10 flex w-12 h-12 cursor-pointer items-center justify-center rounded-xl bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors ${className}`}
          onClick={() => setOpen(!open)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </MotionConfig>
  );
}

export default CardSplitMenu;
