import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";

type Speed = "slow" | "normal" | "medium" | "rocket";
type Placement = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface CookieCardProps {
  heading?: string;
  message?: string;
  acceptText?: string;
  rejectText?: string;
  speed?: Speed;
  placement?: Placement;
  className?: string;
  fontClassName?: string;
}

const variantsMap: Record<Placement, any> = {
  "bottom-left": {
    hidden: { x: -200, y: 0, opacity: 0, scale: 0.8 },
    visible: { x: 0, y: 0, opacity: 1, scale: 1 },
  },
  "bottom-right": {
    hidden: { x: 200, y: 0, opacity: 0, scale: 0.8 },
    visible: { x: 0, y: 0, opacity: 1, scale: 1 },
  },
  "top-left": {
    hidden: { x: -200, y: 0, opacity: 0, scale: 0.8 },
    visible: { x: 0, y: 0, opacity: 1, scale: 1 },
  },
  "top-right": {
    hidden: { x: 200, y: 0, opacity: 0, scale: 0.8 },
    visible: { x: 0, y: 0, opacity: 1, scale: 1 },
  },
};

function CookieCard({
  heading = "Yes, we use cookies 🍪",
  message = "Our cookies don’t predict the future, but they do help us remember you!",
  acceptText = "Accept Cookies",
  rejectText = "Manage Preferences",
  speed = "normal",
  placement = "top-left",
  className = "",
  fontClassName = "",
}: CookieCardProps) {
  const [visible, setVisible] = useState(true);

  // Speed settings
  const speedMap: Record<Speed, number> = {
    slow: 1.2,
    normal: 0.8,
    medium: 0.6,
    rocket: 0.3,
  };

  // Placement styles
  const placementMap: Record<Placement, string> = {
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
    "top-left": "top-6 left-6",
    "top-right": "top-6 right-6",
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionConfig
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            bounce: 0.05,
            ease: "easeInOut",
            duration: speedMap[speed],
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variantsMap[placement]}
            drag="x"
            dragConstraints={{ left: 5, right: 5 }}
            className={`fixed w-[380px] max-w-sm px-6 py-5 
                       bg-white rounded-lg border border-neutral-200 
                       shadow-2xl shadow-black/5
                       ${placementMap[placement]} ${className}`}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className={`text-neutral-800 text-left text-xl ${fontClassName}`}
            >
              {heading}
            </motion.h2>

            <Buttons
              message={message}
              acceptText={acceptText}
              rejectText={rejectText}
              onAccept={() => setVisible(false)}
              onReject={() => setVisible(false)}
              fontClassName={fontClassName}
            />
          </motion.div>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
}

export default CookieCard;

function Buttons({
  message,
  acceptText,
  rejectText,
  onAccept,
  onReject,
  fontClassName = "",
}: {
  message: string;
  acceptText: string;
  rejectText: string;
  onAccept: () => void;
  onReject: () => void;
  fontClassName?: string;
}) {
  const [status, setStatus] = useState<null | "accepted" | "rejected">(null);

  return (
    <motion.div>
      <AnimatePresence mode="wait">
        {!status ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.p
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: 0.3,
              }}
              className={`text-neutral-600 text-sm leading-relaxed mb-4 ${fontClassName}`}
            >
              {message}
            </motion.p>

            <div className="flex flex-wrap gap-3 p-2 text-sm">
              <button
                onClick={() => {
                  onAccept();
                  setStatus("accepted");
                }}
                className="bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white font-medium rounded-full px-3 py-2 shadow-sm transition-colors cursor-pointer"
              >
                {acceptText}
              </button>

              <button
                onClick={() => {
                  onReject();
                  setStatus("rejected");
                }}
                className="bg-transparent hover:bg-gray-100 text-gray-800 font-medium rounded-full px-3 py-2 border border-gray-300 shadow-sm transition-colors cursor-pointer"
              >
                {rejectText}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm font-medium text-green-600"
          >
            {status === "accepted"
              ? "🍪 Cookies Accepted!"
              : "⚙️ Preferences Updated!"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
