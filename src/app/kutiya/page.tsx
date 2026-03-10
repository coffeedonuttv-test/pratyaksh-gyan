"use client";

import { motion } from "framer-motion";
import KutiyaSection from "@/components/KutiyaSection";

export default function KutiyaPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#8C4A2A]/30 flex flex-col items-center">

            {/* Ambient Ashram Atmosphere */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8C4A2A] opacity-[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D4AF37] opacity-[0.015] blur-[120px] pointer-events-none" />

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