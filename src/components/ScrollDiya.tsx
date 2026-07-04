"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function ScrollDiya() {
    const { scrollYProgress, scrollY } = useScroll();

    // ─── Scroll Progress (existing liquid physics) ──────────────────────
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 14,
        mass: 0.8,
        restDelta: 0.001
    });

    const [percent, setPercent] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setPercent(Math.round(latest * 100));
    });



    // Flame intensity driven by scroll depth
    const flameOpacity = useTransform(smoothProgress, [0, 1], [0.3, 1]);
    const flameScale = useTransform(smoothProgress, [0, 1], [0.5, 1.8], { clamp: false });
    const springPercentOutput = useTransform(smoothProgress, [0, 1], [0, 100]);

    // ─── KINETIC WIND PHYSICS — "The Breath of the Spirit" ─────────────
    const scrollVelocity = useVelocity(scrollY);

    // Map velocity → flame tilt (wind effect)
    // Fast scroll down (+velocity) → flame tilts backward (-deg)
    // Fast scroll up (-velocity) → flame tilts forward (+deg)
    const rawTilt = useTransform(scrollVelocity, [-2000, 0, 2000], [18, 0, -18]);
    const smoothTilt = useSpring(rawTilt, { stiffness: 150, damping: 15, mass: 0.5 });

    // Ambient glow expansion: grows when scrolling fast
    const rawGlowScale = useTransform(scrollVelocity, [-1500, 0, 1500], [1.6, 1, 1.6]);
    const glowScale = useSpring(rawGlowScale, { stiffness: 100, damping: 20 });

    // Flame colors based on scroll depth
    const isLit = percent >= 98;
    const activeColor = "#FF9933";
    const dormantColor = "#8C4A2A";

    return (
        <motion.div
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-center gap-3 pointer-events-none"
        >
            <div className="relative flex items-center justify-center w-16 h-16">

                {/* 
                    MULTI-LAYERED VOLUMETRIC HALO 
                */}

                {/* 1. Outer Ambient Bleed — now expands with scroll velocity */}
                <motion.div
                    style={{ 
                        opacity: useTransform(flameOpacity, v => v * 0.4), 
                        scale: glowScale 
                    }}
                    className={`absolute w-12 h-12 rounded-full blur-[30px] transition-colors duration-700 ${isLit ? 'bg-[#FF9933]' : 'bg-[#8C4A2A]'}`}
                />

                {/* 2. Mid Glow */}
                <motion.div
                    style={{ 
                        opacity: useTransform(flameOpacity, v => v * 0.7), 
                        scale: useTransform(flameScale, v => v * 0.8) 
                    }}
                    className={`absolute w-8 h-8 rounded-full blur-[15px] transition-colors duration-500 ${isLit ? 'bg-[#FF9933]' : 'bg-[#8C4A2A]'}`}
                />

                {/* 3. Core Spark */}
                <motion.div
                    style={{ 
                        opacity: flameOpacity, 
                        scale: useTransform(flameScale, v => v * 0.5) 
                    }}
                    className={`absolute w-4 h-4 rounded-full blur-[6px] transition-colors duration-300 ${isLit ? 'bg-[#FFFFFF]' : 'bg-[#FF9933]'}`}
                />

                {/* Glassmorphic Puck */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0.85, 1], [0, 1]) }}
                    className="absolute inset-[-4px] rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/10 z-[5] shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                />

                {/* The Physical SVG Diya — base stays rock-solid */}
                <motion.div 
                    style={{ scale: useTransform(smoothProgress, [0, 1], [1, 1.15], { clamp: false }) }}
                    className="z-10 text-white/80"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-2xl relative z-10">
                        {/* Base of Diya — IMMOVABLE, anchored */}
                        <path 
                            d="M12 21C17.5228 21 22 18 22 15C22 13.5 17.5228 13 12 13C6.47715 13 2 13.5 2 15C2 18 6.47715 21 12 21Z" 
                            fill={isLit ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)"}
                            stroke={isLit ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="transition-all duration-1000"
                        />
                        {/* Inner flame vessel — TILTS with scroll velocity wind */}
                        <motion.g
                            style={{
                                rotate: smoothTilt,
                                transformOrigin: "12px 13px", // pivot at the base of the flame
                            }}
                        >
                            <path 
                                d="M12 13C12 9 10 5 12 2C14 5 12 9 12 13Z" 
                                fill={isLit ? activeColor : dormantColor} 
                                stroke={isLit ? "#FFFFFF" : "rgba(255,255,255,0.6)"} 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="transition-all duration-500" 
                            />
                        </motion.g>
                    </svg>
                </motion.div>

                {/* Resting State: Subtle breathing pulse when idle */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-14 h-14 rounded-full ${isLit ? 'bg-[#FF9933]' : 'bg-[#8C4A2A]'} blur-xl`}
                />
            </div>

            {/* Spring-Driven Typography */}
            <div className={`font-sans text-[11px] tracking-[0.2em] font-medium font-mono min-w-[36px] text-center transition-all duration-500 ${isLit ? 'text-white translate-y-1' : 'text-[#8C4A2A]'}`}>
                <motion.span>{useTransform(springPercentOutput, (v) => Math.round(v))}</motion.span>%
            </div>
        </motion.div>
    );
}
