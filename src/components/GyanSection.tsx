"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── DATA: HYBRID VIDEO PIPELINE ─────────────────────────────────────────────

interface Teaching {
    id: number;
    videoUrl: string;
    titleHi: string;
    titleEn: string;
    subtitleHi: string;
    subtitleEn: string;
    isPinned?: boolean;
    isLocal?: boolean;
}

const teachings: Teaching[] = [
    {
        id: 0,
        videoUrl: "/guru-teach.mp4.mp4",
        titleHi: "ध्यान कैसे होता हैं ?",
        titleEn: "How does meditation happen?",
        subtitleHi: "मूलभूत शिक्षा • प्रत्यक्ष अनुभव",
        subtitleEn: "The Foundational Teaching • Direct Experience",
        isPinned: true,
        isLocal: true,
    },
    {
        id: 1,
        videoUrl: "https://www.youtube.com/embed/0HCUd_HZSA4",
        titleHi: "योगीजी की आत्मकथा — अज्ञान से ज्ञान तक, खोज में कुछ अनुभव की बातें",
        titleEn: "Yogiji's Autobiography — Experiences from Ignorance to Knowledge",
        subtitleHi: "आत्मकथा • जीवन यात्रा",
        subtitleEn: "Autobiography • Life Journey",
    },
    {
        id: 2,
        videoUrl: "https://www.youtube.com/embed/UQeAF5eyqPs",
        titleHi: "अब जाऊं कहां",
        titleEn: "Where do I go now",
        subtitleHi: "आत्म-चिंतन • गहन प्रश्न",
        subtitleEn: "Self-Reflection • Deep Inquiry",
    },
    {
        id: 3,
        videoUrl: "https://www.youtube.com/embed/g7Xu_HB4ajg",
        titleHi: "मैं नहीं मानता राम को परमात्मा — तुम्हें मानना है तो मानो",
        titleEn: "I do not believe Ram is God — If you want to believe, then believe",
        subtitleHi: "विमर्श • प्रत्यक्ष ज्ञान",
        subtitleEn: "Discourse • Direct Knowledge",
    },
];

const pinnedTeaching = teachings[0];
const gridTeachings = teachings.slice(1);

// ─── LANG TEXT WRAPPER ────────────────────────────────────────────────────────

function LangText({
    lang,
    hi,
    en,
    className = "",
}: {
    lang: "HI" | "EN";
    hi: React.ReactNode;
    en: React.ReactNode;
    className?: string;
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={lang}
                initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className={className}
            >
                {lang === "HI" ? hi : en}
            </motion.div>
        </AnimatePresence>
    );
}

// ─── FLOATING AMBIENT CUE ─────────────────────────────────────────────────────

