"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const rules: { hi: string; en: string }[] = [
    {
        hi: "साधक को सर्वप्रथम 'अपनों की कुटिया' में उपलब्ध व्यक्तिगत विवरण फॉर्म भरना अनिवार्य है। फॉर्म में उल्लेखित परिवार के सदस्य से प्रबंधन की बातचीत होना आवश्यक है।",
        en: "Seeker must first fill out the personal details form provided at 'Apno Ki Kutiya'. It is mandatory to have the designated family member speak with management.",
    },
    {
        hi: "कुटिया में साधना की संपूर्ण अवधि के दौरान साधक को अपना मोबाइल फोन पूर्णतः बंद रखना होगा।",
        en: "Seeker must keep their mobile phone switched off for the entire duration of Sadhana at the Kutiya.",
    },
    {
        hi: "साधक केवल वास्तविक आध्यात्मिक प्रश्नों के साथ ही 'अपनों की कुटिया' में रह सकते हैं।",
        en: "Seeker can only stay in 'Apno Ki Kutiya' with genuine spiritual questions.",
    },
    {
        hi: "साधक को किसी अन्य से बात करने या मुस्कुराने की सख्त मनाही है। (नोट: अति आवश्यक होने पर केवल प्रबंधक से बात की जा सकती है।)",
        en: "It is strictly forbidden for the seeker to talk or smile to anyone else. (Note: If absolutely necessary, speak to the manager only).",
    },
    {
        hi: "दैनिक नित्यकर्म पूर्ण करने के पश्चात्, साधक को आसन बिछाकर आत्म-चिंतन हेतु वटवृक्ष के नीचे बैठना होगा।",
        en: "After completing daily routine activities, the seeker must take an asana and sit under the banyan tree for self-reflection.",
    },
    {
        hi: "साधक को केवल अल्पाहार एवं भोजन के समय ही हॉल में प्रवेश करने की अनुमति है।",
        en: "Seeker is allowed to enter the dining hall only during breakfast and meal times.",
    },
    {
        hi: "साधक को अपने साथ बाहर की कोई भी खाद्य सामग्री लाने की अनुमति नहीं है।",
        en: "Seeker is strictly prohibited from bringing any outside food items into the premises.",
    },
    {
        hi: "कुटिया छोड़ने से पूर्व साधक को अपने द्वारा उपयोग की गई चटाई, आसन और कंबल को स्वयं धोना होगा।",
        en: "Seeker must personally wash their used mat, seat, and blanket before leaving the Kutiya.",
    },
    {
        hi: "प्रबंधक की अनुमति के बिना साधक को नर्मदा नदी के तट पर जाने की अनुमति नहीं है। (नोट: अनुमति केवल प्रबंधक से ही ली जानी चाहिए।)",
        en: "Seeker is not allowed to go to the banks of the Narmada River without explicit permission. (Note: Permission must be taken from the manager only).",
    },
    {
        hi: "साधक को अनिवार्य रूप से कुटिया के परिसर के भीतर ही रहना होगा।",
        en: "Seeker must strictly remain within the physical boundary of the Kutiya premises.",
    },
    {
        hi: "साधक को अपना पर्स, फोन, कीमती सामान आदि कुटिया के लॉकर में रखना होगा और चाबी अपनी जिम्मेदारी पर रखनी होगी। (नोट: प्रबंधन किसी भी सामान के लिए जिम्मेदार नहीं होगा।)",
        en: "Seeker must keep their purse, phone, and valuables in the locker under their own responsibility. (Note: Management is not responsible for seeker's belongings).",
    },
    {
        hi: "साधक को केवल आत्म-चिंतन करना होगा और किसी भी बाह्य क्रिया जैसे माला-जप, शास्त्र-अध्ययन, डायरी लेखन आदि में संलग्न नहीं होना है।",
        en: "Seeker must practice pure self-reflection only and must not engage in external practices such as mala-japa, scripture study, or diary writing.",
    },
    {
        hi: "योगी जी के चरण स्पर्श करना या उनसे बातचीत करना सख्त मना है। (नोट: आप केवल सत्संग के दौरान ही अपने आध्यात्मिक प्रश्न पूछ सकते हैं।)",
        en: "It is strictly prohibited to touch Yogi Ji's feet or speak to him outside official Satsang sessions. (Note: Questions allowed during Satsang only).",
    },
];

// ─── LANG TEXT WRAPPER — blur/fade crossfade ──────────────────────────────────

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
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={className}
            >
                {lang === "HI" ? hi : en}
            </motion.div>
        </AnimatePresence>
    );
}

// ─── COPY BUTTON — stopPropagation to prevent canvas flip ────────────────────

