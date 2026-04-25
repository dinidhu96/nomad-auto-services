import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { otpSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = otpSchema.safeParse(body);
  if (!parsed.success || parsed.data.otp !== "123456") {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const email = `${parsed.data.phone.replace(/\D/g, "") || "demo"}@phone.nomad.local`;
    const { data } = await supabase.auth.admin.createUser({
      email,
      phone: parsed.data.phone,
      email_confirm: true,
      user_metadata: { role: "customer", phone: parsed.data.phone }
    });

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email,
        phone: parsed.data.phone,
        role: "customer",
        full_name: "Nomad Driver"
      });
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("nomad_demo_customer", parsed.data.phone, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return response;
}
