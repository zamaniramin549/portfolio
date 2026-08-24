"use client";

import { useState, useEffect, Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import ProgressBar from "@/components/ProgressBar";
import CommandPalette from "@/components/CommandPalette";

export default function ClientLayout({
  children,
  initialCollapsed,
  initialTheme,
}: {
  children: React.ReactNode;
  initialCollapsed: boolean;
  initialTheme: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  useEffect(() => {
    const updateLayout = () => {
      const sidebarCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar_collapsed="));
      if (sidebarCookie) {
        setIsCollapsed(sidebarCookie.split("=")[1] === "true");
      }
    };

    window.addEventListener("sidebar_toggle", updateLayout);
    return () => window.removeEventListener("sidebar_toggle", updateLayout);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ProgressBar />
      </Suspense>
      <CommandPalette />
      <Sidebar initialCollapsed={initialCollapsed} initialTheme={initialTheme} />
      <div
        className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-80"
        }`}
      >
        <main className="pt-16 lg:pt-0 p-8 flex justify-center">{children}</main>
      </div>
    </>
  );
}

