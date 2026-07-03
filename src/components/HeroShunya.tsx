"use client";

import { useEffect, useRef, useState } from "react";
import { useTextMorph } from "@/hooks/useTextMorph";

export default function HeroShunya() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // 0 = Hindi, 1 = English
  const [langState, setLangState] = useState(0);

  const quoteMain = useTextMorph(
    langState === 0 ? "ईमानदारी मुक्ति है, बेईमानी बंधन।" : "Honesty is liberation, dishonesty is bondage.", 
    langState, 
    1200
  );

  // --------------------------------------------------------
  // THE SPIRIT: ETHEREAL BREATHING LOTUS
  // --------------------------------------------------------
  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const drawPetal = (
      x: number,
      y: number,
      angle: number,
      length: number,
      width: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(width, length / 2, 0, length);
      ctx.quadraticCurveTo(-width, length / 2, 0, 0);

      ctx.strokeStyle = `rgba(255, 240, 230, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = `rgba(140, 74, 42, ${opacity * 0.15})`;
      ctx.fill();

      ctx.restore();
    };

    const animateLotus = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Centered placement
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height * 0.40;

      time += 0.005;
      const breathe = Math.sin(time) * 20;

      // Layer 1: Outer Petals
      const outerPetals = 16;
      for (let i = 0; i < outerPetals; i++) {
        const angle = (i / outerPetals) * Math.PI * 2 + (time * 0.1);
        drawPetal(centerX, centerY, angle, 350 + breathe, 120 + (breathe * 0.5), 0.12);
      }

      // Layer 2: Middle Petals
      const midPetals = 12;
      for (let i = 0; i < midPetals; i++) {
        const angle = (i / midPetals) * Math.PI * 2 - (time * 0.15);
        drawPetal(centerX, centerY, angle, 250 + (breathe * 0.8), 80, 0.25);
      }

      // Layer 3: Inner Core Petals
      const innerPetals = 8;
      for (let i = 0; i < innerPetals; i++) {
        const angle = (i / innerPetals) * Math.PI * 2 + (time * 0.2);
        drawPetal(centerX, centerY, angle, 150 + (breathe * 0.5), 50, 0.5);
      }

      // Core Saffron Glow
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 400);
      grad.addColorStop(0, "rgba(140, 74, 42, 0.18)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      animationFrameId = requestAnimationFrame(animateLotus);
    };

    animateLotus();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <section id="hero-shunya" className="h-screen w-full relative overflow-hidden flex flex-col bg-transparent">

      {/* LAYER 1: The Breathing Lotus Canvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60"
      />

      {/* LAYER 2: The Master Quote (Centered) */}
      <div 
         className="absolute bottom-20 left-0 w-full z-10 flex flex-col items-center justify-center pointer-events-auto cursor-pointer group px-4 text-center"
         onClick={() => setLangState(prev => prev === 0 ? 1 : 0)}
      >
        <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-1.5 h-1.5 rounded-full bg-[#8C4A2A] animate-pulse"></div>
             <span className="text-[#8C4A2A] text-[9px] tracking-[0.4em] uppercase font-light">Click to translate</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-white/95 leading-relaxed drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] flex flex-wrap justify-center font-devanagari">
          {quoteMain === "ईमानदारी मुक्ति है, बेईमानी बंधन।" ? (
              <>ईमानदारी मुक्ति है<span className="font-sans text-white/60 mx-1">,</span> बेईमानी बंधन<span className="font-sans text-white/60 ml-1">।</span></>
          ) : (
              <span className="font-sans font-light tracking-[0.2em]">{quoteMain}</span>
          )}
        </h1>
      </div>

      {/* LAYER 3: Scroll Indicator (Anchored to the very edge of the screen) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <p className="text-white/30 text-[8px] tracking-[0.5em] font-light uppercase mb-3">Descend</p>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
      </div>

    </section>
  );
}
