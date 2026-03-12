"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const digitalPresences = [
    {
        nameHi: "आध्यात्मिक प्रत्यक्ष ज्ञान सत्संग",
        nameEn: "Satsang Channel",
        url: "https://www.youtube.com/@%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A4%82%E0%A4%97"
    },
    {
        nameHi: "आध्यात्मिक प्रत्यक्ष ज्ञान योगी",
        nameEn: "Yogi Insights",
        url: "https://www.youtube.com/@%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%AF%E0%A5%8B%E0%A4%97%E0%A5%80"
    },
    {
        nameHi: "आध्यात्मिक प्रत्यक्ष ज्ञान",
        nameEn: "Facebook Profile",
        url: "https://www.facebook.com/p/%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7-%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8-100087055224177/"
    }
];

export default function SangatSection() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAddressFlipped, setIsAddressFlipped] = useState(false);

    return (
        <section id="sangat" className="w-full flex flex-col items-center px-4 md:px-12 lg:px-24 relative z-20">
            
            {/* 3D Flip Header */}
            <div className="mb-20 w-full flex justify-center max-w-[1400px] mx-auto mt-4">
                <div 
                    className="relative cursor-pointer [perspective:2000px] group w-full max-w-4xl h-[100px] md:h-[120px]"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
                        <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Join the Circle</span>
                    </div>

                    <motion.div
                        className="w-full h-full relative"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                            <h2 className="font-devanagari text-5xl md:text-7xl lg:text-8xl text-white tracking-wide font-light drop-shadow-lg">संगत</h2>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full px-4" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl text-[#8C4A2A] tracking-[0.2em] font-light uppercase">The Sangat</h2>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Premium WhatsApp CTA */}
            <div className="w-full max-w-3xl mb-32">
                <Link 
                    href="https://www.whatsapp.com/channel/0029VajyqtP0Qeak7bCzgA27" 
                    target="_blank"
                    className="group relative flex flex-col items-center justify-center p-12 border border-[#8C4A2A]/30 bg-white/[0.01] hover:bg-[#8C4A2A]/10 transition-all duration-700 rounded-sm overflow-hidden text-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8C4A2A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <p className="relative z-10 text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase mb-6">WhatsApp Channel</p>
                    <h3 className="relative z-10 text-3xl md:text-5xl text-white font-light tracking-widest transition-transform duration-700 group-hover:scale-105">ENTER THE CHANNEL</h3>
                    <div className="relative z-10 w-16 h-[1px] bg-[#8C4A2A] mt-8 group-hover:w-48 transition-all duration-700" />
                </Link>
            </div>

            {/* YouTube & Social Shrines Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                {digitalPresences.map((channel, idx) => (
                    <Link 
                        key={idx} 
                        href={channel.url} 
                        target="_blank"
                        className="group flex flex-col gap-8 p-12 border border-white/5 bg-[#0a0a0a] hover:border-[#8C4A2A]/50 transition-all duration-700 relative overflow-hidden"
                    >
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8C4A2A]/5 rounded-full blur-3xl group-hover:bg-[#8C4A2A]/20 transition-all duration-700" />
                        <span className="text-[#8C4A2A] text-xs font-mono tracking-tighter opacity-30">0{idx + 1}</span>
                        <div className="space-y-4">
                            <h4 className="font-devanagari text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors">{channel.nameHi}</h4>
                            <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-light">{channel.nameEn}</p>
                        </div>
                        <span className="mt-8 text-[10px] tracking-[0.3em] text-white/20 group-hover:text-[#8C4A2A] transition-colors uppercase font-medium">Visit Profile →</span>
                    </Link>
                ))}
            </div>

            {/* Address & Map Monolith */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 border-t border-white/5 pt-32">
                <div className="flex flex-col gap-10 text-center lg:text-left">
                    <p className="text-[#8C4A2A] text-xs tracking-[0.5em] uppercase font-light">Physical Presence</p>
                    
                    <div 
                        className="relative cursor-pointer [perspective:2000px] group w-full h-[200px] md:h-[180px] lg:h-[220px]"
                        onClick={() => setIsAddressFlipped(!isAddressFlipped)}
                    >
                        <div className="absolute -top-4 lg:left-0 left-1/2 lg:-translate-x-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10 lg:pl-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
                            <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to Translate</span>
                        </div>

                        <motion.div
                            className="w-full h-full relative"
                            initial={false}
                            animate={{ rotateY: isAddressFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 40, damping: 15 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Front - Hindi */}
                            <div className="absolute inset-0 flex flex-col justify-center text-center lg:text-left w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                <h3 className="font-devanagari text-2xl md:text-3xl lg:text-4xl text-white/90 leading-tight tracking-wide">
                                    ग्राम अदलपुरा, पोस्ट चीचली, तहसील कसरावद, जिला खरगोन पश्चिम निमाड़, मध्य प्रदेश
                                </h3>
                                <p className="text-white/40 text-sm tracking-[0.4em] mt-6">PIN CODE: 451660 | PHONE: +91 9244138241</p>
                            </div>

                            {/* Back - English */}
                            <div className="absolute inset-0 flex flex-col justify-center text-center lg:text-left w-full h-full" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                <h3 className="font-sans text-base md:text-lg lg:text-xl text-white/90 leading-relaxed tracking-widest uppercase font-light">
                                    Village Adalpura, Post Chichli, Tehsil Kasrawad, District Khargone West Nimar, Madhya Pradesh
                                </h3>
                                <p className="text-white/40 text-sm tracking-[0.4em] mt-6">PIN CODE: 451660 | PHONE: +91 9244138241</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <Link 
                    href="https://maps.app.goo.gl/C458xEc2WauJMSYSA?g_st=aw" 
                    target="_blank"
                    className="relative aspect-square md:aspect-video lg:aspect-square w-full bg-zinc-900 border border-white/10 rounded-sm overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="p-8 border border-white/10 backdrop-blur-xl bg-black/40 flex flex-col items-center gap-6 group-hover:border-[#8C4A2A]/50 transition-all duration-500">
                            <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">Locate the Kutiya</span>
                            <div className="w-16 h-16 rounded-full bg-[#8C4A2A] flex items-center justify-center shadow-[0_0_30px_rgba(140,74,42,0.6)] animate-pulse">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            
        </section>
    );
}
