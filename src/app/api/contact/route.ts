import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid contact form" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
