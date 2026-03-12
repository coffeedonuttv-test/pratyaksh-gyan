import HeroShunya from "@/components/HeroShunya";
import GuruBio from "@/components/GuruBio";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-transparent relative z-10 w-full overflow-hidden">
      <HeroShunya />
      
      <div className="w-full py-20 flex justify-center mt-32">
        <GuruBio />
      </div>
    </main>
  );
}
