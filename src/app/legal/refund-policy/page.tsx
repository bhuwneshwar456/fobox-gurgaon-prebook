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
              The short version: if we don&apos;t launch by 1 September 2026, you get your ₹99 back within 7 days. No questions asked. That&apos;s the deal we made and the deal we&apos;ll keep.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-ink-2" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Pre-booking deposit refund
            </h2>
            <p>
              The ₹99 pre-booking deposit is fully refundable in the following situations:
            </p>
            <ul className="list-none flex flex-col gap-3 pl-0">
              {[
                "fobox does not launch by 1 September 2026 — automatic refund within 7 business days",
                "You request a refund before the launch date — processed within 7 business days",
                "Your delivery sector is not serviceable at launch — automatic refund within 7 business days",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-mint flex-shrink-0 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Post-launch cancellation
            </h2>
            <p>
              After launch, you may cancel your subscription anytime with 7 days notice before your next billing cycle. No cancellation fees. You may also hold up to 30 meals per month at no charge with advance notice — held meals are not charged or credited, they simply aren&apos;t delivered.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              How refunds are processed
            </h2>
            <p>
              All refunds are credited to the original payment method (card, UPI, or net banking) within 7 business days of approval. Razorpay processing times may vary.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Non-refundable situations
            </h2>
            <p>
              The ₹99 deposit is not refundable after fobox launches and your first delivery has been dispatched.
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
