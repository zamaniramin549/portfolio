"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id ? Number(params.id) : 1;
  const [copiedLink, setCopiedLink] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  // Smooth Interpolations for shrinking sticky header
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const blogData: Record<number, {
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    category: string;
    heroImg: string;
    content: {
      intro: string;
      section1Title: string;
      section1Text: string;
      codeExample?: string;
      section2Title: string;
      section2Text: string;
      conclusion: string;
    };
  }> = {
    1: {
      title: "How I built my modern portfolio using Next.js & Tailwind CSS",
      subtitle: "A deep dive into architectural decisions, responsive styling choices, and performance optimizations.",
      date: "August 12, 2026",
      readTime: "5 min read",
      category: "Engineering",
      heroImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
      content: {
        intro: "Building a personal portfolio in 2026 requires balancing fast page loading times, dark mode support, and smooth layout animations without cluttering the client bundle.",
        section1Title: "1. Moving Layouts to Server Components",
        section1Text: "By keeping the root layout and sidebar architecture on the server side, we eliminate hydration flashes while preserving theme state across page navigations.",
        codeExample: `// Next.js App Router Global Layout
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className="bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}`,
        section2Title: "2. Scroll-Driven Interpolation with Framer Motion",
        section2Text: "Instead of binding heavy scroll listeners, Framer Motion's useScroll hook leverages GPU-accelerated transforms to scale headers and fade element opacity seamlessly.",
        conclusion: "A minimal tech stack paired with intentional micro-interactions creates a site that feels responsive and polished across all device viewports."
      }
    },
    2: {
      title: "Mastering Tailwind CSS v4 for fast & beautiful UI design",
      subtitle: "Exploring the CSS-first configuration model, custom variants, and dynamic theme switching.",
      date: "July 28, 2026",
      readTime: "4 min read",
      category: "Design System",
      heroImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      content: {
        intro: "Tailwind CSS v4 introduces native CSS variables and streamlined engine builds that replace bulky javascript configuration files.",
        section1Title: "1. Embracing @custom-variant",
        section1Text: "Declaring theme class boundaries directly inside main stylesheets simplifies theme switching and reduces compiled CSS overhead.",
        section2Title: "2. Modern Color Utilities",
        section2Text: "With color space upgrades, Tailwind's palette renders rich dark tones like zinc-950 effortlessly across OLED displays.",
        conclusion: "Adopting CSS-native configurations keeps design systems maintainable as projects scale."
      }
    }
  };

  const article = blogData[blogId] || blogData[1];

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-6xl pb-24">
      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 origin-left z-50"
      />

      {/* Full Width Header Container (Matches All Other Pages) */}
      <motion.div
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="sticky top-16 lg:top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity mb-2 group"
            >
              <svg className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
              Back to Articles
            </Link>

            <motion.h1
              style={{ fontSize: titleSize }}
              className="font-extrabold text-zinc-900 dark:text-zinc-100 transition-colors leading-tight"
            >
              {article.title}
            </motion.h1>
          </div>

          <div className="shrink-0 self-start md:self-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs md:text-sm transition-all active:scale-95"
            >
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              {copiedLink ? "Link Copied!" : "Share Article"}
            </button>
          </div>
        </div>

        <motion.div
          style={{
            opacity: descriptionOpacity,
            maxHeight: descriptionMaxHeight,
            marginTop: descriptionMarginTop
          }}
          className="overflow-hidden pointer-events-none transition-all"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-teal-600 dark:text-teal-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">{article.category}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Article Body Centered & Optimized for Comfortable Reading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 pt-8 max-w-3xl mx-auto"
      >
        {/* Cover Image Banner */}
        <motion.div variants={staggerItem} className="w-full h-72 md:h-[400px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-100 dark:bg-zinc-900 shadow-xl">
          <img src={article.heroImg} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Formatted Text Content */}
        <motion.article variants={staggerItem} className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed border-l-4 border-teal-500 pl-4 italic">
            "{article.content.intro}"
          </p>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{article.content.section1Title}</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{article.content.section1Text}</p>
          </div>

          {article.content.codeExample && (
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs md:text-sm text-zinc-200 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-500 text-xs">
                <span>tsx</span>
                <span>app/layout.tsx</span>
              </div>
              <pre className="overflow-x-auto">
                <code>{article.content.codeExample}</code>
              </pre>
            </div>
          )}

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{article.content.section2Title}</h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{article.content.section2Text}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Conclusion</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{article.content.conclusion}</p>
          </div>
        </motion.article>

        {/* Author Bio Box */}
        <motion.div variants={staggerItem} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center gap-5 mt-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shrink-0">
            <img src="/Raminp.jpg" alt="Ramin Zamanighiri" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Written by Ramin Zamanighiri</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Full Stack Developer & Designer. Writing about modern web architecture, Next.js, and clean UI engineering.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

