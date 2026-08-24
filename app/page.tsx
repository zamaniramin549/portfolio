"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Animated Ticker Stats Data
  const stats = [
    { value: "6+", label: "Years Experience", description: "Building web apps & SaaS products" },
    { value: "98+", label: "Lighthouse Score", description: "Optimized performance & SEO" },
    { value: "25+", label: "Production Apps", description: "Shipped to thousands of active users" },
    { value: "95%", label: "Code Coverage", description: "Bulletproof unit & end-to-end testing" },
  ];

  // Auto-advance ticker effect with reset capability
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentStatIndex, stats.length]); // Reset timer whenever index changes (manual click or auto)

  // Interactive handler for bullet clicks
  const handleBulletClick = (index: number) => {
    setCurrentStatIndex(index);
  };

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxIndex]);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

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

  const projects = [
    { id: 1, title: "E-Commerce Platform", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Financial Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Social Media App", img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "AI Content Generator", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
  ];

  const blogs = [
    { id: 1, title: "How I built my modern portfolio using Next.js", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Mastering Tailwind CSS for beautiful UI", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "The future of React Server Components", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop" },
  ];

  const galleryItems = [
    { id: 1, img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1500&auto=format&fit=crop", spanClass: "col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" },
    { id: 2, img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 3, img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 4, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop", spanClass: "col-span-1 md:col-span-2 aspect-square md:aspect-[21/9]" },
    { id: 5, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
  ];

  const testimonials = [
    { id: 1, name: "Jane Doe", role: "CEO, TechStartup", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", text: "This developer is incredibly talented. They delivered the project ahead of schedule and the code quality was exceptional." },
    { id: 2, name: "John Smith", role: "CTO, InnovateInc", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop", text: "A fantastic collaborator who always brings brilliant and creative solutions to the table. Highly recommended!" },
    { id: 3, name: "Sarah Lee", role: "Product Manager", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop", text: "The attention to detail and UI design skills are top-notch. Our users love the new interface they built." },
  ];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
  };
  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="w-full max-w-6xl pb-24">

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-white/50 font-medium tracking-widest text-sm">
              {lightboxIndex + 1} / {galleryItems.length}
            </div>
            <button onClick={handlePrevPhoto} className="absolute left-4 md:left-10 p-4 text-white hover:text-teal-400 hover:scale-110 transition-all cursor-pointer">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNextPhoto} className="absolute right-4 md:right-10 p-4 text-white hover:text-teal-400 hover:scale-110 transition-all cursor-pointer">
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <motion.img
              key={lightboxIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
              src={galleryItems[lightboxIndex].img} alt="Gallery Preview"
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO / ABOUT SECTION */}
      <motion.section
        id="about"
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center relative mb-32 scroll-mt-28 py-12 lg:py-0 origin-top"
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between w-full">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight transition-colors duration-300">
              Designing digital experiences that matter.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl transition-colors duration-300">
              Hi, I'm Ramin. A passionate Full Stack Developer and Designer. I specialize in building scalable web applications, crafting intuitive user interfaces, and turning complex problems into elegant solutions. Welcome to my digital space.
            </p>

            {/* ANIMATED METRICS TICKER CARD WITH INTERACTIVE BULLETS */}
            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-lg shadow-teal-900/5 relative overflow-hidden max-w-md">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between gap-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStatIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-1"
                    >
                      <span className="text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {stats[currentStatIndex].value}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-1">
                        {stats[currentStatIndex].label}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {stats[currentStatIndex].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Interactive Clickable Bullets */}
                  <div className="flex flex-col gap-2 shrink-0 z-10 p-1">
                    {stats.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBulletClick(idx)}
                        aria-label={`Go to stat ${idx + 1}`}
                        className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none`}
                      >
                        <span
                          className={`rounded-full transition-all duration-300 ${
                            idx === currentStatIndex
                              ? "w-2.5 h-6 bg-teal-500 shadow-md shadow-teal-500/30"
                              : "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-500/20">
                Get in touch
              </Link>
              <Link href="/projects" className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800">
                View my work
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-2xl group transition-colors duration-300">
            <Image
              src="/ramin-hero.JPG"
              alt="Ramin Zamanighiri"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex opacity-50">
          <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">Scroll</span>
          <svg className="w-5 h-5 text-teal-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </motion.section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="mb-32 scroll-mt-28">
        <motion.h2 variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors">
          Selected Projects
        </motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <Link href={`/projects/${project.id}`} className="block group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20">
                <div className="w-full h-56 bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 overflow-hidden relative">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">{project.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 transition-colors">A brief description of this amazing project. It solves real-world problems using modern web technologies.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:border-teal-500/30 transition-colors">Next.js</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:border-teal-500/30 transition-colors">Tailwind</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-end">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            See all projects <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section id="blogs" className="mb-32 scroll-mt-28">
        <motion.h2 variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors">
          Latest Writing
        </motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <motion.div key={blog.id} variants={staggerItem}>
              <Link href={`/blog/${blog.id}`} className="group p-4 md:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 hover:bg-white dark:hover:bg-zinc-800/80 hover:border-teal-500/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center hover:-translate-y-1">
                <div className="relative w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1 w-full">
                  <p className="text-xs text-teal-600 dark:text-teal-400 mb-2 font-mono transition-colors">August 12, 2026</p>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors mb-2">{blog.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-500 line-clamp-2 transition-colors">A deep dive into the architectural decisions, styling choices, and performance optimizations required to build a seamless experience.</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-end">
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Read more articles <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="mb-32 scroll-mt-28">
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors">Photography</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 group/gallery">
          {galleryItems.map((item, index) => (
            <motion.div key={item.id} variants={staggerItem} onClick={() => setLightboxIndex(index)} className={`${item.spanClass} relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-500 hover:scale-[1.02] hover:z-10 hover:shadow-2xl hover:shadow-teal-500/20 group-hover/gallery:[&:not(:hover)]:opacity-40 group-hover/gallery:[&:not(:hover)]:scale-[0.98] cursor-zoom-in`}>
              <img src={item.img} alt={`Gallery photo ${item.id}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium translate-y-4 hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg> View Photo</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-end">
          <Link href="/gallery" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            View all photos <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="mb-12 scroll-mt-28">
        <motion.h2 variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 transition-colors">What People Say</motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <motion.div key={item.id} variants={staggerItem} className="p-6 rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 relative hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <span className="text-6xl text-zinc-200 dark:text-zinc-800 absolute top-2 right-4 font-serif transition-colors">"</span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-8 relative z-10 italic leading-relaxed transition-colors">"{item.text}"</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 transition-colors">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors">{item.name}</h4>
                  <p className="text-xs text-teal-600 dark:text-teal-500 transition-colors">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-end">
          <Link href="/testimonials" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            View all testimonials <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}

