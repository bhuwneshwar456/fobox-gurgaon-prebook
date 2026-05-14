import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { FounderLetterSection } from "@/components/sections/FounderLetterSection";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About fobox",
  description: "Why we're building fobox, and who's behind it.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-paper py-20">
          <Container>
            <h1
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.0,
                color: "var(--ink)",
              }}
            >
              Why fobox exists.
            </h1>
            <p className="text-ink-2 mt-4 text-lg max-w-[600px]">
              We&apos;re two people from Gurgaon who got tired of eating badly. So we built the thing we needed.
            </p>
          </Container>
        </div>
        <FoundersSection />
        <FounderLetterSection />
      </main>
      <Footer />
    </>
  );
}
