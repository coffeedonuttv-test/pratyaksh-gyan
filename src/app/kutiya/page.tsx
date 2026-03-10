"use client";

import { motion } from "framer-motion";
import KutiyaSection from "@/components/KutiyaSection";

export default function KutiyaPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#8C4A2A]/30 flex flex-col items-center">

            {/* Ambient Ashram Atmosphere - Optimized for GPU Performance */}
            <div 
                className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] pointer-events-none" 
                style={{ background: 'radial-gradient(circle, rgba(140,74,42,0.05) 0%, rgba(5,5,5,0) 60%)' }}
            />
            <div 
                className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] pointer-events-none" 
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, rgba(5,5,5,0) 60%)' }}
            />

            {/* Clean Container - Removed all the messy static text */}
            <div className="relative z-10 pt-24 pb-12 container mx-auto px-6 lg:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <KutiyaSection />
                </motion.div>
            </div>
        </div>
    );
}