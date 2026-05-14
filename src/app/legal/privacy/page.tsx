import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata = { title: "Privacy Policy — fobox" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-paper py-[clamp(4rem,8vw,7rem)]">
        <Container narrow>
          <p
            className="text-ink-3 text-xs tracking-widest uppercase font-medium mb-5"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            LEGAL · PRIVACY POLICY
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
            Privacy Policy
          </h1>
          <div className="flex flex-col gap-6 text-ink-2" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            <p>Last updated: May 2026</p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              What we collect
            </h2>
            <p>
              When you pre-book, we collect your name, email, phone number, Gurgaon sector, diet preference, and any allergies you disclose. We also collect UTM parameters to understand how you found us.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              How we use it
            </h2>
            <p>
              Your data is used to: send your booking confirmation; share launch updates via email and WhatsApp; personalise your meal plan; and improve fobox before launch. We do not sell your data.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Third-party services
            </h2>
            <p>
              We use Razorpay for payments (subject to Razorpay&apos;s privacy policy), Resend for email, and PostgreSQL for storage. Payment card data is never stored on our servers.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Your rights
            </h2>
            <p>
              You may request deletion of your data at any time by emailing{" "}
              <a href="mailto:hello@fobox.in" className="text-ink underline">hello@fobox.in</a>.
              If you request deletion, your pre-booking deposit will be refunded and your founding member status forfeited.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Cookies
            </h2>
            <p>
              We use minimal cookies necessary for the site to function. We do not use tracking cookies or third-party advertising pixels.
            </p>
            <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "var(--ink)", fontSize: "1.4rem", fontWeight: 500 }}>
              Contact
            </h2>
            <p>
              Privacy questions: <a href="mailto:hello@fobox.in" className="text-ink underline">hello@fobox.in</a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
