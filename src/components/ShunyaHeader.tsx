"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function ShunyaHeader() {
    const { scrollYProgress } = useScroll();

    // Transform background opacity and border based on scroll
    const background = useTransform(
        scrollYProgress,
        [0, 0.1],
        ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.4)"]
    );

    const backdropBlur = useTransform(
        scrollYProgress,
        [0, 0.1],
        ["blur(0px)", "blur(12px)"]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.1],
        ["rgba(140, 74, 42, 0)", "rgba(140, 74, 42, 0.2)"]
    );

    const [time, setTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 0);
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.header
            style={{
                background,
                backdropFilter: backdropBlur,
                WebkitBackdropFilter: backdropBlur,
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: borderColor
            }}
            className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-4 md:px-8 py-4 md:py-5 transition-all duration-300 pt-[calc(env(safe-area-inset-top)+1rem)] md:pt-[calc(env(safe-area-inset-top)+1.25rem)]"
        >
            {/* Left: Home Link */}
            <Magnetic strength={0.2}>
                <Link href="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer p-2 z-[70] max-w-[60vw] sm:max-w-none min-h-[44px]">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#8C4A2A] shrink-0 shadow-[0_0_8px_rgba(140,74,42,0.8)] group-hover:shadow-[0_0_12px_rgba(140,74,42,1)] transition-shadow duration-300" />
                    <span className="font-sans font-medium text-[9px] sm:text-[10px] md:text-sm tracking-widest text-[#8C4A2A] group-hover:text-[#a65d38] transition-colors duration-300 leading-tight">AADHYATMIK PRATYAKSH GYAN SATSANG</span>
                </Link>
            </Magnetic>

            {/* Center Links */}
            <nav className="absolute left-1/2 -translate-x-1/2 items-center gap-8 hidden md:flex z-[70]">
                {["GYAN", "KUTIYA", "SANGAT", "JIGYASA"].map((link) => (
                    <Magnetic key={link} strength={0.5}>
                        <Link href={`/${link.toLowerCase()}`} className="font-sans text-xs font-semibold tracking-wider text-white/40 hover:text-white transition-colors duration-300 p-2 min-h-[44px] flex items-center">
                            {link}
                        </Link>
                    </Magnetic>
                ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-6 z-[70]">
                <div className="flex items-center gap-2 font-mono text-[10px] md:text-sm text-white/80 min-w-[80px] md:min-w-[100px] justify-end">
                    <span>{mounted ? time : "00:00:00 AM"}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                </div>
                <Magnetic strength={0.4}>
                    <Link href="/sangat" className="font-sans text-xs font-semibold tracking-widest text-white px-5 py-2.5 rounded-full border border-[#8C4A2A] hover:bg-[#8C4A2A]/10 transition-colors hidden sm:block shrink-0">
                        SANGAT
                    </Link>
                </Magnetic>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-5 h-[1.5px] bg-[#8C4A2A] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
                    <div className={`w-5 h-[1.5px] bg-[#8C4A2A] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-5 h-[1.5px] bg-[#8C4A2A] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-10 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:hidden"
                    >
                        {["GYAN", "KUTIYA", "SANGAT", "JIGYASA"].map((link) => (
                            <Link
                                key={link}
                                href={`/${link.toLowerCase()}`}
                                className="font-sans text-2xl font-light tracking-[0.2em] text-[#8C4A2A] hover:text-[#a65d38] transition-colors duration-300 min-h-[44px] min-w-[200px] flex items-center justify-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
