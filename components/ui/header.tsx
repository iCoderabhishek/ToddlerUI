"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className=" top-4 z-[50] w-[15%] mx-auto rounded-3xl bg-gradient-to-r from-amber-50/70 to-amber-50/60 backdrop-blur-xl shadow-lg shadow-amber-100/30">
      <div className="flex h-16 items-center justify-center px-4">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image
            src="/logo.png"
            width={44}
            height={44}
            alt="TodlerrUI"
            priority
            className="shrink-0"
          />
          <span className="text-lg font-light tracking-tight text-neutral-800">
            TodlerrUI
          </span>
        </Link>
      </div>
    </header>
  );
}
