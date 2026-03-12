"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Also trigger a reset or scroll when anchor tags are used
    useEffect(() => {
        if (lenisRef.current) {
            const hash = window.location.hash;
            if (hash) {
                 const target = document.querySelector(hash);
                 if (target) {
                     lenisRef.current.scrollTo(target as HTMLElement, { offset: -100 });
                 }
            } else {
                 // Reset scroll on pathname change if no hash
                 lenisRef.current.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname]);

    return <>{children}</>;
}
