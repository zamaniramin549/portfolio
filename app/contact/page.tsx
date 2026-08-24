"use client";

import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

export default function ContactPage() {
  const { scrollY } = useScroll();

  // Smooth Interpolations over 150px of scrolling
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.1 }
    }
  };

  return (
    <div className="w-full max-w-6xl pb-24">
      {/* Dynamic Shrinking Header */}
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
            Get in Touch
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
              Have a project in mind, a question, or just want to chat? Drop me a message below.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Form Container */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="pt-8"
      >
        <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden transition-colors duration-300 shadow-xl shadow-teal-900/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl -z-10 transition-colors"></div>

          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                placeholder="Project Inquiry / General Chat"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none"
                placeholder="Tell me about your project ideas, timelines, or requirements..."
              />
            </div>

            <button
              type="submit"
              className="mt-2 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto self-start shadow-lg shadow-teal-500/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

