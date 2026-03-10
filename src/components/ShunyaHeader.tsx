"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

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

    useEffect(() => {
        setMounted(true);
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
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        >
            {/* Left: Home Link */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-[#8C4A2A] shadow-[0_0_8px_rgba(140,74,42,0.8)] group-hover:shadow-[0_0_12px_rgba(140,74,42,1)] transition-shadow duration-300" />
                <span className="font-sans font-medium text-xs md:text-sm tracking-widest text-[#8C4A2A] group-hover:text-[#a65d38] transition-colors duration-300">PRATYAKSH GYAN</span>
            </Link>

            {/* Center Links */}
            <nav className="absolute left-1/2 -translate-x-1/2 items-center gap-8 hidden md:flex">
                {["GYAN", "KUTIYA", "SANGAT"].map((link) => (
                    <Link key={link} href={`/${link.toLowerCase()}`} className="font-sans text-xs font-semibold tracking-wider text-white/40 hover:text-white transition-colors duration-300">
                        {link}
                    </Link>
                ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-white/80 min-w-[100px] justify-end">
                    <span>{mounted ? time : "00:00:00 AM"}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                </div>
                <button className="font-sans text-xs font-semibold tracking-widest text-white px-5 py-2.5 rounded-full border border-[#8C4A2A] hover:bg-[#8C4A2A]/10 transition-colors hidden sm:block">
                    SANGAT
                </button>
            </div>
        </motion.header>
    );
}
