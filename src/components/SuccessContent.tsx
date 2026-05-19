"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SUPPORT_WHATSAPP_URL, LAUNCH_DATE_SHORT } from "@/lib/constants";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function SuccessContent() {
  const params = useSearchParams();
  const sector = params.get("sector") ?? "your sector";
  const name = params.get("name") ?? "there";
  const memberNumberParam = params.get("member");
  const memberNumber = memberNumberParam ? parseInt(memberNumberParam, 10) : null;
  const [whatsappGroup, setWhatsappGroup] = useState(
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP || SUPPORT_WHATSAPP_URL
  );

  useEffect(() => {
    window.fbq?.("track", "CompleteRegistration");
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => { if (d.whatsappGroupUrl) setWhatsappGroup(d.whatsappGroupUrl); })
      .catch(() => {});
  }, []);

  const memberLine = memberNumber
    ? `You're founding member #${memberNumber}.`
    : `You're in.`;

  const shareText = `Just locked 50% off my fobox meal subscription for 12 months! 50 wholesome meals/month delivered in Gurgaon from Sep 2026. Join here →`;
  const shareUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://fobox.in";
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;

  return (
    <div className="flex justify-center py-24 px-6">
      <Container>
        <div className="max-w-[600px] mx-auto text-center">
          <div
            className="mx-auto mb-10 w-28 h-28 rounded-full bg-turmeric border-2 border-ink flex items-center justify-center text-5xl"
            aria-hidden="true"
          >
            🍱
          </div>

          <h1
            className="text-ink mb-4"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {memberLine}
          </h1>

          <p className="text-ink-2 mb-12" style={{ fontSize: "1.125rem", lineHeight: 1.65 }}>
            Welcome to fobox, {name.split(" ")[0]}. The kitchen is officially one step closer to opening because of you.
          </p>

          {/* Next steps */}
          <div className="text-left mb-12 flex flex-col gap-6">
            {[
              {
                n: "1",
                title: "Save this page",
                desc: "Your booking is confirmed. Take a screenshot if you want a record — we'll also reach out on WhatsApp shortly.",
              },
              {
                n: "2",
                title: "Join the WhatsApp group",
                desc: "All updates happen here — kitchen visits, menu previews, launch prep. This is your primary channel.",
                cta: (
                  <a
                    href={whatsappGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline inline-block mt-2"
                  >
                    <Button variant="whatsapp" size="sm">
                      Join WhatsApp group
                    </Button>
                  </a>
                ),
              },
              {
                n: "3",
                title: "Expect weekly updates",
                desc: "Every Friday, a 'from the kitchen' update via WhatsApp. Menu testing photos, supplier visits, the real stuff.",
              },
              {
                n: "4",
                title: `First delivery: ${LAUNCH_DATE_SHORT}`,
                desc: `Your first fobox arrives in ${sector}. Your locked price kicks in from this bill. Hold meals anytime. Cancel anytime.`,
              },
            ].map(({ n, title, desc, cta }) => (
              <div key={n} className="flex gap-5">
                <span
                  className="flex-shrink-0 text-ink-3"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </span>
                <div>
                  <p className="text-ink font-medium text-base mb-1">{title}</p>
                  <p className="text-ink-2 text-sm leading-relaxed">{desc}</p>
                  {cta}
                </div>
              </div>
            ))}
          </div>

          {/* Referral */}
          <div
            className="bg-canvas rounded-[8px] p-6 text-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <p className="text-ink font-medium mb-2">
              Know someone in Gurgaon who&apos;d love this?
            </p>
            <p className="text-ink-3 text-sm mb-4">
              Share fobox → get them on the founding member list before spots close.
            </p>
            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button variant="whatsapp" size="md">
                Share on WhatsApp
              </Button>
            </a>
          </div>

          <p className="mt-8 text-ink-3 text-sm">
            Questions?{" "}
            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 hover:text-ink transition-colors"
            >
              Message us on WhatsApp →
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

