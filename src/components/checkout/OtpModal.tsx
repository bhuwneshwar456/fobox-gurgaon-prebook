"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface OtpModalProps {
  open: boolean;
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

const RESEND_COOLDOWN_S = 30;
const OTP_LENGTH = 4;

export function OtpModal({ open, phone, onVerified, onCancel }: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_S);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Send OTP when modal opens
  useEffect(() => {
    if (!open) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");
    setInfo("");
    setCooldown(RESEND_COOLDOWN_S);

    fetch("/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Failed to send OTP");
        setInfo(`OTP sent to +91 ${phone.slice(0, 5)} ${phone.slice(5)}`);
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to send OTP"));
  }, [open, phone]);

  // Cooldown timer
  useEffect(() => {
    if (!open || cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [open, cooldown]);

  const handleChange = (idx: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = digit;
    setDigits(next);
    setError("");
    if (digit && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
    if (next.every((d) => d !== "") && next.join("").length === OTP_LENGTH) {
      void submit(next.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = text.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    setDigits(next);
    if (text.length === OTP_LENGTH) {
      void submit(text);
    } else {
      inputsRef.current[text.length]?.focus();
    }
  };

  const submit = async (otp: string) => {
    setVerifying(true);
    setError("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid OTP");
      onVerified();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/otp/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to resend");
      setInfo("OTP resent");
      setCooldown(RESEND_COOLDOWN_S);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to resend");
    } finally {
      setResending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(20, 17, 15, 0.55)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="otp-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-canvas rounded-[12px] w-full max-w-[420px] p-8"
            style={{ border: "1.5px solid var(--border-strong)" }}
          >
            <p
              className="text-ink-3 text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              VERIFY YOUR NUMBER
            </p>
            <h2
              id="otp-modal-title"
              className="text-ink mb-2"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
                fontSize: "1.5rem",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              Enter the {OTP_LENGTH}-digit OTP
            </h2>
            <p className="text-ink-2 text-sm mb-6">
              We sent it to <strong>+91 {phone}</strong>.{" "}
              <button
                type="button"
                onClick={onCancel}
                className="text-ink-3 underline hover:text-ink transition-colors cursor-pointer"
              >
                Wrong number?
              </button>
            </p>

            <div className="flex gap-2 justify-center mb-5">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={d}
                  disabled={verifying}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  aria-label={`OTP digit ${i + 1}`}
                  className="bg-paper border-2 border-border rounded-[8px] text-ink text-center font-medium focus:outline-none focus:border-ink transition-colors"
                  style={{
                    width: "56px",
                    height: "64px",
                    fontSize: "1.75rem",
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                />
              ))}
            </div>

            {error && (
              <p className="text-error text-sm mb-4 text-center" role="alert">
                {error}
              </p>
            )}
            {!error && info && (
              <p className="text-ink-3 text-sm mb-4 text-center">{info}</p>
            )}

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || resending}
                className="text-ink-2 hover:text-ink transition-colors disabled:text-ink-3 disabled:cursor-not-allowed cursor-pointer"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Resending..." : "Resend OTP"}
              </button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                disabled={verifying || digits.some((d) => !d)}
                onClick={() => submit(digits.join(""))}
              >
                {verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

