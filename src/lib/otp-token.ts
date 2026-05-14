import crypto from "crypto";

const TTL_MS = 10 * 60 * 1000; // 10 minutes

function getSecret(): string {
  const secret = process.env.OTP_SIGNING_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("OTP_SIGNING_SECRET must be set and at least 32 chars");
  }
  return secret;
}

export function issueOtpToken(phone: string): string {
  const expiresAt = Date.now() + TTL_MS;
  const payload = `${phone}.${expiresAt}`;
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

export function verifyOtpToken(token: string, phone: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(".");
    if (parts.length !== 3) return false;
    const [tokenPhone, expiresAtStr, sig] = parts;
    if (tokenPhone !== phone) return false;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(`${tokenPhone}.${expiresAtStr}`)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}