function CopyButton({ value, children }: { value: string; children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // ← shield: do NOT trigger canvas language flip
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className="group/copy relative inline-flex items-center gap-3 cursor-pointer text-left"
            aria-label={`Copy ${value}`}
        >
            <span className="text-white/70 group-hover/copy:text-white transition-colors duration-300">{children}</span>
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="copied"
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-bold shrink-0"
                    >
                        ✦ COPIED
                    </motion.span>
                ) : (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-white/20 text-[9px] tracking-[0.3em] uppercase font-light shrink-0 opacity-0 group-hover/copy:opacity-100 transition-opacity duration-300"
                    >
                        COPY
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

// ─── RULE ROW — reads master lang, hover-dim on desktop ──────────────────────

function RuleRow({
    index,
    rule,
    lang,
    hoveredIndex,
    onHover,
    onLeave,
}: {
    index: number;
    rule: { hi: string; en: string };
    lang: "HI" | "EN";
    hoveredIndex: number | null;
    onHover: (i: number) => void;
    onLeave: () => void;
}) {
    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

    return (
        <div
            className={`group/row relative flex items-start gap-6 py-7 border-b border-white/10 transition-opacity duration-500 ${isDimmed ? "lg:opacity-20" : "opacity-100"}`}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={onLeave}
        >
            <span className="shrink-0 text-[#8C4A2A] text-xs font-mono tracking-[0.3em] opacity-50 pt-1 w-8 text-right">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={lang}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`leading-relaxed text-sm md:text-base text-[#F4F2EB]/70 lg:group-hover/row:text-[#F4F2EB] transition-colors duration-300 ${lang === "HI" ? "font-devanagari tracking-wide" : "font-light tracking-wide"}`}
                    >
                        {lang === "HI" ? rule.hi : rule.en}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
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
                    <p className={`text-white/35 text-[9px] tracking-[0.35em] uppercase font-light ${lang === "HI" ? "font-devanagari" : ""}`}>
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

export default function KutiyaSection() {
    const [lang, setLang] = useState<"HI" | "EN">("HI");
    const [isHeaderFlipped, setIsHeaderFlipped] = useState(false);
    const [hoveredRuleIndex, setHoveredRuleIndex] = useState<number | null>(null);

    const toggleLang = () => setLang((prev) => (prev === "HI" ? "EN" : "HI"));

    return (
        <>
            {/* Floating ambient tap-hint — fixed, pointer-events-none */}
            <AmbientCue lang={lang} />

            {/* ── TAP-ANYWHERE CANVAS ── */}
            <section
                className="w-full flex flex-col items-center relative z-20 bg-[#050505] cursor-default"
                onClick={toggleLang}
            >

                {/* ═══════════════════════════════════════════════════
                    ACT I — HERO FOUNDATION
                ═══════════════════════════════════════════════════ */}
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-8 pb-16">

                    {/* 3D Flip Header — stopPropagation so header flip ≠ lang flip */}
                    <div className="mb-12 w-full flex justify-center">
                        <div
                            className="relative cursor-pointer [perspective:2000px] group w-full max-w-4xl h-[100px] md:h-[130px]"
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
                                        अपनों की <span className="text-[#8C4A2A] italic">कुटिया</span>
                                    </h1>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                    <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.05em] font-light uppercase">
                                        Apno Ki <span className="text-[#8C4A2A] italic lowercase font-serif">Kutiya</span>
                                    </h1>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Foundation Plaque — bilingual watermark, intentionally fixed */}
                    <div className="flex justify-center mb-10">
                        <div className="flex items-center gap-4 border border-white/10 px-6 py-3">
                            <div className="w-1 h-1 rounded-full bg-[#8C4A2A]" />
                            <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase font-light">
                                स्थापना: 16 मई 2024 &nbsp;·&nbsp; Est. May 16, 2024
                            </p>
                            <div className="w-1 h-1 rounded-full bg-[#8C4A2A]" />
                        </div>
                    </div>

                    {/* Free Food & Shelter Banner */}
                    <div className="flex justify-center mb-16">
                        <div className="relative flex items-center gap-4 bg-[#8C4A2A]/10 border border-[#8C4A2A]/30 px-8 py-5 max-w-2xl text-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8C4A2A]/5 via-[#8C4A2A]/10 to-[#8C4A2A]/5 pointer-events-none" />
                            <span className="text-[#8C4A2A] text-lg shrink-0">✦</span>
                            <LangText
                                lang={lang}
                                hi={<p className="relative text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase font-light leading-relaxed font-devanagari">साधक हेतु नि:शुल्क भोजन एवं आवास की व्यवस्था</p>}
                                en={<p className="relative text-white/90 text-xs md:text-sm tracking-[0.2em] uppercase font-light leading-relaxed">Free food and accommodation provided for the sincere seeker</p>}
                            />
                            <span className="text-[#8C4A2A] text-lg shrink-0">✦</span>
                        </div>
                    </div>

                    {/* Intro Body */}
                    <div className="max-w-4xl mx-auto text-center min-h-[160px]">
                        <LangText
                            lang={lang}
                            hi={
                                <p className="font-devanagari text-base md:text-lg text-white/70 leading-loose tracking-wide">
                                    योगी रविकांत जी &lsquo;अपनों की कुटिया&rsquo; के संस्थापक हैं—एक अद्वितीय आध्यात्मिक आश्रम जो सच्चे साधकों और सत्य की खोज करने वालों हेतु निर्मित किया गया है। यह संभवतः विश्व का पहला ऐसा आश्रम है जहाँ वास्तविक साधकों को बिना किसी सांसारिक बाध्यता के—7 दिनों से लेकर संपूर्ण जीवन तक—केवल आध्यात्मिक उन्नति और मुक्ति की दिशा में कार्य करने हेतु आमंत्रित किया जाता है। यहाँ एक जीवित आत्मज्ञानी गुरु का प्रत्यक्ष मार्गदर्शन और आत्म-रूपांतरण हेतु शांत वातावरण प्राप्त होता है।
                                </p>
                            }
                            en={
                                <p className="text-base md:text-lg text-white/70 leading-relaxed tracking-wide font-light">
                                    Yogi Ravikant Ji is the founder of Apno Ki Kutiya—a unique spiritual hermitage created for sincere spiritual aspirants and truth seekers. It is perhaps the world&apos;s very first ashram where genuine truth seekers are invited to live without any worldly obligation—from a minimum of 7 days to an entire lifetime—simply for spiritual growth and liberation. It provides a serene environment and direct guidance from a living Enlightened Master.
                                </p>
                            }
                        />
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════
                    ACT II — THE UNSHAKEABLE LAW MONOLITH
                ═══════════════════════════════════════════════════ */}
                <div className="w-full bg-[#030303] border-y border-white/5 py-24 md:py-32 px-6 md:px-12 lg:px-24">
                    <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center gap-12">

                        {/* Core mantra */}
                        <div className="flex flex-col items-center gap-4 min-h-[130px] justify-center">
                            <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light">
                                {lang === "HI" ? "अटल नियम" : "The Unshakeable Law"}
                            </p>
                            <LangText
                                lang={lang}
                                hi={
                                    <h2 className="font-devanagari text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                                        &ldquo;रहो तो साधो.&rdquo;
                                    </h2>
                                }
                                en={
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-tight tracking-wide drop-shadow-[0_0_30px_rgba(255,255,255,0.08)] italic font-serif">
                                        &ldquo;If you stay, improve; otherwise, leave.&rdquo;
                                    </h2>
                                }
                            />
                        </div>

                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#8C4A2A]/40 to-transparent" />

                        {/* Zero-Tolerance Notice */}
                        <div className="max-w-3xl w-full border border-white/8 bg-white/[0.02] p-8 md:p-12 space-y-4 min-h-[110px]">
                            <p className="text-[10px] tracking-[0.5em] uppercase text-[#8C4A2A] font-light">
                                {lang === "HI" ? "अनिवार्य सूचना" : "Zero-Tolerance Notice"}
                            </p>
                            <LangText
                                lang={lang}
                                hi={
                                    <p className="font-devanagari text-sm md:text-base text-[#F4F2EB]/75 leading-relaxed tracking-wide">
                                        महत्वपूर्ण सूचना: यदि आश्रम के उपरोक्त नियमों का उल्लंघन किया जाता है, तो साधक को तुरंत कुटिया छोड़नी होगी। | साधना हेतु न्यूनतम 7 दिनों का प्रवास अनिवार्य है।
                                    </p>
                                }
                                en={
                                    <p className="text-sm md:text-base text-[#F4F2EB]/75 leading-relaxed tracking-wide font-light">
                                        Important Notice: If the ashram rules are violated, the seeker will be required to leave the hermitage immediately. | Seekers must stay for a minimum of 7 days for Sadhana.
                                    </p>
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════
                    ACT III — THE 13 SACRED COMMANDMENTS
                ═══════════════════════════════════════════════════ */}
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 border-b border-white/10 pb-10">
                        <div>
                            <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-4">
                                {lang === "HI" ? "पवित्र आज्ञाएँ" : "Sacred Commandments"}
                            </p>
                            <LangText
                                lang={lang}
                                hi={
                                    <h2 className="font-devanagari text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide">
                                        आश्रम के <span className="text-[#8C4A2A]">नियम</span>
                                    </h2>
                                }
                                en={
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-[0.04em]">
                                        Rules of the <span className="text-[#8C4A2A] italic font-serif">Ashram</span>
                                    </h2>
                                }
                            />
                        </div>
                        {/* Tap hint — visible on desktop, subtle */}
                        <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase font-light hidden md:block self-end pb-1">
                            {lang === "HI" ? "↕ अनुवाद हेतु कहीं भी क्लिक करें" : "↕ Click anywhere to translate"}
                        </p>
                    </div>

                    {/* Rules list */}
                    <div>
                        {rules.map((rule, i) => (
                            <RuleRow
                                key={i}
                                index={i}
                                rule={rule}
                                lang={lang}
                                hoveredIndex={hoveredRuleIndex}
                                onHover={(idx) => setHoveredRuleIndex(idx)}
                                onLeave={() => setHoveredRuleIndex(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════
                    ACT IV — WAYFINDER & RADAR PORTAL
                ═══════════════════════════════════════════════════ */}
                <div className="w-full border-t border-white/5 bg-[#030303]">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                            {/* Left — Address & Contacts */}
                            <div className="flex flex-col gap-10">
                                <div>
                                    <p className="text-[#8C4A2A] text-[10px] tracking-[0.5em] uppercase font-light mb-6">
                                        {lang === "HI" ? "भौतिक स्थान" : "Physical Coordinates"}
                                    </p>
                                    <div className="min-h-[150px]">
                                        <LangText
                                            lang={lang}
                                            hi={
                                                <>
                                                    <p className="font-devanagari text-xl md:text-2xl lg:text-3xl text-white/90 leading-snug tracking-wide">
                                                        ग्राम अदलपुरा, पोस्ट चीचली निमरानी,<br />
                                                        तहसील कसरावद, जिला खरगोन,<br />
                                                        पश्चिम निमाड़, मध्य प्रदेश
                                                    </p>
                                                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase mt-4 font-light">पिन कोड: 451660</p>
                                                </>
                                            }
                                            en={
                                                <>
                                                    <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-snug tracking-wide font-light">
                                                        Village Adalpura, Post Chichli Nimrani,<br />
                                                        Tehsil Kasrawad, District Khargone,<br />
                                                        West Nimar, Madhya Pradesh
                                                    </p>
                                                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase mt-4 font-light">PIN Code: 451660</p>
                                                </>
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-px bg-white/5" />

                                {/* Contacts — stopPropagation on each copy button (handled inside CopyButton) */}
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 font-light">
                                            {lang === "HI" ? "दूरभाष" : "Phone"}
                                        </p>
                                        <CopyButton value="+91 9244138241">
                                            <span className="text-lg md:text-xl font-light tracking-widest">+91 9244138241</span>
                                        </CopyButton>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 font-light">
                                            {lang === "HI" ? "ईमेल" : "Email"}
                                        </p>
                                        <CopyButton value="aadhyatmikpratyakshgyan@gmail.com">
                                            <span className="text-sm md:text-base font-light tracking-wide break-all">aadhyatmikpratyakshgyan@gmail.com</span>
                                        </CopyButton>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Maps Portal Card — stopPropagation so click opens maps, not lang flip */}
                            <Link
                                href="https://maps.app.goo.gl/rzRrEjfgKgi2oiyLA"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="group relative flex flex-col items-center justify-center min-h-[320px] md:min-h-[380px] border border-white/8 bg-[#0a0a0a] hover:border-[#8C4A2A]/40 transition-all duration-700 overflow-hidden rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#8C4A2A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.03]" />
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.03]" />
                                </div>
                                {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                                    <div key={i} className={`absolute w-5 h-5 border-[#8C4A2A]/30 group-hover:border-[#8C4A2A]/70 transition-colors duration-500 ${cls}`} />
                                ))}
                                <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-[#8C4A2A]/20 border border-[#8C4A2A]/40 flex items-center justify-center group-hover:bg-[#8C4A2A]/30 transition-all duration-500">
                                            <div className="w-7 h-7 rounded-full bg-[#8C4A2A] shadow-[0_0_20px_rgba(140,74,42,0.8)] animate-pulse" />
                                        </div>
                                        <div className="absolute inset-0 rounded-full border border-[#8C4A2A]/20 animate-ping" />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[9px] tracking-[0.5em] uppercase text-[#8C4A2A] font-light">
                                            ✦ Launch Pilgrim Maps Coordinates ✦
                                        </p>
                                        <p className="text-white/60 text-xs tracking-[0.2em] uppercase font-light">
                                            {lang === "HI" ? "Google Maps में खोलें" : "Opens in Google Maps"}
                                        </p>
                                    </div>
                                    <div className="w-10 h-px bg-[#8C4A2A]/40 group-hover:w-24 transition-all duration-700" />
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}