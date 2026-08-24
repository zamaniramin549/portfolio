"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import GithubHeatmap from "@/components/GithubHeatmap";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface Repository {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: { name: string; color: string } | null;
}

interface StatsData {
  joined: number;
  followers: number;
  following: number;
  totalCommits: number;
  totalContributions: number;
  repositories: Repository[];
}

export default function GithubPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { playSound } = useSoundEffects();

  const { scrollY } = useScroll();

  // Dynamic Shrinking Header interpolations (matches Blog & Project Detail pages)
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github/stats");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Fallback handled gracefully in UI
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const languages = [
    { name: "TypeScript", percentage: 55, color: "bg-teal-500" },
    { name: "JavaScript", percentage: 25, color: "bg-amber-500" },
    { name: "HTML / CSS", percentage: 12, color: "bg-cyan-500" },
    { name: "Other", percentage: 8, color: "bg-zinc-400" },
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
            onClick={() => playSound("nav")}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity mb-2 group"
          >
            <svg className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            Back to home
          </Link>

          <motion.h1
            style={{ fontSize: titleSize }}
            className="font-extrabold text-zinc-900 dark:text-zinc-100 transition-colors leading-tight"
          >
            GitHub Insights
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
              Real-time analytics, open-source repositories, and commit activity straight from my GitHub account.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Showcase Content */}
      <div className="pt-8 space-y-24">

        {/* METRICS OVERVIEW CARDS */}
        <section className="scroll-mt-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <motion.div variants={staggerItem} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 transition-colors">
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                {loading ? "..." : data?.totalContributions ? data.totalContributions.toLocaleString() : "1,188+"}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-1">
                Yearly Commits
              </h4>
            </motion.div>

            <motion.div variants={staggerItem} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 transition-colors">
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                {loading ? "..." : data?.followers ?? 0}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-1">
                Followers
              </h4>
            </motion.div>

            <motion.div variants={staggerItem} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 transition-colors">
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                {loading ? "..." : data?.following ?? 0}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-1">
                Following
              </h4>
            </motion.div>

            <motion.div variants={staggerItem} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 transition-colors">
              <span className="text-3xl md:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                {loading ? "..." : data?.joined ?? "2023"}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-1">
                Active Since
              </h4>
            </motion.div>
          </motion.div>
        </section>

        {/* CONTRIBUTION HEATMAP SECTION */}
        <section className="scroll-mt-28">
          <GithubHeatmap username="zamaniramin549" />
        </section>

        {/* TOP REPOS SECTION */}
        <section id="repositories" className="scroll-mt-28">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors"
          >
            Top Repositories
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data?.repositories.map((repo) => (
              <motion.div key={repo.name} variants={staggerItem}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="block group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20 flex flex-col justify-between min-h-[160px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                        {repo.name}
                      </h3>
                      <span className="text-sm font-mono text-teal-500 transform group-hover:translate-x-1 transition-transform">↗</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 transition-colors">
                      {repo.description || "Public codebase repository and project documentation."}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-4">
                    {repo.primaryLanguage && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                    <span>★ {repo.stargazerCount}</span>
                    <span>⑂ {repo.forkCount}</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* LANGUAGE FREQUENCY SECTION */}
        <section className="scroll-mt-28">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors"
          >
            Language Frequency
          </motion.h2>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 space-y-6 transition-colors"
          >
            <div className="h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
              {languages.map((l) => (
                <div key={l.name} style={{ width: `${l.percentage}%` }} className={l.color} />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {languages.map((l) => (
                <div key={l.name} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 text-xs font-medium">
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <span className={`w-2.5 h-2.5 rounded-full ${l.color}`}></span>
                    {l.name}
                  </span>
                  <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{l.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}

