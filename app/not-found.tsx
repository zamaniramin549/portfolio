"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function NotFound() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Writing", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full max-w-4xl min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center text-center space-y-8"
      >
        {/* Glow Badge & 404 Visual */}
        <div className="relative">
          <div className="absolute -inset-4 bg-teal-500/20 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-8xl md:text-9xl font-extrabold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-300 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-800 select-none">
            404
          </span>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md">
            Page Not Found
          </div>
        </div>

        {/* Message */}
        <div className="max-w-md space-y-3 pt-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Lost in digital space?
          </h1>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new route.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold text-sm transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Go Back
          </button>
        </div>

        {/* Quick Links Navigation Box */}
        <div className="pt-8 w-full max-w-sm">
          <div className="p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm space-y-3">
            <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider block">
              Quick Navigation
            </span>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

