import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resendOtp } from "@/lib/msg91";

const schema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = schema.parse(body);

    const result = await resendOtp(phone);
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    console.error("OTP resend failed:", error);
    return NextResponse.json({ error: "Failed to resend OTP" }, { status: 500 });
  }
}
