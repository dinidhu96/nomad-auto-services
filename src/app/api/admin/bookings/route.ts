import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { BookingStatus } from "@/lib/types";

const allowed = new Set(["accepted", "technician_assigned", "on_the_way", "arrived", "completed", "cancelled"]);

export async function PATCH(request: Request) {
  const profile = await getCurrentProfile();
  if (!profile || !["admin", "dispatcher", "technician"].includes(profile.role)) {
    return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { id?: string; status?: BookingStatus; admin_notes?: string };
  if (!body.id || !body.status || !allowed.has(body.status)) {
    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, demo: true });

  const { error } = await supabase
    .from("bookings")
    .update({ status: body.status, admin_notes: body.admin_notes || null })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
