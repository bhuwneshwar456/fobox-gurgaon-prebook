const MSG91_BASE = "https://control.msg91.com/api/v5/otp";

interface Msg91Response {
  type?: string;
  message?: string;
  request_id?: string;
}

function getCredentials() {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  if (!authKey || !templateId) {
    throw new Error("MSG91_AUTH_KEY and MSG91_TEMPLATE_ID must be set");
  }
  return { authKey, templateId };
}

// Phone must be E.164 without +, e.g. "919876543210"
function toMsg91Mobile(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  throw new Error("Invalid phone format");
}

export async function sendOtp(phone: string): Promise<{ ok: boolean; message: string; requestId?: string }> {
  const { authKey, templateId } = getCredentials();
  const mobile = toMsg91Mobile(phone);

  const url = new URL(MSG91_BASE);
  url.searchParams.set("template_id", templateId);
  url.searchParams.set("mobile", mobile);
  url.searchParams.set("otp_length", "4");
  url.searchParams.set("otp_expiry", "10");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      authkey: authKey,
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json().catch(() => ({}))) as Msg91Response;

  if (data.type === "success") {
    return { ok: true, message: data.message ?? "OTP sent", requestId: data.request_id };
  }
  return { ok: false, message: data.message ?? "Failed to send OTP" };
}

export async function verifyOtp(phone: string, otp: string): Promise<{ ok: boolean; message: string }> {
  const { authKey } = getCredentials();
  const mobile = toMsg91Mobile(phone);

  const url = new URL(`${MSG91_BASE}/verify`);
  url.searchParams.set("mobile", mobile);
  url.searchParams.set("otp", otp);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      authkey: authKey,
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json().catch(() => ({}))) as Msg91Response;

  if (data.type === "success") {
    return { ok: true, message: data.message ?? "OTP verified" };
  }
  // MSG91 returns this when the OTP was already verified in the same session
  if (data.message?.toLowerCase().includes("already verified")) {
    return { ok: true, message: "OTP verified" };
  }
  return { ok: false, message: data.message ?? "Invalid OTP" };
}

export async function resendOtp(phone: string): Promise<{ ok: boolean; message: string }> {
  const { authKey } = getCredentials();
  const mobile = toMsg91Mobile(phone);

  const url = new URL(`${MSG91_BASE}/retry`);
  url.searchParams.set("mobile", mobile);
  url.searchParams.set("retrytype", "text");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { authkey: authKey, "Content-Type": "application/json" },
  });

  const data = (await res.json().catch(() => ({}))) as Msg91Response;
  if (data.type === "success") return { ok: true, message: data.message ?? "OTP resent" };
  return { ok: false, message: data.message ?? "Failed to resend OTP" };
}

