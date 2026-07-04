"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const channels: {
    index: string;
    hi: string;
    en: string;
    cta_hi: string;
    cta_en: string;
    url: string;
    isHighlight?: boolean;
}[] = [
    {
        index: "01",
        hi: "आध्यात्मिक प्रत्यक्ष ज्ञान — आधिकारिक व्हाट्सएप चैनल",
        en: "Aadhyatmik Pratyaksh Gyan — Official WhatsApp Channel",
        cta_hi: "जुड़ने हेतु क्लिक करें →",
        cta_en: "Enter Channel →",
        url: "https://www.whatsapp.com/channel/0029VajyqtP0Qeak7bCzgA27",
        isHighlight: true,
    },
    {
        index: "02",
        hi: "आध्यात्मिक प्रत्यक्ष ज्ञान सत्संग — मुख्य यूट्यूब चैनल",
        en: "Satsang Channel — Main YouTube Discourse",
        cta_hi: "चैनल देखें →",
        cta_en: "Visit Channel →",
        url: "https://www.youtube.com/@%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A4%82%E0%A4%97",
    },
    {
        index: "03",
        hi: "आध्यात्मिक प्रत्यक्ष ज्ञान योगी — संक्षिप्त विचार एवं सूत्र",
        en: "Yogi Insights — Short Teachings & Wisdom",
        cta_hi: "चैनल देखें →",
        cta_en: "Visit Channel →",
        url: "https://www.youtube.com/@%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%AF%E0%A5%8B%E0%A4%97%E0%A5%80",
    },
    {
        index: "04",
        hi: "आध्यात्मिक प्रत्यक्ष ज्ञान — फेसबुक पेज",
        en: "Facebook Community — Official Profile",
        cta_hi: "पेज देखें →",
        cta_en: "Visit Profile →",
        url: "https://www.facebook.com/p/%E0%A4%86%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%B7-%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8-100087055224177/",
    },
];

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

// ─── COPY BUTTON ─────────────────────────────────────────────────────────────

function CopyButton({
    value,
    label_hi,
    label_en,
    lang,
}: {
    value: string;
    label_hi: string;
    label_en: string;
    lang: "HI" | "EN";
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // shield: must NOT trigger global lang flip
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className="group/copy relative w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-6 md:p-8 border border-white/10 bg-white/[0.02] hover:bg-[#8C4A2A]/10 transition-all duration-500 rounded-sm overflow-hidden"
            aria-label={`Copy ${value}`}
        >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8C4A2A] scale-y-0 group-hover/copy:scale-y-100 origin-top transition-transform duration-500" />

            {/* Label */}
            <p className="text-[9px] tracking-[0.45em] uppercase text-white/30 font-light shrink-0 z-10">
                {lang === "HI" ? label_hi : label_en}
            </p>

            {/* Value + copied state */}
            <div className="flex items-center gap-4 z-10">
                <span className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wider font-mono group-hover/copy:text-white/80 transition-colors duration-300">
                    {value}
                </span>
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span
                            key="copied"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-bold shrink-0"
                        >
                            {lang === "HI" ? "✦ कॉपी किया गया" : "✦ COPIED"}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-white/20 text-[9px] tracking-[0.35em] uppercase font-light shrink-0 opacity-0 group-hover/copy:opacity-100 transition-opacity duration-300"
                        >
                            {lang === "HI" ? "✦ कॉपी करें" : "✦ COPY"}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}

// ─── SHRINE ROW ───────────────────────────────────────────────────────────────

