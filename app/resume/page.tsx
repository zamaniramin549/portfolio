"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, Variants, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "devops">("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollY } = useScroll();

  // Smooth Interpolations for shrinking sticky header
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const descriptionMaxHeight = useTransform(scrollY, [0, 120], ["100px", "0px"]);
  const descriptionMarginTop = useTransform(scrollY, [0, 120], ["0.5rem", "0rem"]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ramin@example.com"); // Replace with your actual email
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // RESUME DATA
  const impactStats = [
    { label: "Years Experience", value: "6+" },
    { label: "Lighthouse Score", value: "98+" },
    { label: "Production Apps", value: "25+" },
    { label: "Code Coverage", value: "95%" }
  ];

  const experience = [
    {
      id: 1,
      role: "Senior Full Stack Engineer",
      company: "TechCorp Solutions",
      period: "2023 — Present",
      location: "San Francisco, CA (Remote)",
      highlights: [
        "Architected core Next.js 15 SSR dashboard supporting over 120k daily active users.",
        "Reduced initial bundle load times by 42% through aggressive dynamic code-splitting and asset optimization.",
        "Mentored a team of 6 frontend developers and established automated CI/CD code quality workflows."
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AWS", "Prisma"]
    },
    {
      id: 2,
      role: "Full Stack Engineer",
      company: "Digital Product Studio",
      period: "2021 — 2023",
      location: "New York, NY",
      highlights: [
        "Developed scalable GraphQL APIs and integrated Stripe payment pipelines processing $2M+ monthly.",
        "Built dynamic data visualization components with D3.js and Tailwind CSS for fintech analytics platforms.",
        "Engineered zero-downtime database migrations using PostgreSQL and Prisma ORM."
      ],
      tags: ["React", "Express", "PostgreSQL", "GraphQL", "Docker", "Tailwind"]
    },
    {
      id: 3,
      role: "UI/UX Engineer",
      company: "Creative Interactive Agency",
      period: "2019 — 2021",
      location: "Remote",
      highlights: [
        "Constructed custom Figma design systems and synchronized them with reusable React component libraries.",
        "Implemented smooth, accessible micro-interactions and transitions using Framer Motion."
      ],
      tags: ["Figma", "JavaScript", "React", "Framer Motion", "CSS3"]
    }
  ];

  const skillTabs = [
    { key: "all", label: "All Skills" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend & DB" },
    { key: "devops", label: "Tools & DevOps" }
  ];

  const allSkills = [
    { name: "Next.js 15 App Router", category: "frontend", level: "Expert" },
    { name: "React & React Native", category: "frontend", level: "Expert" },
    { name: "TypeScript", category: "frontend", level: "Expert" },
    { name: "Tailwind CSS v4", category: "frontend", level: "Expert" },
    { name: "Framer Motion", category: "frontend", level: "Advanced" },
    { name: "Node.js & Express", category: "backend", level: "Advanced" },
    { name: "PostgreSQL & Prisma", category: "backend", level: "Advanced" },
    { name: "GraphQL & REST APIs", category: "backend", level: "Advanced" },
    { name: "Docker & Containers", category: "devops", level: "Intermediate" },
    { name: "AWS (S3, CloudFront)", category: "devops", level: "Intermediate" },
    { name: "Git & GitHub Actions", category: "devops", level: "Advanced" },
    { name: "Figma & UI Design", category: "frontend", level: "Advanced" }
  ];

  const filteredSkills = activeTab === "all"
    ? allSkills
    : allSkills.filter(s => s.category === activeTab);

  const education = [
    {
      id: 1,
      degree: "B.S. in Computer Science & Software Engineering",
      institution: "State University of Technology",
      period: "2015 — 2019",
      notes: "Graduated with Honors. Specialization in Distributed Systems & Human-Computer Interaction."
    }
  ];

  return (
    <div className="w-full max-w-6xl pb-24">
      {/* Sticky Shrinking Header */}
      <motion.div
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="sticky top-16 lg:top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
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
              Resume & Interactive CV
            </motion.h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs md:text-sm transition-all active:scale-95"
            >
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              {copiedEmail ? "Email Copied!" : "Copy Email"}
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold text-xs md:text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4 4m4 4V4"></path></svg>
              Download PDF
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
            A comprehensive overview of my software architecture track record, core tech stack, and key career achievements.
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-16 pt-8"
      >

        {/* IMPACT METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="p-5 md:p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-center items-start relative overflow-hidden group hover:border-teal-500/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-full blur-xl group-hover:bg-teal-500/10 transition-colors"></div>
              <span className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono tracking-tight group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* WORK EXPERIENCE TIMELINE */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Professional Experience
            </h2>
          </div>

          <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-12">
            {experience.map((item) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="relative pl-6 md:pl-8 group"
              >
                {/* Timeline Dot Indicator */}
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 group-hover:border-teal-500 group-hover:bg-teal-500 transition-all duration-300"></span>

                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 dark:hover:shadow-teal-900/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{item.role}</h3>
                      <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{item.company} <span className="text-zinc-400 font-normal">• {item.location}</span></p>
                    </div>
                    <span className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 self-start md:self-auto border border-zinc-200 dark:border-zinc-700">
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {item.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <span className="text-teal-500 font-bold mt-1">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FILTERABLE SKILLS MATRIX */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Skills & Technologies
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {skillTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    activeTab === tab.key
                      ? "text-white dark:text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="skillTabHighlight"
                      className="absolute inset-0 rounded-xl bg-teal-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
                >
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {skill.level}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.095 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Education & Background
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {education.map((item) => (
              <motion.div
                key={item.id}
                variants={staggerItem}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{item.degree}</h3>
                  <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">{item.institution}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl">{item.notes}</p>
                </div>
                <span className="text-xs font-mono font-medium px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0 self-start md:self-auto border border-zinc-200 dark:border-zinc-700">
                  {item.period}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>
    </div>
  );
}

