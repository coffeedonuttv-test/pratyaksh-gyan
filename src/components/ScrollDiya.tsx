"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function ScrollDiya() {
    const { scrollYProgress } = useScroll();
    const [percent, setPercent] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setPercent(Math.round(latest * 100));
    });

    // Flame becomes brighter dynamically. It starts as a small spark (0.3 opacity) to super bright (1 opacity).
    const flameOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    // Flame grows. Notice the base scale is never 0, ensuring it's always visible as a spark.
    const flameScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.8]);
    // The overall container only fades slightly at the very beginning to initialize.
    const containerOpacity = useTransform(scrollYProgress, [0, 0.05], [0.5, 1]);

    return (
        <motion.div
            style={{ opacity: containerOpacity }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3 pointer-events-none"
        >
            <div className="relative flex items-center justify-center w-12 h-12">
                {/* Persistent Supercharged Flame Glow / Shadow */}
                <motion.div
                    style={{
                        opacity: flameOpacity,
                        scale: flameScale,
                        filter: `drop-shadow(0 0 ${percent / 8 + 2}px #FF9933)` // +2 ensures a tiny shadow even at 0%
                    }}
                    className={`absolute w-8 h-8 rounded-full blur-xl transition-all duration-300 ${percent >= 99 ? 'animate-flicker bg-[#FF9933]' : 'bg-[#FF9933]'}`}
                />

                {/* SVG Diya / Lotus Bud */}
                <div className={`z-10 text-white/80 transition-transform ${percent >= 99 ? 'scale-110' : ''}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        {/* Base of Diya clearly visible, min opacity 0.4 */}
                        <path d="M12 21C17.5228 21 22 18 22 15C22 13.5 17.5228 13 12 13C6.47715 13 2 13.5 2 15C2 18 6.47715 21 12 21Z" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Inner flame */}
                        <path d="M12 13C12 9 10 5 12 2C14 5 12 9 12 13Z" fill={percent >= 99 ? "#FF9933" : "#8C4A2A"} stroke={percent >= 99 ? "#FF9933" : "rgba(255,255,255,0.3)"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500" />
                    </svg>
                </div>
            </div>
            <span
                className={`font-sans text-[10px] tracking-[0.2em] font-medium font-mono min-w-[30px] text-center transition-colors duration-300 ${percent > 80 ? 'text-white' : 'text-[#8C4A2A]'}`}
            >
                {percent}%
            </span>
        </motion.div>
    );
}
