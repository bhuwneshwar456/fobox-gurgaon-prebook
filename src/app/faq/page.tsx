import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FaqSection } from "@/components/sections/FaqSection";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "FAQ — fobox",
  description: "Answers to your questions about fobox meal subscriptions.",
};

export default function FaqPage() {
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
              Your questions.
            </h1>
            <p className="text-ink-2 mt-4 text-lg">Everything you need to know before reserving your spot.</p>
          </Container>
        </div>
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
