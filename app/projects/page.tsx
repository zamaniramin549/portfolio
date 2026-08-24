"use client";

import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

export default function ProjectsPage() {
  const { scrollY } = useScroll();

  // Smooth Interpolations over 150px of scrolling
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);

  // Smoothly fade out the subtext
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  // Use maxHeight instead of height so wrapped text never gets truncated
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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

  const allProjects = [
    { id: 1, title: "E-Commerce Platform", tags: ["Next.js", "Stripe", "Tailwind"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Financial Dashboard", tags: ["React", "Chart.js", "TypeScript"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Social Media App", tags: ["Next.js", "Prisma", "PostgreSQL"], img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "AI Content Generator", tags: ["OpenAI", "Next.js", "Tailwind"], img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Fitness Tracking App", tags: ["React Native", "GraphQL"], img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Real Estate Portal", tags: ["Next.js", "Mapbox", "Tailwind"], img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" },
    { id: 7, title: "SaaS Task Management", tags: ["Vue", "Tailwind", "Firebase"], img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop" },
    { id: 8, title: "Portfolio Template", tags: ["Next.js", "Framer Motion"], img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop" },
    { id: 9, title: "Healthcare Booking System", tags: ["React", "Node.js", "MongoDB"], img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" },
    { id: 10, title: "Crypto Market Tracker", tags: ["Next.js", "REST API", "Tailwind"], img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop" },
    { id: 11, title: "Educational LMS Platform", tags: ["Next.js", "AWS", "TypeScript"], img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop" },
    { id: 12, title: "Music Streaming Web App", tags: ["React", "Redux", "Spotify API"], img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full max-w-6xl pb-24">
      {/* Sticky Header */}
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
            All Projects
          </motion.h1>

          {/* Flexible max-height wrapper prevents text truncation */}
          <motion.div
            style={{
              opacity: descriptionOpacity,
              maxHeight: descriptionMaxHeight,
              marginTop: descriptionMarginTop
            }}
            className="overflow-hidden pointer-events-none transition-all"
          >
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl transition-colors">
              A comprehensive collection of my work, ranging from web applications to user interface design.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-8"
      >
        {allProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <Link
              href={`/projects/${project.id}`}
              className="block group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20"
            >
              <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 transition-colors">
                A brief description of this amazing project. It solves real-world problems using modern web technologies.
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