function ShrineRow({
    channel,
    lang,
    hoveredIndex,
    onHover,
    onLeave,
}: {
    channel: (typeof channels)[number];
    lang: "HI" | "EN";
    hoveredIndex: string | null;
    onHover: (i: string) => void;
    onLeave: () => void;
}) {
    const isDimmed = hoveredIndex !== null && hoveredIndex !== channel.index;

    return (
        <Link
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // shield: opens link, never flips lang
            onMouseEnter={() => onHover(channel.index)}
            onMouseLeave={onLeave}
            className={`
                group/shrine relative flex flex-col md:flex-row md:items-center justify-between
                gap-4 py-8 md:py-10 border-b border-white/10
                transition-all duration-500 ease-out
                ${isDimmed ? "lg:opacity-20" : "opacity-100"}
                lg:hover:translate-x-3
            `}
        >
            {/* Highlight bar for WhatsApp (primary CTA) */}
            {channel.isHighlight && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8C4A2A] opacity-60" />
            )}

            <div className="flex items-start md:items-center gap-6 flex-1 min-w-0">
                {/* Index */}
                <span className="shrink-0 text-[#8C4A2A] text-xs font-mono tracking-[0.3em] opacity-40 pt-0.5 w-7">
                    {channel.index}
                </span>

                {/* Name */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={lang}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className={`text-base md:text-lg lg:text-xl text-[#F4F2EB]/60 lg:group-hover/shrine:text-[#F4F2EB] transition-colors duration-300 leading-snug ${lang === "HI" ? "font-devanagari tracking-wide" : "font-light tracking-wide"}`}
                        >
                            {lang === "HI" ? channel.hi : channel.en}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            {/* CTA */}
            <div className="ml-13 md:ml-0 shrink-0">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`text-[10px] tracking-[0.4em] uppercase text-white/20 lg:group-hover/shrine:text-[#8C4A2A] transition-colors duration-300 font-light ${lang === "HI" ? "font-devanagari" : ""}`}
                    >
                        {lang === "HI" ? channel.cta_hi : channel.cta_en}
                    </motion.span>
                </AnimatePresence>
            </div>
        </Link>
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SangatSection() {
    const [lang, setLang] = useState<"HI" | "EN">("HI");
    const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

    const toggleLang = () => setLang((prev) => (prev === "HI" ? "EN" : "HI"));

    return (
        <>
            {/* Floating ambient cue — fixed, pointer-events-none */}
            <AmbientCue lang={lang} />

            {/* ── TAP-ANYWHERE CANVAS ── */}
            <section
                id="sangat"
                className="w-full flex flex-col items-center relative z-20 cursor-default"
                onClick={toggleLang}
            >

                {/* ═══════════════════════════════════════════════════
                    ACT I — THE COMMUNITY GATEWAY
                ═══════════════════════════════════════════════════ */}
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-8 pb-16 md:pb-20">

                    {/* 3D Flip Header */}
                    <div className="mb-20 w-full flex justify-center">
                        <div
                            className="relative cursor-pointer [perspective:2000px] group w-full max-w-4xl h-[100px] md:h-[120px]"
                            onClick={(e) => { e.stopPropagation(); setIsHeaderFlipped((v) => !v); }}
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse" />
                                <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to Flip</span>
                            </div>
                            <motion.div
                                className="w-full h-full relative"
                                initial={false}
                                animate={{ rotateY: isHeaderFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <h1 className="font-devanagari text-5xl md:text-7xl lg:text-8xl text-white tracking-wide font-light drop-shadow-lg">
                                        संगत
                                    </h1>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl text-[#8C4A2A] tracking-[0.2em] font-light uppercase">
                                        The Sangat
                                    </h1>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Section label */}
                    <div className="flex items-center justify-between mb-4 pb-6 border-b border-white/8">
                        <LangText
                            lang={lang}
                            hi={<p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light font-devanagari">डिजिटल संगत — आधिकारिक चैनल</p>}
                            en={<p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light">Digital Sangat — Official Channels</p>}
                        />
                        <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase font-light hidden md:block">
                            {lang === "HI" ? "↕ कहीं भी टैप करें" : "↕ Tap anywhere"}
                        </p>
                    </div>

                    {/* Asymmetric Shrines Ledger */}
                    <div>
                        {channels.map((ch) => (
                            <ShrineRow
                                key={ch.index}
                                channel={ch}
                                lang={lang}
                                hoveredIndex={hoveredIndex}
                                onHover={setHoveredIndex}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════
                    ACT II — THE SEVA MONOLITH
                ═══════════════════════════════════════════════════ */}
                <div className="w-full border-t border-white/5 bg-[#030303] py-16 md:py-20 px-6 md:px-12 lg:px-24">
                    <div className="max-w-[1400px] mx-auto">

                        {/* Section title */}
                        <div className="mb-16 min-h-[70px]">
                            <LangText
                                lang={lang}
                                hi={
                                    <div>
                                        <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-4">सहयोग हेतु बैंक विवरण</p>
                                        <h2 className="font-devanagari text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide">
                                            सहयोग विवरण <span className="text-[#8C4A2A] italic">(सेवा)</span>
                                        </h2>
                                        <p className="font-devanagari text-white/35 text-sm tracking-wide mt-3 font-light">
                                            जागृति एवं &lsquo;अपनों की कुटिया&rsquo; के निरंतर प्रवाह हेतु समर्पण
                                        </p>
                                    </div>
                                }
                                en={
                                    <div>
                                        <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-4">Bank Details for Seva</p>
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-[0.04em]">
                                            The Flow of <span className="text-[#8C4A2A] italic font-serif">Seva</span>
                                        </h2>
                                        <p className="text-white/35 text-sm tracking-widest mt-3 font-light uppercase">
                                            Supporting the Awakening &nbsp;•&nbsp; Sustaining Apno Ki Kutiya
                                        </p>
                                    </div>
                                }
                            />
                        </div>

                        {/* Monolith card */}
                        <div className="group relative w-full bg-[#0a0a0a] border border-white/5 hover:border-[#8C4A2A]/20 transition-all duration-1000 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                            {/* Ambient corner glows */}
                            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#8C4A2A]/8 rounded-full blur-3xl group-hover:bg-[#8C4A2A]/15 transition-all duration-1000 pointer-events-none" />
                            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#8C4A2A]/5 rounded-full blur-3xl group-hover:bg-[#8C4A2A]/12 transition-all duration-1000 pointer-events-none" />

                            <div className="relative z-10 flex flex-col">

                                {/* Top Section (Grid) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-8 md:p-14 lg:p-16 items-center">
                                    {/* Left Column (Trust & Bank Info) */}
                                    <div className="lg:col-span-6 flex flex-col justify-center space-y-10">
                                        <div>
                                            <LangText
                                                lang={lang}
                                                hi={<p className="text-[10px] tracking-[0.5em] uppercase text-[#8C4A2A] font-light mb-8">न्यास / संस्था</p>}
                                                en={<p className="text-[10px] tracking-[0.5em] uppercase text-[#8C4A2A] font-light mb-8">Trust / Organisation</p>}
                                            />
                                            <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-light tracking-[0.05em] leading-[1.4]">
                                                AADHYATMIK PRATYAKSH GYAN SATSANG<br />
                                                <span className="text-[#8C4A2A] font-serif italic drop-shadow-[0_0_15px_rgba(140,74,42,0.25)]">
                                                    APNO KI KUTIYA
                                                </span>
                                            </h3>
                                        </div>

                                        <div>
                                            <LangText
                                                lang={lang}
                                                hi={<p className="text-[10px] tracking-[0.5em] uppercase text-white/25 font-light mb-4">बैंक एवं खाता प्रकार</p>}
                                                en={<p className="text-[10px] tracking-[0.5em] uppercase text-white/25 font-light mb-4">Bank &amp; Account Type</p>}
                                            />
                                            <LangText
                                                lang={lang}
                                                hi={<p className="text-white/80 text-lg lg:text-xl font-light tracking-widest">बैंक ऑफ बड़ौदा (Bank of Baroda) — चालू खाता</p>}
                                                en={<p className="text-white/80 text-lg lg:text-xl font-light tracking-widest">Bank of Baroda — Current Account</p>}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column (Copyable Boxes) */}
                                    <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                                        <CopyButton
                                            value="44540200001327"
                                            label_hi="खाता संख्या"
                                            label_en="Account Number"
                                            lang={lang}
                                        />
                                        <CopyButton
                                            value="BARB0THIKRI"
                                            label_hi="आईएफएससी कोड"
                                            label_en="IFSC Code"
                                            lang={lang}
                                        />
                                    </div>
                                </div>

                                {/* Bottom Section (Full-Width Footer) */}
                                <div className="w-full border-t border-white/10 p-6 md:px-16 flex items-center justify-center lg:justify-start bg-black/40 gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shrink-0 shadow-[0_0_8px_rgba(140,74,42,0.8)]" />
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={lang}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`text-white/25 text-[9px] tracking-[0.35em] uppercase font-light leading-relaxed ${lang === "HI" ? "font-devanagari" : ""}`}
                                        >
                                            {lang === "HI"
                                                ? "आपका सहयोग सीधे कुटिया और ज्ञान के प्रचार-प्रसार को समर्पित है।"
                                                : "YOUR SEVA DIRECTLY SUSTAINS THE KUTIYA AND SPIRITUAL MISSION."}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
