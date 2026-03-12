import KutiyaSection from "@/components/KutiyaSection";
import KutiyaRulesSection from "@/components/KutiyaRulesSection";

export default function KutiyaPage() {
    return (
        <main className="w-full min-h-screen pt-32 relative z-10 flex flex-col items-center">
            <KutiyaSection />
            <KutiyaRulesSection />
        </main>
    );
}
