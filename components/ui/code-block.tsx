"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.min.css"; // ✅ your chosen style

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // highlight.js runs here
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className={cn("relative group", className)}>
      {filename && (
        <div className="flex items-center px-4 py-2 text-xs text-amber-700 bg-neutral-100 border border-amber-100 rounded-t-lg font-medium">
          <Code className="w-3 h-3 mr-2" />
          {filename}
        </div>
      )}
      <div className="relative max-h-96 overflow-hidden hover:overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:transition-all hover:ease-in-out hover:duration-500">
        <pre
          className={cn(
            " text-sm p-4",
            filename ? "rounded-t-none rounded-b-lg" : "rounded-lg"
          )}
        >
          <code ref={codeRef} className={`language-${language} font-mono`}>
            {code}
          </code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 p-2 text-amber-500 hover:text-amber-100 hover:bg-amber-800 rounded transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
