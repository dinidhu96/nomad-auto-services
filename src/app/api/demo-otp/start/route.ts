import { NextResponse } from "next/server";
import { phoneSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = phoneSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    await supabase.from("customer_otp_sessions").insert({
      phone: parsed.data.phone,
      otp_code: "123456",
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });
  }

  return NextResponse.json({ ok: true, demoOtp: "123456" });
}
