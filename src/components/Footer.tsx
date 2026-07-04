"use client";

import Link from "next/link";
import { useState } from "react";
import { useTextMorph } from "@/hooks/useTextMorph";

export default function Footer() {
    const [langState, setLangState] = useState(0);

    const quoteMain = useTextMorph(
        langState === 0 ? "ईमानदारी मुक्ति है, बेईमानी बंधन।" : "Honesty is liberation; dishonesty is bondage.", 
        langState, 
        1200
    );

    return (
        <footer className="w-full bg-[#070606] border-t border-[#8C4A2A]/20 pt-16 pb-8 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-between relative z-20">

            {/* Top Section - Interactive Text Morph Quote */}
            <div
                className="w-full max-w-7xl mb-10 cursor-pointer group flex flex-col items-center"
                onClick={() => setLangState(prev => prev === 0 ? 1 : 0)}
            >
                <div className="relative w-full h-[140px] md:h-[180px] lg:h-[200px] flex items-center justify-center text-center">
                    <h2 className="font-devanagari text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#F4F2EB]/15 group-hover:text-[#8C4A2A]/50 transition-colors duration-700 leading-relaxed flex flex-wrap justify-center w-full">
                        {quoteMain === "ईमानदारी मुक्ति है, बेईमानी बंधन।" ? (
                            <>ईमानदारी मुक्ति है<span className="font-sans mx-1">,</span> बेईमानी बंधन<span className="font-sans ml-1">।</span></>
                        ) : (
                            <span className="font-sans font-light tracking-[0.1em] uppercase lg:text-[3vw]">{quoteMain}</span>
                        )}
                    </h2>
                </div>

                {/* Subtle interaction hint */}
                <p className="text-[10px] text-[#8C4A2A] tracking-[0.4em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Click to Translate
                </p>
            </div>

            {/* Middle Section - Centered Minimal Navigation */}
            <div className="w-full max-w-3xl flex justify-center mb-8 border-t border-b border-white/5 py-8">
                <nav className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-[#A6A298] tracking-[0.3em] font-light text-xs md:text-sm uppercase">
                    <Link href="/gyan" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Teachings
                    </Link>
                    <Link href="/kutiya" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Kutiya
                    </Link>
                    <Link href="/sangat" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        The Sangat
                    </Link>
                    <Link href="/jigyasa" className="hover:text-[#8C4A2A] transition-colors duration-300">
                        Jigyasa
                    </Link>
                </nav>
            </div>

            {/* Bottom Section - Copyright Dedication */}
            <div className="w-full max-w-7xl flex items-center justify-center pt-4 mt-auto">
                <p className="text-[10px] text-[#A6A298]/60 tracking-[0.4em] uppercase text-center font-medium">
                    © 2026 Pratyaksh Gyan. A digital offering.
                </p>
            </div>

        </footer>
    );
}