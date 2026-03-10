"use client";

import { motion } from "framer-motion";
import SangatSection from "@/components/SangatSection";

export default function SangatPage() {
    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden selection:bg-[#8C4A2A]/30 flex flex-col items-center">
            
            {/* The Divine Aura Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8C4A2A] opacity-[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8C4A2A] opacity-[0.02] blur-[120px] pointer-events-none" />

            <div className="relative z-10 pt-24 pb-12 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <SangatSection />
                </motion.div>
            </div>
        </div>
    );
}
