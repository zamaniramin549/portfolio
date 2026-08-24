"use client";

import Link from "next/link";
import { motion, Variants, useScroll, useTransform } from "framer-motion";

export default function TestimonialsPage() {
  const { scrollY } = useScroll();

  // Smooth Interpolations over 150px of scrolling
  const headerPadding = useTransform(scrollY, [0, 150], ["2.5rem", "0.75rem"]);
  const titleSize = useTransform(scrollY, [0, 150], ["2.25rem", "1.25rem"]);

  // Smoothly fade out subtext
  const descriptionOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  // Flexible max-height collapse
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

  const allTestimonials = [
    {
      id: 1,
      name: "Jane Doe",
      role: "CEO, TechStartup",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "Ramin is an incredibly talented developer. They delivered our full-stack application ahead of schedule, and the architectural quality of the codebase was exceptional."
    },
    {
      id: 2,
      name: "John Smith",
      role: "CTO, InnovateInc",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
      text: "A fantastic collaborator who always brings brilliant and creative solutions to the table. Their ability to solve complex technical bottlenecks saved us weeks of work."
    },
    {
      id: 3,
      name: "Sarah Lee",
      role: "Product Manager, DesignCo",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
      text: "The attention to detail and UI design skills are top-notch. Our active users absolutely love the intuitive design and fluid interactions they built."
    },
    {
      id: 4,
      name: "Alex Rivera",
      role: "Founder, SaaSFlow",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "Working with Ramin was an absolute breeze. Communication was seamless throughout the project, and the final Next.js build scored a 100 on Lighthouse performance."
    },
    {
      id: 5,
      name: "Emily Chen",
      role: "VP of Engineering, CloudScale",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      text: "Ramin transformed our legacy application into a modern, lightning-fast web experience. Their expertise in Tailwind and state management made a massive difference."
    },
    {
      id: 6,
      name: "Marcus Vance",
      role: "Creative Director, StudioNine",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      text: "Not only is Ramin a sharp developer, but they also have a designer's eye. Every animation, layout grid, and micro-interaction felt polished and intentional."
    }
  ];

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
            Client Testimonials
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
              Feedback and reviews from founders, engineering managers, and product leads I've collaborated with.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Grid with Stagger Motion */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8"
      >
        {allTestimonials.map((item) => (
          <motion.div
            key={item.id}
            variants={staggerItem}
            className="p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 relative hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-teal-900/5 dark:hover:shadow-teal-900/10 hover:-translate-y-1"
          >
            <div>
              <span className="text-6xl text-zinc-200 dark:text-zinc-800 absolute top-4 right-6 font-serif pointer-events-none transition-colors">"</span>
              <p className="text-base text-zinc-700 dark:text-zinc-300 mb-8 relative z-10 italic leading-relaxed transition-colors">
                "{item.text}"
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shrink-0 transition-colors">
                 <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 transition-colors">{item.name}</h3>
                <p className="text-xs font-mono text-teal-600 dark:text-teal-400 transition-colors">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

