"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Our Video Library Data
const videos = [
    { id: 0, src: "/guru-teach.mp4.mp4", titleHi: "ध्यान कैसे होता हैं ?", titleEn: "How does meditation happen?" },
    { id: 1, src: "https://www.youtube.com/embed/0HCUd_HZSA4", titleHi: "योगीजी की आत्मकथा अज्ञान से ज्ञान तक खोज में कुछ अनुभव की बातें !", titleEn: "Yogiji's Autobiography: Experiences from Ignorance to Knowledge" },
    { id: 2, src: "https://www.youtube.com/embed/UQeAF5eyqPs", titleHi: "अब जाऊं कहां", titleEn: "Where do I go now" },
    { id: 3, src: "https://www.youtube.com/embed/g7Xu_HB4ajg", titleHi: "मैं नहीं मानता राम को परमात्मा तुम्हें मानना है तो मानो !", titleEn: "I do not believe Ram is God, if you want to believe, then believe!" },
];

export default function GyanSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeVideo = videos[currentIndex];
    const isLocalVideo = activeVideo.src.endsWith(".mp4");

    // Reset state when changing slides
    useEffect(() => {
        setIsFlipped(false); // Always reset to Hindi when changing videos
        setIsPlaying(false);
        if (isLocalVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.load();
        }
    }, [currentIndex, isLocalVideo]);

    const togglePlay = () => {
        if (isLocalVideo && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextVideo = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
    const prevVideo = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

    return (
        <section id="gyan" className="w-full flex flex-col justify-center relative z-20">

            {/* 3D Flip Active Title Header */}
            <div className="mb-12 w-full flex justify-center max-w-[1400px] mx-auto mt-4">
                <div
                    className="relative cursor-pointer [perspective:2000px] group w-full max-w-4xl h-[100px] md:h-[120px]"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Hover Hint */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
                        <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to Translate</span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeVideo.id} // Crossfades when video changes
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full relative"
                        >
                            <motion.div
                                className="w-full h-full relative"
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front - Hindi Title */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <h2 className="font-devanagari text-4xl md:text-5xl lg:text-7xl text-white tracking-wide font-light drop-shadow-lg px-4">
                                        {activeVideo.titleHi}
                                    </h2>
                                </div>

                                {/* Back - English Title */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full px-4" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <h2 className="font-sans text-2xl md:text-4xl lg:text-5xl text-[#8C4A2A] tracking-[0.05em] font-light uppercase">
                                        {activeVideo.titleEn}
                                    </h2>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* The Cinematic Video Slider */}
            <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">

                {/* The Media Container (Handles both MP4 and iFrames) */}
                <div 
                    className={`w-full aspect-video md:h-[600px] lg:h-[700px] bg-[#0a0a0a] border border-white/10 rounded-lg flex items-center justify-center relative shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden group ${isLocalVideo ? 'cursor-pointer' : ''}`}
                    onClick={isLocalVideo ? togglePlay : undefined}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeVideo.id}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {isLocalVideo ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        src={activeVideo.src}
                                        className="w-full h-full object-cover relative z-0"
                                        playsInline
                                        onEnded={() => setIsPlaying(false)}
                                    />
                                    {/* Dark Overlay for Local Video */}
                                    <div className={`absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent transition-opacity duration-700 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"}`} />
                                    {/* Play Button for Local Video */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-30 pointer-events-none ${isPlaying ? "opacity-0 scale-150 pointer-events-none" : "opacity-100 scale-100"}`}>
                                        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 group-hover:bg-[#8C4A2A]/80 group-hover:border-[#8C4A2A] transition-all duration-500 shadow-2xl">
                                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <iframe
                                    ref={iframeRef}
                                    src={`${activeVideo.src}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                                    className="w-full h-full object-cover relative z-20"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={activeVideo.titleHi}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Controls */}
                <div className="w-full flex items-center justify-between mt-8 px-4">
                    <button onClick={prevVideo} className="group flex items-center gap-3 text-white/50 hover:text-[#8C4A2A] transition-colors">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8C4A2A] transition-colors">
                            <span className="block w-2 h-2 border-t border-l border-current rotate-[-45deg] ml-1"></span>
                        </div>
                        <span className="text-xs tracking-[0.3em] uppercase hidden md:block">Prev</span>
                    </button>

                    <div className="flex items-center gap-4">
                        {videos.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? "w-10 bg-[#8C4A2A]" : "w-2 bg-white/20 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>

                    <button onClick={nextVideo} className="group flex items-center gap-3 text-white/50 hover:text-[#8C4A2A] transition-colors">
                        <span className="text-xs tracking-[0.3em] uppercase hidden md:block">Next</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#8C4A2A] transition-colors">
                            <span className="block w-2 h-2 border-t border-r border-current rotate-[45deg] mr-1"></span>
                        </div>
                    </button>
                </div>

            </div>
        </section>
    );
}