function AmbientCue({ lang }: { lang: "HI" | "EN" }) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={lang}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-[#050505]/80 border border-white/8 backdrop-blur-md"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shrink-0" />
                    <p className={`text-white/30 text-[9px] tracking-[0.35em] uppercase font-light ${lang === "HI" ? "font-devanagari" : ""}`}>
                        {lang === "HI"
                            ? "अनुवाद हेतु स्क्रीन पर कहीं भी टैप करें"
                            : "Tap anywhere on screen to translate"}
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shrink-0" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── SUTRA CINEMA HERO ────────────────────────────────────────────────────────

function SutraCinemaHero({
    teaching,
    lang,
}: {
    teaching: Teaching;
    lang: "HI" | "EN";
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // shield: play/pause ≠ lang flip
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

            {/* Section label */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/8">
                <LangText
                    lang={lang}
                    hi={<p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light font-devanagari">सूत्र सिनेमा — मूलभूत शिक्षा</p>}
                    en={<p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light">Sutra Cinema — Foundational Teaching</p>}
                />
                <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase font-light hidden md:block">
                    {lang === "HI" ? "↕ कहीं भी टैप करें" : "↕ Tap anywhere"}
                </p>
            </div>

            {/* Hero Title */}
            <div className="mb-10 min-h-[80px]">
                <LangText
                    lang={lang}
                    hi={
                        <div>
                            <h2 className="font-devanagari text-4xl md:text-5xl lg:text-7xl text-white font-light tracking-wide drop-shadow-lg">
                                {teaching.titleHi}
                            </h2>
                            <p className="font-devanagari text-white/30 text-sm tracking-wide mt-3 font-light">
                                {teaching.subtitleHi}
                            </p>
                        </div>
                    }
                    en={
                        <div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-[0.04em] drop-shadow-lg">
                                {teaching.titleEn}
                            </h2>
                            <p className="text-white/30 text-sm tracking-widest mt-3 font-light uppercase">
                                {teaching.subtitleEn}
                            </p>
                        </div>
                    }
                />
            </div>

            {/* Cinematic Frame */}
            <div className="group relative">
                {/* Saffron ambient glow behind the player */}
                <div className="absolute -inset-4 bg-[#8C4A2A]/5 rounded-sm blur-2xl group-hover:bg-[#8C4A2A]/10 transition-all duration-1000 pointer-events-none" />

                <div
                    className="relative w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] cursor-pointer"
                    onClick={togglePlay}
                >
                    <video
                        ref={videoRef}
                        src={teaching.videoUrl}
                        className="w-full h-full object-cover"
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                    />

                    {/* Cinematic gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent transition-opacity duration-700 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"}`} />

                    {/* Play button */}
                    <div className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-all duration-500 ${isPlaying ? "opacity-0 scale-150" : "opacity-100 scale-100"}`}>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 group-hover:bg-[#8C4A2A]/60 group-hover:border-[#8C4A2A] transition-all duration-500 shadow-2xl">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1.5" />
                        </div>
                    </div>

                    {/* Bottom gradient bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}

// ─── FOCUS GRID ROW ───────────────────────────────────────────────────────────

function FocusGridRow({
    teaching,
    lang,
    hoveredId,
    onHover,
    onLeave,
}: {
    teaching: Teaching;
    lang: "HI" | "EN";
    hoveredId: number | null;
    onHover: (id: number) => void;
    onLeave: () => void;
}) {
    const isDimmed = hoveredId !== null && hoveredId !== teaching.id;

    return (
        <Link
            href={teaching.videoUrl.replace("/embed/", "/watch?v=")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // shield: opens video, never flips lang
            onMouseEnter={() => onHover(teaching.id)}
            onMouseLeave={onLeave}
            className={`
                group/row relative flex flex-col lg:flex-row lg:items-center justify-between
                gap-5 py-10 md:py-12 border-b border-white/10
                transition-all duration-500 ease-out
                ${isDimmed ? "lg:opacity-20" : "opacity-100"}
                lg:hover:translate-x-3
            `}
        >
            {/* Left: Index + Title */}
            <div className="flex items-start lg:items-center gap-6 flex-1 min-w-0">
                <span className="shrink-0 text-[#8C4A2A] text-xs font-mono tracking-[0.3em] opacity-40 pt-0.5 w-7">
                    {String(teaching.id).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={lang}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                            <p className={`text-base md:text-lg lg:text-xl text-white/60 lg:group-hover/row:text-white transition-colors duration-300 leading-snug ${lang === "HI" ? "font-devanagari tracking-wide" : "font-light tracking-wide"}`}>
                                {lang === "HI" ? teaching.titleHi : teaching.titleEn}
                            </p>
                            <p className={`text-white/20 text-[10px] tracking-[0.3em] uppercase font-light mt-2 ${lang === "HI" ? "font-devanagari" : ""}`}>
                                {lang === "HI" ? teaching.subtitleHi : teaching.subtitleEn}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: Thumbnail + CTA */}
            <div className="flex items-center gap-6 ml-13 lg:ml-0 shrink-0">
                {/* Mini thumbnail */}
                <div className="w-32 h-20 md:w-40 md:h-24 bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden relative group-hover/row:border-[#8C4A2A]/30 transition-colors duration-300">
                    <iframe
                        src={`${teaching.videoUrl}?controls=0&modestbranding=1&rel=0`}
                        className="w-full h-full object-cover pointer-events-none"
                        title={teaching.titleEn}
                        tabIndex={-1}
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 lg:group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`text-[10px] tracking-[0.4em] uppercase text-white/20 lg:group-hover/row:text-[#8C4A2A] transition-colors duration-300 font-light hidden md:block ${lang === "HI" ? "font-devanagari" : ""}`}
                    >
                        {lang === "HI" ? "सत्संग देखें →" : "Watch Discourse →"}
                    </motion.span>
                </AnimatePresence>
            </div>
        </Link>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function GyanSection() {
    const [lang, setLang] = useState<"HI" | "EN">("HI");
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const toggleLang = () => setLang((prev) => (prev === "HI" ? "EN" : "HI"));

    return (
        <>
            {/* Floating ambient cue */}
            <AmbientCue lang={lang} />

            {/* ── TAP-ANYWHERE CANVAS ── */}
            <section
                id="gyan"
                className="w-full flex flex-col items-center relative z-20 cursor-default"
                onClick={toggleLang}
            >

                {/* ═══════════════════════════════════════════════════
                    ACT I — SUTRA CINEMA (PINNED HERO)
                ═══════════════════════════════════════════════════ */}
                <SutraCinemaHero teaching={pinnedTeaching} lang={lang} />

                {/* ═══════════════════════════════════════════════════
                    ACT II — THE FOCUS GRID (DISCOURSE STREAM)
                ═══════════════════════════════════════════════════ */}
                <div className="w-full border-t border-white/5 bg-[#030303] mt-24 md:mt-32">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">

                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 border-b border-white/10 pb-10">
                            <div>
                                <LangText
                                    lang={lang}
                                    hi={
                                        <div>
                                            <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-4 font-devanagari">हाल के प्रवचन</p>
                                            <h2 className="font-devanagari text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide">
                                                सत्संग <span className="text-[#8C4A2A]">प्रवाह</span>
                                            </h2>
                                        </div>
                                    }
                                    en={
                                        <div>
                                            <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-4">Recent Discourses</p>
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-[0.04em]">
                                                Discourse <span className="text-[#8C4A2A] italic font-serif">Stream</span>
                                            </h2>
                                        </div>
                                    }
                                />
                            </div>
                            <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase font-light hidden md:block self-end pb-1">
                                {lang === "HI" ? "↕ अनुवाद हेतु कहीं भी क्लिक करें" : "↕ Click anywhere to translate"}
                            </p>
                        </div>

                        {/* Grid Rows */}
                        <div>
                            {gridTeachings.map((t) => (
                                <FocusGridRow
                                    key={t.id}
                                    teaching={t}
                                    lang={lang}
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                    onLeave={() => setHoveredId(null)}
                                />
                            ))}
                        </div>

                        {/* Channel CTA */}
                        <div className="mt-16 pt-10 border-t border-white/5 flex justify-center">
                            <Link
                                href="https://www.youtube.com/@%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A4%82%E0%A4%97"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="group flex items-center gap-4 px-8 py-4 border border-white/10 bg-white/[0.02] hover:border-[#8C4A2A]/40 hover:bg-[#8C4A2A]/10 transition-all duration-500 rounded-sm"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#8C4A2A] animate-pulse" />
                                <LangText
                                    lang={lang}
                                    hi={<span className="text-white/60 text-xs tracking-[0.3em] uppercase font-light font-devanagari group-hover:text-white transition-colors duration-300">सम्पूर्ण सत्संग चैनल देखें →</span>}
                                    en={<span className="text-white/60 text-xs tracking-[0.3em] uppercase font-light group-hover:text-white transition-colors duration-300">Explore Full Satsang Channel →</span>}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}