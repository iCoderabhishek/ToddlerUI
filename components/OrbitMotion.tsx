export default function OrbitAnimation() {
  return (
    <div className="flex items-center justify-center h-screen ">
      {/* Center text */}
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        <div className="text-md font-bold bg-neutral-200 text-black rounded-full px-2 py-1">
          ui.todlerr.fun
        </div>

        {/* Orbit 1 */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-gray-200 animate-spin-slow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-0">
            <img
              src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg"
              alt="Framer Motion"
              className="w-10 h-10 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* Orbit 2 (rotated 120° start) */}
        <div className="absolute w-[250px] h-[250px] rounded-full border border-gray-200 animate-spin-reverse">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-[120deg] origin-[50%_150px]">
            <img
              src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg"
              alt="Tailwind CSS"
              className="w-10 h-10 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* Orbit 3 (rotated 240° start) */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-gray-200 animate-spin-slow">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-[240deg] origin-[50%_175px]">
            <img
              src="https://img.icons8.com/fluent-systems-filled/512/nextjs.png"
              alt="Next.js"
              className="w-10 h-10 rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
