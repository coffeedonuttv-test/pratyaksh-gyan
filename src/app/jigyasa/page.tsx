import type { Metadata } from "next";
import JigyasaSection from "@/components/JigyasaSection";

export const metadata: Metadata = {
    title: "Jigyasa — The Seeker's Inquiry | Pratyaksh Gyan",
    description:
        "Lay your burning spiritual questions or meditation obstacles at Yogi Ravikant Ji's feet. Submit your inquiry to the sanctuary.",
};

export default function JigyasaPage() {
    return <JigyasaSection />;
}
