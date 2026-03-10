"use client";

import { motion } from "framer-motion";
import GyanSection from "@/components/GyanSection";

export default function GyanPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#8C4A2A]/30">

            {/* The Divine Aura: A very subtle, massive blurred orb in the background */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8C4A2A] opacity-[0.04] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8C4A2A] opacity-[0.02] blur-[120px] pointer-events-none" />

            {/* Clean Container - Removed the redundant static text */}
            <div className="relative z-10 pt-24 pb-12 container mx-auto px-6 lg:px-12 w-full">

                {/* The Videos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <GyanSection />
                </motion.div>

            </div>
        </div>
    );
}