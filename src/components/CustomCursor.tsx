"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Track mouse position instantly
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring configuration for the trailing circle
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            
            // Interaction detection (buttons, links, labels)
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button') || target.closest('div[class*="cursor-pointer"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        setIsVisible(true);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
            {/* The Tiny Bindu (Solid Center Dot) - Tracks Instantly */}
            <motion.div
                className="absolute top-0 left-0 rounded-full bg-white"
                animate={{
                    width: isHovering ? 60 : 8,
                    height: isHovering ? 60 : 8,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* The Trailing Circle (Disappears on hover to let the solid dot take over) */}
            <motion.div
                className="absolute top-0 left-0 rounded-full border border-white"
                animate={{
                    width: isHovering ? 90 : 32,
                    height: isHovering ? 90 : 32,
                    opacity: isVisible ? (isHovering ? 0 : 0.5) : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </div>
    );
}
