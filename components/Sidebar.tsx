"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SidebarProps {
  initialCollapsed?: boolean;
  initialTheme?: string;
}

export default function Sidebar({ initialCollapsed = false, initialTheme = "light" }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const pathname = usePathname();

  // Sync state if cookies change
  useEffect(() => {
    setTheme(initialTheme);
    setIsCollapsed(initialCollapsed);
  }, [initialTheme, initialCollapsed]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    document.cookie = `sidebar_collapsed=${newCollapsedState}; path=/; max-age=31536000; SameSite=Lax`;

    window.dispatchEvent(new Event("sidebar_toggle"));
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
    },
    {
      name: "Resume",
      href: "/resume",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    },
    {
      name: "Writing",
      href: "/blog",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    },
    {
      name: "Gallery",
      href: "/gallery",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    },
    {
      name: "Testimonials",
      href: "/testimonials",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94" /></svg> },
    { name: "X", href: "https://x.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
    { name: "Instagram", href: "https://instagram.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.88 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.042.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.353.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.372-.058 4.041 0 2.67.01 2.986.058 4.042.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.353.684.566 1.15.748.353.137.882.3 1.857.344 1.055.048 1.372.058 4.042.058 2.67 0 2.986-.01 4.042-.058.975-.045 1.505-.207 1.858-.344.466-.182.8-.399 1.15-.748.353-.35.565-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.056.058-1.372.058-4.042 0-2.67-.01-2.986-.058-4.041-.045-.976-.207-1.506-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.883-.3-1.858-.344-1.056-.048-1.372-.059-4.042-.059zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg> },
    { name: "Facebook", href: "https://facebook.com", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 z-40 flex items-center justify-between px-6 transition-colors duration-300">
        <Link href="/" className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Ramin Z.</Link>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors focus:outline-none">
            {theme === "dark" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-zinc-900/80 dark:bg-zinc-950/80 backdrop-blur-sm z-30 lg:hidden" onClick={closeMenu} />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 h-[100dvh] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0 w-80 p-8" : "-translate-x-full lg:translate-x-0"
        } ${
          isCollapsed ? "lg:w-20 lg:p-4" : "lg:w-80 lg:p-8"
        }`}
      >
        <button
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="hidden lg:flex absolute top-5 right-4 p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors focus:outline-none z-50"
        >
          <svg className={`w-4 h-4 transform transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <div className={`flex flex-col items-center text-center transition-all duration-300 ${isCollapsed ? "mt-12 lg:items-center" : "lg:items-start lg:text-left mt-4 lg:mt-8"}`}>
          <Link
            href="/"
            onClick={closeMenu}
            className={`relative rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-xl transition-all duration-300 block shrink-0 ${
              isCollapsed ? "w-10 h-10 mb-4" : "w-32 h-32 mb-6"
            }`}
          >
            <Image src="/Raminp.jpg" alt="Profile Picture" fill className="object-cover" sizes="128px" />
          </Link>

          {!isCollapsed && (
            <>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2 transition-colors">Ramin Zamanighiri</h1>
              <p className="text-sm font-medium bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
                Full Stack Developer & Designer
              </p>

              <div className="flex items-center gap-2 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </>
          )}

          <nav className="w-full flex flex-col space-y-3 mt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href) && !item.href.includes("#"));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  title={isCollapsed ? item.name : undefined}
                  className={`group flex items-center text-sm font-medium transition-colors ${
                    isCollapsed ? "justify-center p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800" : ""
                  } ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400 font-bold"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {isCollapsed ? (
                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-teal-500/10 text-teal-500" : "text-zinc-500 dark:text-zinc-400 group-hover:text-teal-500"}`}>
                      {item.icon}
                    </div>
                  ) : (
                    <>
                      <span
                        className={`h-[1px] mr-4 transition-all duration-300 ${
                          isActive
                            ? "w-12 bg-teal-500 dark:bg-teal-400"
                            : "w-8 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-teal-500 dark:group-hover:bg-teal-400 group-hover:w-12"
                        }`}
                      />
                      {item.name}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={`mt-auto pt-8 flex flex-col gap-4 ${isCollapsed ? "items-center" : "items-start"}`}>
          <button
            onClick={toggleTheme}
            title={isCollapsed ? (theme === "dark" ? "Light Mode" : "Dark Mode") : undefined}
            className={`hidden lg:flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-teal-500 transition-colors focus:outline-none ${
              isCollapsed ? "p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800" : ""
            }`}
          >
            {theme === "dark" ? (
               <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> {!isCollapsed && "Light Mode"}</>
            ) : (
               <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg> {!isCollapsed && "Dark Mode"}</>
            )}
          </button>

          {!isCollapsed && (
            <div className="text-xs text-zinc-500 dark:text-zinc-600 transition-colors">
              © {new Date().getFullYear()} Ramin Zamanighiri. <br /> All rights reserved.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

