"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

class AudioEngine {
  ctx: AudioContext | null = null;
  droneOsc: OscillatorNode | null = null;
  droneGain: GainNode | null = null;
  isPlaying = false;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Setup Drone
    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = "sine";
    this.droneOsc.frequency.value = 45; // Deep sub-bass

    const subOsc = this.ctx.createOscillator();
    subOsc.type = "triangle";
    subOsc.frequency.value = 45.5; // Slight detune for beating effect

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 120;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0; // Start silenced

    this.droneOsc.connect(filter);
    subOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc.start();
    subOsc.start();
  }

  toggleDrone(play: boolean) {
    if (!this.ctx || !this.droneGain) return;
    if (play) {
        if (this.ctx.state === "suspended") this.ctx.resume();
        this.droneGain.gain.setTargetAtTime(0.3, this.ctx.currentTime, 2); // Slow 2s fade in
        this.isPlaying = true;
    } else {
        this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 1); // 1s fade out
        this.isPlaying = false;
    }
  }

  playThud() {
    if (!this.ctx || !this.isPlaying) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sine";
    
    // Pitch envelope (drop rapidly)
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
    
    // Amp envelope (decay rapidly)
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

// Global instance
export const engine = typeof window !== 'undefined' ? new AudioEngine() : null;

export default function AudioAtmosphere() {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (engine && isOn) {
        engine.init();
        engine.toggleDrone(true);
    } else if (engine && !isOn) {
        engine.toggleDrone(false);
    }
  }, [isOn]);

  // Hook global click listeners for the Thud effect
  useEffect(() => {
     const handleInteraction = (e: MouseEvent) => {
         const target = e.target as HTMLElement;
         // Only play thud on clickable elements or anchors
         if (target.closest('a') || target.closest('button')) {
             engine?.playThud();
         }
     };

     document.addEventListener('mousedown', handleInteraction);
     return () => document.removeEventListener('mousedown', handleInteraction);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mix-blend-difference">
        <button 
           onClick={() => setIsOn(!isOn)}
           className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
            <div className="flex gap-0.5 items-end h-3">
                <motion.div animate={{ height: isOn ? [4, 12, 4] : 4 }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-current" />
                <motion.div animate={{ height: isOn ? [4, 8, 4] : 4 }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-0.5 bg-current" />
                <motion.div animate={{ height: isOn ? [4, 10, 4] : 4 }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.4 }} className="w-0.5 bg-current" />
            </div>
            <span>SOUND: {isOn ? "ON" : "OFF"}</span>
        </button>
    </div>
  );
}
