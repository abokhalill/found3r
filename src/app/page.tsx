import { Nav } from "@/components/landing/Nav";
import { Hero3D } from "@/components/landing/Hero3D";
import { Pipeline } from "@/components/landing/Pipeline";
import { StackedFeatures } from "@/components/landing/StackedFeatures";
import { Footer } from "@/components/landing/Footer";
import { Insights } from "@/components/landing/Insights";
import { F3Marquee } from "@/components/landing/F3Marquee";
import { LinearHero } from "@/components/landing/LinearHero";
import { Hood } from "@/components/landing/Hood";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F7F8F8] selection:bg-[#5E6AD2]/30 antialiased">
      <Nav />
      <main>
        <LinearHero />
        <F3Marquee />
        <Insights />
        <StackedFeatures />
        <Pipeline />
        <Hood />
      </main>
      <Footer />
    </div>
  );
}
