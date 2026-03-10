"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder Images for the Gallery
const images = [
    { id: 1, src: "/kutiya-1.jpg.jpg", alt: "The Entrance" },
    { id: 2, src: "/kutiya-2.jpg.jpg", alt: "The Darshan" },
    { id: 3, src: "/kutiya-3.jpg.jpg", alt: "The Path" },
];

export default function KutiyaSection() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="kutiya" className="w-full flex flex-col items-center justify-center relative z-20">

            {/* 3D Flip Active Title Header (Matches GYAN exactly) */}
            <div className="mb-10 w-full flex justify-center max-w-[1400px] mx-auto mt-4">
                <div
                    className="relative cursor-pointer [perspective:2000px] group w-full max-w-4xl h-[100px] md:h-[120px]"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Hover Hint */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
                        <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to Translate</span>
                    </div>

                    <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front - Hindi Title */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                            <h2 className="font-devanagari text-5xl md:text-7xl lg:text-8xl text-white tracking-wide font-light drop-shadow-lg px-4">
                                अपनों की <span className="text-[#8C4A2A] italic">कुटिया</span>
                            </h2>
                        </div>

                        {/* Back - English Title */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full px-4" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.05em] font-light uppercase">
                                Apno Ki <span className="text-[#8C4A2A] italic lowercase font-serif">Kutiya</span>
                            </h2>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Clean Description Text */}
            <div className="max-w-3xl text-center mb-24 px-4 flex flex-col items-center gap-6">
                <h3 className="text-2xl md:text-4xl text-white/90 font-light tracking-wide leading-tight">
                    A place of <span className="text-[#8C4A2A] italic font-serif">Direct Knowledge</span><br /> and profound peace.
                </h3>
                <p className="text-sm md:text-base text-white/40 leading-relaxed font-light tracking-widest max-w-xl">
                    Discover the profound teachings and the spiritual environment where seekers gather to understand the ultimate truth.
                </p>
            </div>

            {/* Fluid Image Gallery (Staggered like the videos) */}
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4">
                {images.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        layoutId={`kutiya-image-${item.id}`}
                        className={`relative aspect-[3/4] overflow-hidden cursor-pointer group rounded-sm bg-[#0a0a0a] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#8C4A2A]/40 transition-all duration-700 ${idx === 1 ? 'md:mt-16' : ''} ${idx === 2 ? 'md:mt-32' : ''}`}
                        onClick={() => setSelectedId(item.id)}
                    >
                        <div className="absolute inset-0 bg-[#8C4A2A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                        <motion.img
                            src={item.src}
                            alt={item.alt}
                            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Address Section */}
            <div className="mt-32 w-full max-w-2xl text-center border-t border-white/5 pt-16 mb-8">
                <p className="text-[#8C4A2A] text-xs tracking-[0.4em] uppercase font-light mb-8">The Physical Location</p>
                <p className="font-devanagari text-xl md:text-2xl text-white/70 leading-relaxed drop-shadow-md">
                    ग्राम अदलपुरा, पोस्ट निमरानी, तहसील कसरावद,<br /> जिला खरगोन, पश्चिम निमाड़, मध्य प्रदेश एमपी<br />पिन कोड - 451660
                </p>
            </div>

            {/* Fullscreen Lightbox for Images */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl cursor-[url('/cursor-close.svg'),_pointer]"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`kutiya-image-${selectedId}`}
                            className="relative w-[90vw] h-[80vh] md:w-[70vw] md:h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(140,74,42,0.2)] rounded-sm border border-white/10"
                        >
                            <motion.img
                                src={images.find((img) => img.id === selectedId)?.src}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="absolute bottom-10 text-white/50 tracking-[0.3em] uppercase text-xs"
                        >
                            Click anywhere to close
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}