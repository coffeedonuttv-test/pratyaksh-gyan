"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SUBMISSION PHASE STATE ───────────────────────────────────────────────────
// idle → collapsing → bindu → rippling → monolith
type Phase = "idle" | "collapsing" | "bindu" | "rippling" | "monolith";

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
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={className}
            >
                {lang === "HI" ? hi : en}
            </motion.div>
        </AnimatePresence>
    );
}

// ─── FLOATING AMBIENT CUE ─────────────────────────────────────────────────────

function AmbientCue({ lang, hidden }: { lang: "HI" | "EN"; hidden?: boolean }) {
    return (
        <motion.div
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={lang}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-[#070606]/80 border border-white/8 backdrop-blur-md"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shrink-0" />
                    <p className={`text-[#A6A298] text-[9px] tracking-[0.35em] uppercase font-light ${lang === "HI" ? "font-devanagari" : ""}`}>
                        {lang === "HI"
                            ? "अनुवाद हेतु स्क्रीन पर कहीं भी टैप करें"
                            : "Tap anywhere on screen to translate"}
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shrink-0" />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

// ─── BINDU RIPPLE STAGE ───────────────────────────────────────────────────────

function BinduRipple({ phase }: { phase: Phase }) {
    if (phase !== "bindu" && phase !== "rippling" && phase !== "monolith") return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none">
            {/* The Bindu — glowing origin point */}
            <AnimatePresence>
                {(phase === "bindu" || phase === "rippling") && (
                    <motion.div
                        key="bindu-dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute w-3 h-3 rounded-full bg-[#8C4A2A] shadow-[0_0_20px_#FF9933,0_0_60px_rgba(255,153,51,0.4)]"
                    />
                )}
            </AnimatePresence>

            {/* The Ripple — razor-thin expanding ring */}
            <AnimatePresence>
                {phase === "rippling" && (
                    <motion.div
                        key="ripple"
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 25 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-3 h-3 rounded-full border border-[#FF9933]/60"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── CONFIRMATION MONOLITH ────────────────────────────────────────────────────

function ConfirmationMonolith({ lang, whatsappUrl }: { lang: "HI" | "EN"; whatsappUrl: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-10 py-24 text-center min-h-[60vh]"
        >
            {/* Saffron bindu icon with rings */}
            <div className="relative flex items-center justify-center w-20 h-20">
                <div className="absolute w-20 h-20 rounded-full border border-[#8C4A2A]/15 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute w-14 h-14 rounded-full border border-[#8C4A2A]/25" />
                <div className="w-8 h-8 rounded-full border border-[#8C4A2A]/50 flex items-center justify-center bg-[#8C4A2A]/10 shadow-[0_0_30px_rgba(140,74,42,0.4)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8C4A2A] shadow-[0_0_12px_#FF9933]" />
                </div>
            </div>

            {/* Saffron rule */}
            <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#8C4A2A]/40 to-transparent" />

            {/* Message */}
            <LangText
                lang={lang}
                hi={
                    <div className="space-y-5 max-w-2xl flex flex-col items-center">
                        <p className="font-devanagari text-xl md:text-2xl lg:text-3xl text-[#F4F2EB] font-light leading-relaxed">
                            ✦ आपकी जिज्ञासा गुरु चरणों में समर्पित हो रही है...
                        </p>
                        <p className="font-devanagari text-sm md:text-base text-[#A6A298] font-light tracking-wide leading-relaxed">
                            WhatsApp चैट खुल रहा है।
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex px-8 py-3 rounded-full border border-[#8C4A2A]/50 bg-[#8C4A2A]/10 text-[#F4F2EB] font-devanagari text-sm hover:bg-[#8C4A2A]/20 transition-colors shadow-[0_0_15px_rgba(140,74,42,0.3)]"
                        >
                            ✦ यदि WhatsApp स्वतः न खुले, तो यहाँ क्लिक करें →
                        </a>
                    </div>
                }
                en={
                    <div className="space-y-5 max-w-2xl flex flex-col items-center">
                        <p className="text-xl md:text-2xl lg:text-3xl text-[#F4F2EB] font-light tracking-[0.02em] leading-relaxed">
                            ✦ Your inquiry is reaching the sanctuary...
                        </p>
                        <p className="text-sm md:text-base text-[#A6A298] font-light tracking-widest uppercase leading-relaxed">
                            Opening WhatsApp chat.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex px-8 py-3 rounded-full border border-[#8C4A2A]/50 bg-[#8C4A2A]/10 text-[#F4F2EB] text-xs uppercase tracking-widest hover:bg-[#8C4A2A]/20 transition-colors shadow-[0_0_15px_rgba(140,74,42,0.3)]"
                        >
                            ✦ If WhatsApp does not open automatically, click here →
                        </a>
                    </div>
                }
            />

            {/* Footer ornament */}
            <div className="flex items-center gap-5 mt-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#8C4A2A]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A]/50 shadow-[0_0_6px_rgba(140,74,42,0.6)]" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#8C4A2A]/30" />
            </div>

            {/* Privacy footnote */}
            <p className="text-[#A6A298]/30 text-[9px] tracking-[0.4em] uppercase font-light">
                ✦ Aadhyatmik Pratyaksh Gyan Satsang — Apno Ki Kutiya ✦
            </p>
        </motion.div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function JigyasaSection() {
    const [lang, setLang] = useState<"HI" | "EN">("HI");
    const [isFocused, setIsFocused] = useState(false);
    const [phase, setPhase] = useState<Phase>("idle");
    const [whatsappUrl, setWhatsappUrl] = useState<string>("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        question: "",
    });

    const toggleLang = () => {
        // Never toggle lang during submission ceremony
        if (phase !== "idle") return;
        setLang((prev) => (prev === "HI" ? "EN" : "HI"));
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const stopAndSet = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.stopPropagation();
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ── BINDU RIPPLE SUBMISSION SEQUENCE (WHATSAPP REDIRECT) ─────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (form.name.trim().length < 2 || form.question.trim().length < 10) {
            return; // Basic validation bypass guard
        }

        // Construct WhatsApp URL
        const message = `✦ JIGYASA / जिज्ञासा — साधक का प्रश्न ✦\n\n*Name / नाम:* ${form.name}\n*Email / ईमेल:* ${form.email}\n\n*Inquiry / जिज्ञासा:*\n${form.question}`;
        const url = `https://wa.me/919244138241?text=${encodeURIComponent(message)}`;
        setWhatsappUrl(url);

        // Phase 1: Inward Collapse (0–600ms)
        setPhase("collapsing");
        await delay(600);

        // Phase 2a: Bindu appears (600–1000ms)
        setPhase("bindu");
        await delay(400);

        // Phase 2b: Ripple expands (1000–1800ms)
        setPhase("rippling");
        await delay(800);

        // Phase 3: Monolith Illumination & Redirect (1800ms+)
        setPhase("monolith");

        // Use direct window location to redirect (this handles mobile browser blocks in most cases)
        // Set a small timeout to allow monolith to appear
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    };

    const isSubmitting = phase === "collapsing" || phase === "bindu" || phase === "rippling";
    const isMonolith = phase === "monolith";

    return (
        <>
            {/* Bindu Ripple — fixed overlay, renders during ceremony */}
            <BinduRipple phase={phase} />

            <AmbientCue lang={lang} hidden={isMonolith} />

            {/* ── TAP-ANYWHERE CANVAS ── */}
            <section
                className="w-full min-h-screen flex flex-col items-center relative z-20 cursor-default bg-[#070606]"
                onClick={toggleLang}
            >
                <div className="w-full max-w-[860px] mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-24">

                    {/* ═══════════════════════════════════════════════════
                        HEADER — Dims on Focus Tunnel
                    ═══════════════════════════════════════════════════ */}
                    <motion.div
                        animate={{ opacity: isFocused ? 0.15 : 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-20 text-center"
                    >
                        {/* Ornament */}
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#8C4A2A]/40" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shadow-[0_0_8px_rgba(140,74,42,0.8)]" />
                            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#8C4A2A]/40" />
                        </div>

                        <LangText
                            lang={lang}
                            hi={
                                <div className="space-y-6">
                                    <p className="text-[#8C4A2A] text-[10px] tracking-[0.55em] uppercase font-light font-devanagari">
                                        मुमुक्षु का मार्ग
                                    </p>
                                    <h1 className="font-devanagari text-5xl md:text-6xl lg:text-7xl text-[#F4F2EB] font-light leading-tight drop-shadow-[0_0_40px_rgba(244,242,235,0.04)]">
                                        जिज्ञासा —{" "}
                                        <span className="text-[#8C4A2A]">मुमुक्षु का प्रश्न</span>
                                    </h1>
                                    <p className="font-devanagari text-base md:text-lg text-[#A6A298] font-light leading-loose max-w-2xl mx-auto">
                                        केवल वास्तविक साधना एवं आत्म-ज्ञान के मार्ग में उठने वाले गंभीर प्रश्नों हेतु।
                                    </p>
                                </div>
                            }
                            en={
                                <div className="space-y-6">
                                    <p className="text-[#8C4A2A] text-[10px] tracking-[0.55em] uppercase font-light">
                                        The Seeker&apos;s Path
                                    </p>
                                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#F4F2EB] font-light tracking-[0.03em] leading-tight drop-shadow-[0_0_40px_rgba(244,242,235,0.04)]">
                                        Jigyasa —{" "}
                                        <span className="text-[#8C4A2A] italic font-serif">The Sincere Thirst</span>
                                    </h1>
                                    <p className="text-base md:text-lg text-[#A6A298] font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
                                        Dedicated strictly to existential doubts and obstacles encountered on the path of liberation.
                                    </p>
                                </div>
                            }
                        />

                        {/* Vertical thread */}
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#8C4A2A]/30 to-transparent mx-auto mt-12" />
                    </motion.div>

                    {/* ═══════════════════════════════════════════════════
                        FORM ALTAR / MONOLITH — AnimatePresence
                    ═══════════════════════════════════════════════════ */}
                    <AnimatePresence mode="wait">
                        {!isMonolith ? (
                            // ── PHASE 1: FORM (idle → collapsing) ────────────────
                            <motion.form
                                key="form-altar"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: isSubmitting ? 0 : 1,
                                    filter: isSubmitting ? "blur(4px)" : "blur(0px)",
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    opacity: { duration: 0.5, ease: "easeOut" },
                                    y: { duration: 0.5, ease: "easeOut" },
                                    scale: {
                                        duration: 0.6,
                                        ease: [0.43, 0.13, 0.23, 0.96],
                                    },
                                    filter: { duration: 0.5 },
                                }}
                                onSubmit={handleSubmit}
                                onClick={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="flex flex-col gap-14"
                            >
                                {/* Field 1: Name */}
                                <div className="relative group/field">
                                    <label
                                        className={`block text-[9px] tracking-[0.5em] uppercase font-light mb-4 transition-colors duration-500 ${isFocused ? "text-[#8C4A2A]" : "text-[#A6A298]/50"}`}
                                    >
                                        {lang === "HI" ? "साधक का नाम" : "Seeker's Name"}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        autoComplete="off"
                                        value={form.name}
                                        onChange={stopAndSet}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onClick={(e) => e.stopPropagation()}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        placeholder={lang === "HI" ? "साधक का नाम..." : "Seeker's Name..."}
                                        className={`w-full bg-transparent border-b border-white/15 pb-4 pt-1 text-[#F4F2EB] placeholder-[#A6A298]/25 focus:border-[#8C4A2A] focus:outline-none transition-colors duration-500 font-light text-lg tracking-wide ${lang === "HI" ? "font-devanagari" : ""}`}
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-[#8C4A2A] group-focus-within/field:w-full transition-all duration-700 ease-out" />
                                </div>

                                {/* Field 2: Email */}
                                <div className="relative group/field">
                                    <label
                                        className={`block text-[9px] tracking-[0.5em] uppercase font-light mb-4 transition-colors duration-500 ${isFocused ? "text-[#8C4A2A]" : "text-[#A6A298]/50"}`}
                                    >
                                        {lang === "HI" ? "ईमेल पता" : "Email Address"}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={stopAndSet}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onClick={(e) => e.stopPropagation()}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        placeholder={
                                            lang === "HI"
                                                ? "ईमेल पता..."
                                                : "Email Address..."
                                        }
                                        className="w-full bg-transparent border-b border-white/15 pb-4 pt-1 text-[#F4F2EB] placeholder-[#A6A298]/25 focus:border-[#8C4A2A] focus:outline-none transition-colors duration-500 font-light text-lg tracking-wide font-mono"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-[#8C4A2A] group-focus-within/field:w-full transition-all duration-700 ease-out" />
                                </div>

                                {/* Field 3: Question Textarea */}
                                <div className="relative group/field">
                                    <label
                                        className={`block text-[9px] tracking-[0.5em] uppercase font-light mb-4 transition-colors duration-500 ${isFocused ? "text-[#8C4A2A]" : "text-[#A6A298]/50"}`}
                                    >
                                        {lang === "HI" ? "साधना की उलझन" : "Your Existential Doubt"}
                                    </label>
                                    <textarea
                                        name="question"
                                        required
                                        rows={7}
                                        value={form.question}
                                        onChange={stopAndSet}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onClick={(e) => e.stopPropagation()}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        placeholder={
                                            lang === "HI"
                                                ? "अपनी साधना की वास्तविक उलझन या बाधा यहाँ स्पष्ट लिखें..."
                                                : "Pour out your existential doubt or obstacle in meditation..."
                                        }
                                        className={`w-full bg-transparent border-b border-white/15 pb-4 pt-1 text-[#F4F2EB] placeholder-[#A6A298]/25 focus:border-[#8C4A2A] focus:outline-none transition-colors duration-500 font-light text-base leading-loose resize-none tracking-wide ${lang === "HI" ? "font-devanagari" : ""}`}
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-[#8C4A2A] group-focus-within/field:w-full transition-all duration-700 ease-out" />
                                </div>

                                {/* Ornament rule */}
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/5" />
                                    <div className="w-1 h-1 rounded-full bg-[#8C4A2A]/40" />
                                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/5" />
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col items-center gap-5">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={(e) => e.stopPropagation()}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        className="group relative flex items-center gap-5 px-12 py-5 border border-[#8C4A2A]/40 bg-transparent hover:bg-[#8C4A2A]/12 hover:border-[#8C4A2A]/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-700 overflow-hidden"
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#8C4A2A]/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shadow-[0_0_8px_rgba(140,74,42,0.8)] shrink-0" />

                                        <span className={`text-[#F4F2EB] text-[11px] tracking-[0.35em] sm:tracking-[0.45em] uppercase font-light ${lang === "HI" ? "font-devanagari" : ""}`}>
                                            {lang === "HI"
                                                ? "✦ जिज्ञासा समर्पित करें (WhatsApp पर संवाद) →"
                                                : "✦ Offer Inquiry via WhatsApp →"}
                                        </span>

                                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse shadow-[0_0_8px_rgba(140,74,42,0.8)] shrink-0" />
                                    </button>

                                    <p className={`text-[#A6A298]/30 text-[9px] tracking-[0.4em] uppercase font-light ${lang === "HI" ? "font-devanagari" : ""}`}>
                                        {lang === "HI"
                                            ? "आपकी जिज्ञासा पूर्णतः गोपनीय है"
                                            : "Your inquiry is completely confidential"}
                                    </p>
                                </div>
                            </motion.form>
                        ) : (
                            // ── PHASE 3: MONOLITH ILLUMINATION ───────────────────
                            <motion.div key="monolith" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <ConfirmationMonolith lang={lang} whatsappUrl={whatsappUrl} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </section>
        </>
    );
}

// ─── UTILITY ──────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
