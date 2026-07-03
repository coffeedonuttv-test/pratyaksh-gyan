"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GuruBio() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <section className="min-h-screen w-full bg-transparent flex items-center justify-center py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left Column: The Darshan — UNTOUCHED */}
                <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl p-1 shadow-[0_0_30px_rgba(140,74,42,0.4)] bg-gradient-to-b from-[#8C4A2A]/40 to-[#8C4A2A]/10 border border-[#8C4A2A]/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(140,74,42,0.6)] group">
                    <div className="absolute inset-0 rounded-2xl border border-[#8C4A2A]/30 transition-all duration-700 group-hover:border-[#8C4A2A]"></div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050505] border border-[#8C4A2A]/30">
                        <Image
                            src="/guru.jpg"
                            alt="Yogi Ravikant Ji"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Right Column: The Flip Bio — LAYOUT PRESERVED, CONTENT UPGRADED */}
                <div
                    className="relative flex flex-col w-full h-full [perspective:2000px] group"
                >
                    {/* Hover hint - Now explicitly clickable */}
                    <div 
                        className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-10 cursor-pointer"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
                        <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to Translate</span>
                    </div>

                    <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >

                        {/* ── FRONT FACE: Hindi ── */}
                        <div
                            className={`flex flex-col gap-6 bg-transparent rounded-2xl ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {/* Title - Clickable Header Bar */}
                            <div 
                                className="flex justify-between items-start md:items-center gap-4 cursor-pointer group/header pb-2"
                                onClick={() => setIsFlipped(true)}
                            >
                                <h2 className="font-devanagari text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(140,74,42,0.2)]">
                                    योगी रविकांत जी के <span className="text-[#8C4A2A]">विषय में</span>
                                </h2>
                                <button className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 group-hover/header:bg-white/10 transition-colors">
                                    <span className="text-[#8C4A2A] text-[9px] tracking-widest uppercase font-sans">Flip to English ✦</span>
                                </button>
                            </div>

                            {/* Scrollable body */}
                            <div 
                                className="overflow-y-auto max-h-[55vh] lg:max-h-[60vh] pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#8C4A2A]/30 space-y-5 overscroll-contain"
                                style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
                            >

                                {/* Para 1 */}
                                <p className="font-devanagari text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    योगी रविकांत जी एक जीवित प्रबुद्ध महापुरुष (आत्मज्ञानी गुरु) और एक क्रांतिकारी आध्यात्मिक मार्गदर्शक हैं, जो जनमानस को सत्य, निष्ठा और आंतरिक रूपांतरण से युक्त जीवन जीने के लिए प्रेरित करने हेतु पूर्णतः समर्पित हैं। वर्षों की कठिन आध्यात्मिक साधना और संपूर्ण भारत में की गई आध्यात्मिक यात्राओं के माध्यम से, उन्होंने जीवन के गूढ़ रहस्यों का गहन बोध प्राप्त किया। अब वे अपने सरल परंतु अत्यंत प्रभावशाली उपदेशों के माध्यम से लोगों को स्पष्टता, जिम्मेदारी और प्रामाणिकता के साथ जीवन जीने का मार्ग दिखाते हैं।
                                </p>

                                {/* Core Mantra Pull-Quote */}
                                <div className="relative my-2 px-6 py-5 border-l-2 border-[#8C4A2A] bg-[#8C4A2A]/8 rounded-r-sm">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8C4A2A]/10 to-transparent rounded-r-sm pointer-events-none" />
                                    <p className="relative font-devanagari text-lg md:text-xl lg:text-2xl font-semibold text-[#FF9933] leading-snug drop-shadow-[0_0_12px_rgba(255,153,51,0.4)] tracking-wide">
                                        &ldquo;ईमानदारी मुक्ति है, बेईमानी बंधन।&rdquo;
                                    </p>
                                </div>

                                {/* Para 2 */}
                                <p className="font-devanagari text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    योगी रविकांत जी के अनुसार, &lsquo;ईमानदारी&rsquo; का अर्थ केवल सत्य बोलना मात्र नहीं है; इसका अर्थ है जीवन के प्रत्येक आयाम में पूर्ण निष्ठा, सत्यता और नैतिक आचरण के साथ जीना। जब कोई व्यक्ति ईमानदारी से जीता है, तो यह स्वाभाविक रूप से उसे आंतरिक स्वतंत्रता और स्पष्टता की ओर ले जाता है। यही कारण है कि वे सिखाते हैं कि &ldquo;ईमानदारी मुक्ति है&rdquo;।
                                </p>

                                {/* Para 3 */}
                                <p className="font-devanagari text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    ईमानदारी के साथ-साथ, वे &lsquo;सत्कर्म&rsquo; (निस्वार्थ सेवा) पर विशेष बल देते हैं—जरूरतमंदों की सहायता करना, बिना किसी स्वार्थ के समाज की सेवा करना, और सच्चे मन से शुभ कर्म करना। सत्कर्म के माध्यम से व्यक्ति अपने कर्मों को शुद्ध करता है और स्वार्थ से मुक्त हो जाता है।
                                </p>

                                {/* Para 4 */}
                                <p className="font-devanagari text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    दूसरी ओर, वे सिखाते हैं कि &lsquo;बेईमानी&rsquo;—जिसमें अनैतिक आचरण, छल-कपट और स्वार्थी कर्म शामिल हैं—जीवन में भ्रम, पीड़ा और सांसारिक विकारों के प्रति आसक्ति उत्पन्न करती है। ऐसे कर्म व्यक्ति को अज्ञानता और अंधकार की गहराइयों में धकेल देते हैं, जिससे मानसिक और आध्यात्मिक बंधन का निर्माण होता है। इसलिए, वे स्पष्ट करते हैं कि &ldquo;बेईमानी बंधन है&rdquo;।
                                </p>

                            </div>

                            {/* Footer */}
                            <div className="pt-6 border-t border-white/10 mt-auto">
                                <p className="font-devanagari text-lg md:text-xl text-white/50 text-center lg:text-left">
                                    🙏 जैसी माँ की इच्छा 🙏
                                </p>
                            </div>
                        </div>

                        {/* ── BACK FACE: English ── */}
                        <div
                            className={`absolute inset-0 flex flex-col gap-6 bg-transparent rounded-2xl h-full ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                        >
                            {/* Title - Clickable Header Bar */}
                            <div 
                                className="flex justify-between items-start md:items-center gap-4 cursor-pointer group/header pb-2"
                                onClick={() => setIsFlipped(false)}
                            >
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.04em] text-white drop-shadow-[0_2px_10px_rgba(140,74,42,0.2)]">
                                    About <span className="text-[#8C4A2A] font-serif italic">Yogi Ravikant Ji</span>
                                </h2>
                                <button className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 group-hover/header:bg-white/10 transition-colors">
                                    <span className="text-[#8C4A2A] text-[9px] tracking-widest uppercase font-sans">हिंदी में पढ़ें ✦</span>
                                </button>
                            </div>

                            {/* Scrollable body */}
                            <div 
                                className="overflow-y-auto max-h-[55vh] lg:max-h-[60vh] pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#8C4A2A]/30 space-y-5 overscroll-contain"
                                style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
                            >

                                {/* Para 1 */}
                                <p className="text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    Yogi Ravikant Ji is a living enlightened master and a revolutionary spiritual leader dedicated to guiding people toward a life rooted in truth, integrity, and inner transformation. Through years of intense spiritual discipline and spiritual wandering across India, he gained a profound understanding of life and now shares simple yet powerful teachings that help people live with clarity, responsibility, and authenticity.
                                </p>

                                {/* Core Mantra Pull-Quote */}
                                <div className="relative my-2 px-6 py-5 border-l-2 border-[#8C4A2A] bg-[#8C4A2A]/8 rounded-r-sm">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8C4A2A]/10 to-transparent rounded-r-sm pointer-events-none" />
                                    <p className="relative font-serif text-lg md:text-xl lg:text-2xl font-semibold italic text-[#FF9933] leading-snug drop-shadow-[0_0_12px_rgba(255,153,51,0.4)]">
                                        &ldquo;Honesty is liberation; dishonesty is bondage.&rdquo;
                                    </p>
                                </div>

                                {/* Para 2 */}
                                <p className="text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    According to Yogi Ravikant Ji, honesty is not limited to speaking the truth; it means living with complete integrity, truthfulness, and ethical conduct in every aspect of life. When a person lives honestly—with pure intention, ethical behavior, and responsibility toward others—it naturally leads them toward inner freedom and clarity. This is why he teaches that honesty leads to liberation.
                                </p>

                                {/* Para 3 */}
                                <p className="text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    Along with honesty, he emphasizes selfless service (satsang)—helping those in need, serving society without selfish motives, and performing good deeds with sincerity. Through good actions, a person purifies their actions and develops compassion and responsibility toward others, helping them grow spiritually and become free from selfishness.
                                </p>

                                {/* Para 4 */}
                                <p className="text-sm md:text-base text-white/75 leading-relaxed font-light tracking-wide">
                                    On the other hand, Yogi Ravikant Ji teaches that dishonesty—which includes unethical living, deception, selfish actions, and wrongdoing—creates confusion, suffering, and attachment to worldly problems. Such actions lead a person deeper into ignorance and darkness, creating mental and spiritual bondage. Therefore, he explains that dishonesty leads to bondage.
                                </p>

                            </div>

                            {/* Footer */}
                            <div className="pt-6 border-t border-white/10 mt-auto">
                                <p className="text-lg md:text-xl text-white/50 text-center lg:text-left font-serif italic">
                                    🙏 As the Divine Mother Wills 🙏
                                </p>
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
