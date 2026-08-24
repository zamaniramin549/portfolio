"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { playSound } = useSoundEffects();

  const commands = [
    { id: "home", name: "Go to Home", category: "Navigation", href: "/" },
    { id: "github", name: "View GitHub stats", category: "Navigation", href: "/github" },
    { id: "projects", name: "View Projects", category: "Navigation", href: "/projects" },
    { id: "resume", name: "Read Resume", category: "Navigation", href: "/resume" },
    { id: "blog", name: "Latest Writing", category: "Navigation", href: "/blog" },
    { id: "gallery", name: "View Photography", category: "Navigation", href: "/gallery" },
    { id: "testimonials", name: "Testimonials", category: "Navigation", href: "/testimonials" },
    { id: "contact", name: "Get in Touch", category: "Navigation", href: "/contact" },
    {
      id: "theme",
      name: "Toggle Dark / Light Theme",
      category: "Actions",
      action: () => {
        const isDark = document.documentElement.classList.contains("dark");
        const newTheme = isDark ? "light" : "dark";
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.classList.toggle("dark");
      },
    },
  ];

  const filteredCommands = commands.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset search state on open/close
  useEffect(() => {
    setQuery("");
    setSelectedIndex(0);
  }, [isOpen]);

  // Keyboard Navigation inside Modal
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      playSound("click");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  const executeCommand = (item: (typeof commands)[0]) => {
    setIsOpen(false);
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
              <svg className="w-5 h-5 text-zinc-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleModalKeyDown}
                className="w-full py-4 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => executeCommand(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                      index === selectedIndex
                        ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span>↑↓ navigate</span>
                <span>•</span>
                <span>↵ select</span>
              </div>
              <span>Ramin Z. Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

