import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Terms of Service — fobox" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-paper py-[clamp(4rem,8vw,7rem)]">
        <Container narrow>
          <p
            className="text-ink-3 text-xs tracking-widest uppercase font-medium mb-5"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            LEGAL · TERMS OF SERVICE
          </p>
          <h1
            className="mb-10"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            Terms of Service
          </h1>
          <div className="prose-fobox flex flex-col gap-6 text-ink-2" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <p>Last updated: May 2026</p>
            <p>
              By registering as a founding member, you agree to the following terms. Please read these carefully.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              1. The Pre-Booking
            </h2>
            <p>
              Registration as a founding member is free. It secures your spot and locks your pricing for 12 months from your first delivery. Payment is collected only at launch.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              2. Founding Member Pricing
            </h2>
            <p>
              Founding members receive 50% off the standard per-meal price for 12 months from their first delivery. The locked price applies to your chosen plan. Plan changes after launch may affect pricing. Members may cancel anytime with 7 days notice. Members may hold up to 30 meals per month with advance notice.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              3. Launch Timeline
            </h2>
            <p>
              fobox intends to launch by 1 September 2026.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              4. Subscription Terms
            </h2>
            <p>
              Post-launch, fobox operates as a monthly subscription. Members may cancel with 7 days notice before the next billing cycle. Pauses of up to 4 weeks per year are permitted with 3 days advance notice.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              5. Delivery
            </h2>
            <p>
              Delivery is available only within the Gurgaon sectors listed at checkout. Delivery schedules are Mon-Fri. fobox is not liable for delivery delays due to circumstances beyond our control.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              6. Food Safety
            </h2>
            <p>
              All meals are prepared in an FSSAI-registered kitchen. Members are responsible for disclosing allergies at signup. fobox is not liable for undisclosed allergen reactions.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              7. Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:hello@fobox.in" className="text-ink underline">hello@fobox.in</a>.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
