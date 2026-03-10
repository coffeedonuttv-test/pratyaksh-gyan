"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <footer className="w-full bg-[#030202] border-t border-[#8C4A2A]/20 pt-20 pb-8 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-between relative z-20">

            {/* Top Section - Interactive 3D Quote */}
            <div
                className="w-full max-w-7xl mb-16 cursor-pointer [perspective:2000px] group flex flex-col items-center"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="relative w-full h-[140px] md:h-[180px] lg:h-[200px] flex items-center justify-center"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front - Hindi */}
                    <div
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                        <h2 className="font-devanagari text-4xl md:text-6xl lg:text-[4.5vw] leading-tight text-white/10 group-hover:text-[#8C4A2A]/40 transition-colors duration-700 text-center tracking-wide w-full">
                            ईमानदारी मुक्ति है, बेईमान बंधन।
                        </h2>
                    </div>

                    {/* Back - English */}
                    <div
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <h2 className="font-sans text-3xl md:text-5xl lg:text-[3vw] leading-tight text-white/10 group-hover:text-[#8C4A2A]/40 transition-colors duration-700 text-center tracking-[0.1em] uppercase font-light w-full">
                            Honesty is liberation; dishonesty is bondage.
                        </h2>
                    </div>
                </motion.div>

                {/* Subtle interaction hint */}
                <p className="text-[10px] text-[#8C4A2A] tracking-[0.4em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Click to Translate
                </p>
            </div>

            {/* Middle Section - Centered Minimal Navigation (Removed extra logo) */}
            <div className="w-full max-w-3xl flex justify-center mb-20 border-t border-b border-white/5 py-8">
                <nav className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white/40 tracking-[0.3em] font-light text-xs md:text-sm uppercase">
                    <Link href="/gyan" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Teachings
                    </Link>
                    <Link href="/kutiya" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Kutiya
                    </Link>
                    <Link href="/sangat" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Sangat
                    </Link>
                </nav>
            </div>

            {/* Bottom Section - Copyright Dedication */}
            <div className="w-full max-w-7xl flex items-center justify-center pt-4 mt-auto">
                <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase text-center font-medium">
                    © 2026 Pratyaksh Gyan. A digital offering.
                </p>
            </div>

        </footer>
    );
}