"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const hindiContent = {
  title: "मात नर्मदे हर / कुटिया में ठहरने वाले जिज्ञासु के लिए आवश्यक नियम",
  rules: [
    "जिज्ञासु जब तक कुटिया में साधना करेगा तब तक फोन को बंद रखेगा।",
    "जिज्ञासु केवल आध्यात्मिक प्रश्नों के साथ ही अपनी कुटिया में रह सकता है।",
    "जिज्ञासु का दूसरे किसी से भी बातचीत या मुस्कुराना भी सख्त मना है। (नोट: अति आवश्यक होने पर प्रबंधक से ही अपनी बात रख सकते हैं।)",
    "जिज्ञासु नित्यकर्मों के बाद आसन लेकर बरगद के नीचे आत्म-चिंतन के लिये बैठेगा।",
    "जिज्ञासु केवल नाश्ते और भोजन के वक्त ही हॉल में जा सकता है।",
    "जिज्ञासु अपने साथ किसी भी तरह का बाहरी खाद्य पदार्थ नहीं ला सकता।",
    "जिज्ञासु अपने प्रयोग में लाई गई चटाई, आसन, कम्बल कुटिया छोड़ने से पहले धोकर जाना होगा।",
    "जिज्ञासु बिना आज्ञा के नर्मदा तट पर नहीं जा सकता।",
    "जिज्ञासु को कुटिया के क्षेत्र में ही रहना होगा। अपना पर्स, फोन कोई भी कीमती सामान आदि अपने लॉकर में रखें, चाबी स्वयं की जिम्मेदारी है।",
    "जिज्ञासु कोई भी बाहरी माला, जप-शास्त्र, अध्ययन डायरी इत्यादि ना करके केवल आत्म-चिंतन ही करें।",
    "योगी जी के चरण-स्पर्श करना या बात-चीत करना सख्त मना है। (नोट: सत्संग के समय ही आप अपने आध्यात्मिक प्रश्न पूछ सकते हैं।)"
  ]
};

const englishContent = {
  title: "Maat Narmade Har / Essential Rules for Seekers in the Kutiya",
  rules: [
    "The seeker must keep their phone turned off for the entire duration of their sadhana.",
    "The seeker must stay in the Kutiya solely with their spiritual questions.",
    "Talking to or even smiling at others is strictly prohibited. (Note: In absolute emergencies, communicate only with the manager.)",
    "After daily ablutions, the seeker must take their asana (mat) and sit under the banyan tree for self-reflection.",
    "The seeker is permitted in the dining hall only during breakfast and meal times.",
    "The seeker is strictly forbidden from bringing any outside food.",
    "Before departing, the seeker must wash the mat, asana, and blanket they used.",
    "The seeker cannot visit the banks of Mother Narmada without explicit permission.",
    "The seeker must remain strictly within the Kutiya premises. Keep all valuables (wallet, phone) in the locker; the key is your sole responsibility.",
    "The seeker must abstain from using external malas (rosaries), scriptures, or study diaries, focusing purely on deep self-reflection.",
    "Touching Yogi Ji’s feet or attempting to converse with him is strictly prohibited. (Note: You may ask your spiritual questions only during Satsang.)"
  ]
};

export default function KutiyaRulesSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Entrance Animation Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(springScroll, [0, 1], [100, 0]);
  const opacity = useTransform(springScroll, [0, 1], [0, 1]);

  // Magnetic Glow Effect Setup
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cssStyles = `
    .preserve-3d {
      transform-style: preserve-3d;
      perspective: 1000px;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .glassmorphic-card {
      background: rgba(15, 15, 15, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .text-glow {
      text-shadow: 0 0 20px rgba(255, 191, 0, 0.3);
    }
    .rule-item {
      position: relative;
      padding-left: 1.5rem;
    }
    .rule-item::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #FFBF00;
      opacity: 0.8;
    }
    
    /* Scrollbar styling for inner list */
    .rules-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .rules-scroll::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.02);
      border-radius: 10px;
    }
    .rules-scroll::-webkit-scrollbar-thumb {
      background: rgba(255, 191, 0, 0.2);
      border-radius: 10px;
    }
    .rules-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 191, 0, 0.4);
    }
  `;

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-[100vh] bg-[#050505] flex items-center justify-center relative overflow-hidden py-24 px-4 sm:px-8"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* Magnetic Soft Golden Glow */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen z-0"
            style={{
              background: 'radial-gradient(circle, rgba(255,191,0,0.15) 0%, rgba(255,69,0,0.05) 50%, rgba(0,0,0,0) 70%)',
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Background static ambient glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[80vw] h-[80vh] rounded-full bg-gradient-to-r from-orange-900/10 to-amber-600/10 blur-[120px]" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-4xl preserve-3d"
      >
        {/* 3D Flip Container */}
        <div 
          className="relative w-full cursor-pointer preserve-3d group"
          onClick={handleFlip}
        >
          {/* Hover Hint */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 z-20 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
              <span className="text-[#8C4A2A] text-[10px] sm:text-xs tracking-[0.4em] uppercase font-light">Click to Translate</span>
          </div>

          {/* Spring physics wrapper for the flip */}
          <motion.div
            className="w-full relative preserve-3d transition-transform duration-75 grid"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            
            {/* Front Side (Hindi) */}
            <div className="[grid-area:1/1] backface-hidden glassmorphic-card rounded-[2rem] p-6 sm:p-12 flex flex-col group-hover:border-amber-500/20 transition-colors duration-500">
              <h2 className="text-2xl sm:text-3xl font-serif text-amber-50 text-center mb-8 pb-6 border-b border-white/10 text-glow leading-snug">
                {hindiContent.title}
              </h2>
              
              <div>
                <ul className="space-y-5 text-zinc-300 font-sans sm:text-lg rendering-intent-p">
                  {hindiContent.rules.map((rule, idx) => (
                    <li key={idx} className="rule-item leading-relaxed tracking-wide">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Back Side (English) */}
            <div className="[grid-area:1/1] backface-hidden rotate-y-180 glassmorphic-card rounded-[2rem] p-6 sm:p-12 flex flex-col group-hover:border-amber-500/20 transition-colors duration-500">
              <h2 className="text-2xl sm:text-3xl font-serif text-amber-50 text-center mb-8 pb-6 border-b border-white/10 text-glow leading-snug">
                {englishContent.title}
              </h2>
              
              <div>
                <ul className="space-y-5 text-zinc-300 font-sans sm:text-lg rendering-intent-p">
                  {englishContent.rules.map((rule, idx) => (
                    <li key={idx} className="rule-item leading-relaxed tracking-wide">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
