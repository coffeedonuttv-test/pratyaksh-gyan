"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useState } from "react";

export default function ScrollDiya() {
    const { scrollYProgress } = useScroll();
    
    // Liquid Physics: Apply mass, stiffness, and low damping for that Awwwards "overshoot bounce"
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 14,
        mass: 0.8,
        restDelta: 0.001
    });

    const [percent, setPercent] = useState(0);

    // Update specific discrete states (like color flips) based on the raw progress so they don't bounce backward randomly
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setPercent(Math.round(latest * 100));
    });

    // The entire component fades in gracefully at the very top of the page
    const containerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    // Flame Core Analytics (Driven by the spring physics)
    // Starts as a dim spark (0.3), explodes to blistering bright (1) with overshoot ability.
    const flameOpacity = useTransform(smoothProgress, [0, 1], [0.3, 1]);
    
    // clamp: false allows the heavy liquid overshoot. If you scroll fast to the bottom, scale goes > 1.8 before resting.
    const flameScale = useTransform(smoothProgress, [0, 1], [0.5, 1.8], { clamp: false });
    
    // The visual integer number output driven directly by the physics spring, interpolating instantly
    const springPercentOutput = useTransform(smoothProgress, [0, 1], [0, 100]);

    // Flame colors based on scroll depth
    const isLit = percent >= 98; // Trigger true ignition at the absolute bottom
    const activeColor = "#FF9933"; // Scorching orange
    const dormantColor = "#8C4A2A"; // Deep rusted brown

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="fixed bottom-8 right-8 z-[90] flex flex-col items-center gap-3 pointer-events-none"
        >
            <div className="relative flex items-center justify-center w-16 h-16">
                
                {/* 
                    MULTI-LAYERED VOLUMETRIC HALO 
                    Creating actual depth of light with 3 distinct physical layers 
                */}
                
                {/* 1. Outer Ambient Bleed (Massive spread, low opacity) */}
                <motion.div
                    style={{ 
                        opacity: useTransform(flameOpacity, v => v * 0.4), 
                        scale: flameScale 
                    }}
                    className={`absolute w-12 h-12 rounded-full blur-[30px] transition-colors duration-700 ${isLit ? 'bg-[#FF9933]' : 'bg-[#8C4A2A]'}`}
                />

                {/* 2. Mid Glow (Medium spread, grounding the light source) */}
                <motion.div
                    style={{ 
                        opacity: useTransform(flameOpacity, v => v * 0.7), 
                        scale: useTransform(flameScale, v => v * 0.8) 
                    }}
                    className={`absolute w-8 h-8 rounded-full blur-[15px] transition-colors duration-500 ${isLit ? 'bg-[#FF9933]' : 'bg-[#8C4A2A]'}`}
                />

                {/* 3. Core Spark (Tight, intense heat directly against the SVG path) */}
                <motion.div
                    style={{ 
                        opacity: flameOpacity, 
                        scale: useTransform(flameScale, v => v * 0.5) 
                    }}
                    className={`absolute w-4 h-4 rounded-full blur-[6px] transition-colors duration-300 ${isLit ? 'bg-[#FFFFFF]' : 'bg-[#FF9933]'}`}
                />

                {/* The Physical SVG Diya / Lotus Bud */}
                <motion.div 
                    style={{ scale: useTransform(smoothProgress, [0, 1], [1, 1.15], { clamp: false }) }}
                    className="z-10 text-white/80"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-2xl">
                        {/* Base of Diya */}
                        <path 
                            d="M12 21C17.5228 21 22 18 22 15C22 13.5 17.5228 13 12 13C6.47715 13 2 13.5 2 15C2 18 6.47715 21 12 21Z" 
                            stroke="rgba(255, 255, 255, 0.4)" 
                            strokeWidth="1.2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="transition-colors duration-1000"
                        />
                        {/* Inner physical flame vessel */}
                        <path 
                            d="M12 13C12 9 10 5 12 2C14 5 12 9 12 13Z" 
                            fill={isLit ? activeColor : dormantColor} 
                            stroke={isLit ? "#FFFFFF" : "rgba(255,255,255,0.2)"} 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="transition-all duration-500" 
                        />
                    </svg>
                </motion.div>
            </div>

            {/* Spring-Driven Typography */}
            <div className={`font-sans text-[11px] tracking-[0.2em] font-medium font-mono min-w-[36px] text-center transition-colors duration-500 ${isLit ? 'text-white' : 'text-[#8C4A2A]'}`}>
                <motion.span>{useTransform(springPercentOutput, (v) => Math.round(v))}</motion.span>%
            </div>
        </motion.div>
    );
}
