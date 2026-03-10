"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GuruBio() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <section className="min-h-screen w-full bg-gradient-to-b from-[#050505] to-[#110a08] flex items-center justify-center py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left Column: The Darshan */}
                <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl p-1 shadow-[0_0_30px_rgba(140,74,42,0.4)] bg-gradient-to-b from-[#8C4A2A]/40 to-[#8C4A2A]/10 border border-[#8C4A2A]/50 transition-all duration-700 hover:shadow-[0_0_40px_rgba(140,74,42,0.6)] group">
                    <div className="absolute inset-0 rounded-2xl border border-[#8C4A2A]/30 transition-all duration-700 group-hover:border-[#8C4A2A]"></div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050505] border border-[#8C4A2A]/30">
                        <Image
                            src="/guru.jpg"
                            alt="Yogi Ravi Pandit Sharma"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Right Column: The Truth */}
                <div
                    className="relative flex flex-col w-full h-full cursor-pointer [perspective:2000px] group"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front Face (Hindi - Original) */}
                        <div
                            className="flex flex-col gap-10 bg-transparent rounded-2xl"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {/* Primary Quote */}
                            <h2 className="font-devanagari text-3xl md:text-4xl lg:text-5xl leading-tight text-[#8C4A2A] drop-shadow-[0_2px_10px_rgba(140,74,42,0.2)]">
                                "मानव सेवा करना सबसे बड़ा धर्म है । जिस मानव में मानवता हो उसकी सेवा ।।"
                            </h2>

                            {/* The Bio */}
                            <div className="space-y-6">
                                <p className="font-devanagari text-lg md:text-xl text-white/80 leading-relaxed font-light tracking-wide">
                                    "मैं योगी रवि पंडित शर्मा, सत्य की खोज मे , चेतना के रथ पर सवार , आध्यात्मिक जगत की खाक छान रहा हुँ । अब तक अपना जिवन इसी मार्ग पर खपाया है तथा मेरा संकल्प है की मैं , मानवता के कल्याण के लिए ' सत्य ' तक पहुँचकर हि विश्राम करूंगा । मेरे हृदय मैं ,मानव मात्र के लिए असीम करुणा है और मैं मानव कल्याण के ही पथ का पथिक हूँ । मेरी आकांक्षा हैं की जहा तक मेरी दृष्टि जाय कोई मनुष्य दुः खी ना हो । हर व्यक्ति सुखी हो , स्वस्थ एवं निरोग हो , इसी उद्देश हेतु हमने अपना जीवन समर्पित किया है । विवरण न देते हुए इतना ही कथन है अब तक , #माँ की कृपा से लाखो लोग दुःखो से मुक्ति पा चुके हैं । अन्ततः मेरा प्रयास तथा मेरी शक्ति समस्त मानव समाज के लिए हो , इसी आकांक्षा के साथ मै प्रस्तुत हूँ -"
                                </p>
                            </div>

                            {/* The Surrender */}
                            <div className="pt-8 border-t border-white/10 mt-auto">
                                <p className="font-devanagari text-xl md:text-2xl text-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-center lg:text-left">
                                    🙏 जैसी माँ की इच्छा 🙏
                                </p>
                            </div>
                        </div>

                        {/* Back Face (English - Authentic Translation) */}
                        <div
                            className="absolute inset-0 flex flex-col gap-10 bg-transparent rounded-2xl"
                            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                        >
                            {/* Primary Quote */}
                            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-[#8C4A2A] drop-shadow-[0_2px_10px_rgba(140,74,42,0.2)] font-serif italic">
                                "Serving humanity is the highest Dharma. To serve the human who embodies humanity."
                            </h2>

                            {/* The Bio */}
                            <div className="space-y-6">
                                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed font-light tracking-wide">
                                    "I, Yogi Ravi Pandit Sharma, in the quest for truth, riding the chariot of consciousness, am relentlessly traversing the spiritual realm. I have spent my life on this path thus far, and it is my firm resolve that, for the welfare of humanity, I shall rest only upon attaining the 'Truth'. In my heart, there is boundless compassion for all mankind, and I am a traveler exclusively on the path of human welfare. It is my deepest aspiration that as far as my vision reaches, no human being should be in sorrow. May every individual be happy, healthy, and free from disease; for this very purpose, I have dedicated my life. Without giving further details, this is all to be said for now: by the grace of the Divine #Mother, millions of people have been liberated from their suffering. Ultimately, may my efforts and my energy be devoted entirely to the whole of human society. With this aspiration, I present myself."
                                </p>
                            </div>

                            {/* The Surrender */}
                            <div className="pt-8 border-t border-white/10 mt-auto">
                                <p className="text-lg md:text-xl text-white/60 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-center lg:text-left font-serif italic">
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
