import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CounterSection } from "@/components/sections/CounterSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { FounderLetterSection } from "@/components/sections/FounderLetterSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { prisma } from "@/lib/prisma";
import { COUNTER_SEED, TOTAL_SPOTS } from "@/lib/constants";

export const revalidate = 60; // re-pull counter every minute

async function getCounter() {
  try {
    const counter = await prisma.counter.findUnique({ where: { id: "global" } });
    return {
      spotsTaken: counter?.spotsTaken ?? COUNTER_SEED,
      totalSpots: counter?.totalSpots ?? TOTAL_SPOTS,
    };
  } catch {
    return { spotsTaken: COUNTER_SEED, totalSpots: TOTAL_SPOTS };
  }
}

export default async function HomePage() {
  const { spotsTaken, totalSpots } = await getCounter();

  return (
    <>
      <StickyHeader spotsTaken={spotsTaken} totalSpots={totalSpots} />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <CounterSection spotsTaken={spotsTaken} totalSpots={totalSpots} />
        <ProblemSection />
        <PlansSection />
        <HowItWorksSection />
        <FoundersSection />
        <FounderLetterSection />
        <FaqSection />
        <FinalCtaSection spotsTaken={spotsTaken} totalSpots={totalSpots} />
      </main>
      <Footer />
    </>
  );
}
