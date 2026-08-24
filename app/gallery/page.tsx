"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, Variants, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
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

  const galleryItems = [
    { id: 1, title: "Urban Reflections", img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1500&auto=format&fit=crop", spanClass: "col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" },
    { id: 2, title: "Minimalist Architecture", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 3, title: "Developer Desk Setup", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 4, title: "Neon Cyberpunk Lights", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop", spanClass: "col-span-1 md:col-span-2 aspect-square md:aspect-[21/9]" },
    { id: 5, title: "Macro Hardware Close-up", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 6, title: "Misty Mountain Pines", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
    { id: 7, title: "Coastal Sunset Waves", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 md:col-span-2 aspect-square md:aspect-[21/9]" },
    { id: 8, title: "Abstract Geometry", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", spanClass: "col-span-1 aspect-square" },
  ];

  // Lightbox Navigation Controls
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

            {/* Photo Counter */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-white/50 font-medium tracking-widest text-sm">
              {lightboxIndex + 1} / {galleryItems.length}
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
              src={galleryItems[lightboxIndex].img}
              alt={galleryItems[lightboxIndex].title}
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
            Photography
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
              A curated collection of photos capturing architecture, minimalist workspaces, landscapes, and cityscapes.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bento Grid Gallery with Motion */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-8 group/gallery"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={staggerItem}
            onClick={() => setLightboxIndex(index)}
            className={`${item.spanClass} relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 transition-all duration-500 hover:scale-[1.02] hover:z-10 hover:shadow-2xl hover:shadow-teal-500/20 group-hover/gallery:[&:not(:hover)]:opacity-40 group-hover/gallery:[&:not(:hover)]:scale-[0.98] cursor-zoom-in`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-medium translate-y-4 hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                {item.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

