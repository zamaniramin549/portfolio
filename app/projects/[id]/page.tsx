"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id ? Number(params.id) : 1;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxIndex]);

  const { scrollY } = useScroll();

  // Smooth Interpolations for shrinking sticky header
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  // Mock Database for Dynamic Lookup
  const projectsData: Record<number, {
    title: string;
    subtitle: string;
    role: string;
    timeline: string;
    client: string;
    heroImg: string;
    overview: string;
    challenge: string;
    solution: string;
    tags: string[];
    liveUrl: string;
    gallery: string[];
  }> = {
    1: {
      title: "E-Commerce Platform",
      subtitle: "A modern, high-performance online store with seamless Stripe checkout and real-time inventory management.",
      role: "Lead Full Stack Developer",
      timeline: "3 Months (2026)",
      client: "Retail Brand Co.",
      heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      overview: "Built from the ground up to support high-volume consumer traffic, this web application delivers sub-second page loads, automated tax calculations, and dynamic product variants.",
      challenge: "The legacy system suffered from 4-second initial loading delays, causing high checkout abandonment rates during flash sales.",
      solution: "Migrated the storefront to Next.js App Router with Server Components and automated static asset caching, cutting bounce rates by 65%.",
      tags: ["Next.js", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL"],
      liveUrl: "https://example.com",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    2: {
      title: "Financial Dashboard",
      subtitle: "Real-time crypto and stock portfolio analytics engine with interactive charting tools.",
      role: "Frontend Architect",
      timeline: "2 Months (2026)",
      client: "FinTech Innovations",
      heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      overview: "Designed for active day traders and financial analysts, this dashboard processes WebSockets market data feeds with zero UI lag.",
      challenge: "Rendering thousands of incoming price ticks per second caused frequent browser frame drops and high memory usage.",
      solution: "Implemented canvas-based chart rendering and Web Worker data parsing to maintain 60 FPS under extreme market volatility.",
      tags: ["React", "Chart.js", "TypeScript", "WebSockets", "Tailwind CSS"],
      liveUrl: "https://example.com",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  };

  const project = projectsData[projectId] || projectsData[1];

  // Lightbox Navigation Controls
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
  };
  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="w-full max-w-6xl pb-24">

      {/* FULLSCREEN LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-white/50 font-medium tracking-widest text-sm">
              {lightboxIndex + 1} / {project.gallery.length}
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 md:left-10 p-4 text-white hover:text-teal-400 hover:scale-110 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 md:right-10 p-4 text-white hover:text-teal-400 hover:scale-110 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Image Display */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} screenshot ${lightboxIndex + 1}`}
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Shrinking Header */}
      <motion.div
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="sticky top-16 lg:top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 hover:opacity-80 transition-opacity mb-2 group"
            >
              <svg className="w-3.5 h-3.5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
              Back to All Projects
            </Link>

            <motion.h1
              style={{ fontSize: titleSize }}
              className="font-extrabold text-zinc-900 dark:text-zinc-100 transition-colors leading-tight"
            >
              {project.title}
            </motion.h1>
          </div>

          <div className="shrink-0 self-start md:self-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold text-xs md:text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-500/20"
            >
              Live Demo ↗
            </a>
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
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl transition-colors">
            {project.subtitle}
          </p>
        </motion.div>
      </motion.div>

      {/* Main Showcase Area */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-12 pt-8"
      >
        {/* Hero Cover Banner */}
        <motion.div variants={staggerItem} className="w-full h-80 md:h-[450px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-100 dark:bg-zinc-900 shadow-xl">
          <img src={project.heroImg} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Project Metadata Stats Bar */}
        <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-teal-600 dark:text-teal-400">Role</span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-1">{project.role}</p>
          </div>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-teal-600 dark:text-teal-400">Timeline</span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-1">{project.timeline}</p>
          </div>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-teal-600 dark:text-teal-400">Client</span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-1">{project.client}</p>
          </div>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-teal-600 dark:text-teal-400">Stack</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t} •</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technical Narrative Sections */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Project Overview</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">{project.overview}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> The Challenge
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.challenge}</p>
              </section>

              <section className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span> The Solution
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.solution}</p>
              </section>
            </div>
          </div>

          {/* Sidebar Tech Specs */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Screenshots Gallery with Lightbox Trigger */}
        <motion.div variants={staggerItem} className="space-y-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Interface Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group/screenshots">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 relative cursor-zoom-in group/img transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/20 group-hover/screenshots:[&:not(:hover)]:opacity-50"
              >
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-sm font-medium translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                    Expand Screenshot
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

