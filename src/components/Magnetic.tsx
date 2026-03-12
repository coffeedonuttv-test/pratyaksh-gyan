"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode, strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Snappy spring physics for the magnetic pull
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate coordinate center of object
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={`inline-block ${isHovered ? "z-10" : ""}`}
        >
            {children}
        </motion.div>
    );
}
