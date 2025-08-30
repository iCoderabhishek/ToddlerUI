import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodlerrUI - Playful UI components for Next.js",
  description:
    "A comprehensive library of beautiful, accessible UI components built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <div className="relative mt-20">
          <div className="backdrop-blur-sm text-2xl bg-neutral-100/30 border border-amber-50/20 text-neutral-400/40 rounded-2xl max-w-lg mx-auto   flex justify-center items-center shadow-none">
            {"<3"} TodlerrUI
          </div>
        </div>
      </body>
    </html>
  );
}
