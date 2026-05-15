import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Refund Policy — fobox" };

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-paper py-[clamp(4rem,8vw,7rem)]">
        <Container narrow>
          <p
            className="text-ink-3 text-xs tracking-widest uppercase font-medium mb-5"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            LEGAL · REFUND POLICY
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
            Refund Policy
          </h1>
          <div
            className="bg-canvas p-8 mb-10"
            style={{ border: "2px solid var(--ink)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
                color: "var(--ink)",
                lineHeight: 1.45,
              }}
            >
              Registration is free &mdash; no payment is collected until launch. Your spot and pricing are locked from the moment you register.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-ink-2" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Spot cancellation (pre-launch)
            </h2>
            <p>
              Since registration is free, there is nothing to refund before launch. You may cancel your reservation at any time by contacting us.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Post-launch cancellation
            </h2>
            <p>
              After launch, you may cancel your subscription anytime with 7 days notice before your next billing cycle. No cancellation fees. You may also hold up to 30 meals per month at no charge with advance notice &mdash; held meals are not charged or credited, they simply aren&apos;t delivered.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              How refunds are processed
            </h2>
            <p>
              Post-launch refunds (e.g. for unfulfilled deliveries) are credited to the original payment method within 7 business days of approval.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Non-refundable situations
            </h2>
            <p>
              Payments made post-launch are non-refundable after your first delivery has been dispatched.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Contact for refunds
            </h2>
            <p>
              Email <a href="mailto:hello@fobox.in" className="text-ink underline">hello@fobox.in</a> with your order ID. We respond within 1 business day.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
