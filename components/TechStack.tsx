"use client";

import { motion, Variants } from "framer-motion";

export default function TechStack() {
  const skillCategories = [
    {
      category: "Frontend & Architecture",
      skills: [
        { name: "Next.js", desc: "React framework for Server Components, SSR, ISR, and optimized performance." },
        { name: "React", desc: "Declarative UI component library with custom hooks and state management." },
        { name: "TypeScript", desc: "Strict static typing for scalable codebase reliability and self-documentation." },
        { name: "Tailwind CSS", desc: "Utility-first styling system for responsive, modern UI design patterns." },
      ]
    },
    {
      category: "Backend & APIs",
      skills: [
        { name: "RESTful APIs", desc: "Architecting standardized HTTP endpoints with secure JSON payloads." },
        { name: "GraphQL", desc: "Flexible query language fetching exact data specs in single requests." },
        { name: "Node.js", desc: "Event-driven runtime for high-throughput server side backend microservices." },
        { name: "PostgreSQL", desc: "Relational database management, complex SQL querying, and schema indexing." },
      ]
    },
    {
      category: "DevOps & Tooling",
      skills: [
        { name: "Docker", desc: "Containerizing software to guarantee consistent multi-environment deployments." },
        { name: "Git & GitHub", desc: "Branching strategies, CI/CD pipelines, and open-source collaboration." },
        { name: "Framer Motion", desc: "Production-ready animation engine for fluid, interactive web physics." },
        { name: "WebSockets", desc: "Bi-directional real-time communication protocols for live data streaming." },
      ]
    }
  ];

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

  return (
    <section id="tech-stack" className="mb-32 scroll-mt-28">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors">
          Tech Stack & Mastery
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 transition-colors">
          Core technologies, frameworks, and architectural protocols I specialize in.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={staggerItem}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-teal-900/5 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-teal-600 dark:text-teal-400 mb-6 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                {cat.category}
              </h3>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      {skill.name}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed transition-colors pl-3">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

