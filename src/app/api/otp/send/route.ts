import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendOtp } from "@/lib/msg91";

const schema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = schema.parse(body);

    const result = await sendOtp(phone);
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 502 });
    }
    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    console.error("OTP send failed:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
