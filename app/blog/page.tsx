"use client";

import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

export default function BlogPage() {
  const { scrollY } = useScroll();

  // Smooth Interpolations over 150px of scrolling
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);

  // Smoothly fade out the subtext
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  // Flexible max-height collapse prevents text truncation
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const allBlogs = [
    {
      id: 1,
      title: "How I built my modern portfolio using Next.js & Tailwind CSS",
      date: "August 12, 2026",
      readTime: "5 min read",
      snippet: "A deep dive into the architectural decisions, styling choices, and performance optimizations required to build a seamless experience.",
      img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS v4 for fast & beautiful UI design",
      date: "July 28, 2026",
      readTime: "4 min read",
      snippet: "Exploring the new CSS-first configuration model, custom variants, and dynamic theme switching in modern Tailwind setups.",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The future of React Server Components and Next.js 15",
      date: "June 15, 2026",
      readTime: "7 min read",
      snippet: "Understanding how async layouts, server-side cookies, and streamed rendering boost loading performance and SEO.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Creating interactive micro-animations with Framer Motion",
      date: "May 03, 2026",
      readTime: "6 min read",
      snippet: "Learn how to build subtle scroll effects, layout animations, and fluid state changes without degrading site performance.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Designing for Dark Mode: Accessibility and contrast guidelines",
      date: "April 19, 2026",
      readTime: "4 min read",
      snippet: "Practical strategies for picking balanced color palettes, preventing visual fatigue, and managing server theme cookies.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "A developer's guide to clean code and folder architecture",
      date: "March 11, 2026",
      readTime: "8 min read",
      snippet: "Best practices for modularizing React components, isolating custom hooks, and maintaining a scalable Next.js project.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
    },
  ];

  return (
    <div className="w-full max-w-6xl pb-24">
      {/* Dynamic Shrinking Sticky Header */}
      <motion.div
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="sticky top-16 lg:top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
      >
        <div className="flex flex-col">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity mb-2 group"
          >
            <svg className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
            Back to home
          </Link>

          <motion.h1
            style={{ fontSize: titleSize }}
            className="font-extrabold text-zinc-900 dark:text-zinc-100 transition-colors leading-tight"
          >
            Latest Writing
          </motion.h1>

          <motion.div
            style={{
              opacity: descriptionOpacity,
              maxHeight: descriptionMaxHeight,
              marginTop: descriptionMarginTop
            }}
            className="overflow-hidden pointer-events-none transition-all"
          >
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl transition-colors">
              Thoughts, tutorials, and insights on web development, UI design, and modern software architecture.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Article List with Stagger Motion */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="flex flex-col gap-6 pt-8"
      >
        {allBlogs.map((blog) => (
          <motion.div key={blog.id} variants={staggerItem}>
            <Link
              href={`/blog/${blog.id}`}
              className="group p-5 md:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-teal-500/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5 dark:hover:shadow-teal-900/10"
            >
              <div className="relative w-full md:w-64 h-48 md:h-40 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 text-xs font-mono text-teal-600 dark:text-teal-400 mb-2 transition-colors">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors mb-3 leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 transition-colors leading-relaxed">
                  {blog.snippet}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

