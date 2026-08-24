import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read cookies directly on the server
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const isCollapsed = cookieStore.get("sidebar_collapsed")?.value === "true";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${
        theme === "dark" ? "dark" : ""
      }`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-sans selection:bg-teal-500/30 transition-colors duration-300">
        <ClientLayout initialCollapsed={isCollapsed} initialTheme={theme}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

