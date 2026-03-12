"use client";

import { useState, useEffect } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZअइउएओकखगघचछजझटठडढतथदधनपफबभमयरलवशषसह!@#$%^&*()_+{}[]|:;<>,./?";

export function useTextMorph(targetText: string, triggerId: number, duration: number = 800) {
    const [displayText, setDisplayText] = useState(targetText);

    useEffect(() => {
        // Initial setup
        if (triggerId === 0) {
            setDisplayText(targetText);
            return;
        }

        let start: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            const ratio = Math.min(progress / duration, 1);
            
            let currentText = "";
            for (let i = 0; i < targetText.length; i++) {
                // If this character position has "settled" based on the ratio
                if (ratio >= (i / targetText.length) * 0.8 + 0.2) {
                    currentText += targetText[i];
                } else {
                    if (targetText[i] === " " || targetText[i] === "\n") {
                        currentText += targetText[i];
                    } else {
                        currentText += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            }
            
            setDisplayText(currentText);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayText(targetText);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [targetText, triggerId, duration]);

    return displayText;
}
