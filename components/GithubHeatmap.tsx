"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, Activity } from "react-activity-calendar";
import { motion, Variants } from "framer-motion";

export default function GithubHeatmap({ username }: { username: string }) {
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();

        setData(json.contributions);
        setTotal(json.totalContributions);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  const theme = {
    light: ["#ebedf0", "#99f6e4", "#2dd4bf", "#14b8a6", "#0f766e"],
    dark: ["#18181b", "#042f2e", "#0d9488", "#14b8a6", "#2dd4bf"],
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 shadow-xl shadow-teal-900/5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Contribution Activity
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 transition-colors">
            {total ? `${total.toLocaleString()} contributions in the last year` : "Live commit activity from my GitHub profile"}
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity flex items-center gap-1 self-start sm:self-auto"
        >
          @{username} ↗
        </a>
      </div>

      {/* Motion-Aligned Smooth Scroll Container */}
      <div className="w-full overflow-x-auto scroll-smooth py-2 flex justify-start md:justify-center">
        {loading ? (
          <div className="h-32 flex items-center justify-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Loading contribution graph...
          </div>
        ) : error ? (
          <div className="h-32 flex items-center justify-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Unable to load contributions right now.
          </div>
        ) : (
          <div className="min-w-max text-zinc-700 dark:text-zinc-300 transition-colors">
            <ActivityCalendar
              data={data}
              theme={theme}
              blockSize={12}
              blockRadius={3}
              blockMargin={4}
              fontSize={12}
              showWeekdayLabels
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

