import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth";
import { services } from "@/lib/constants";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "customer") {
    return NextResponse.json({ error: "Customer login required" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });

  const service = services.find((item) => item.id === parsed.data.serviceId || item.slug === parsed.data.serviceId) || services[0];
  const supabase = getSupabaseAdmin();

  if (!supabase || profile.id === "demo-customer") {
    return NextResponse.json({ id: `demo-booking-${Date.now()}` });
  }

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      customer_id: profile.id,
      make: parsed.data.vehicleMake,
      model: parsed.data.vehicleModel,
      year: parsed.data.vehicleYear,
      plate_number: parsed.data.plateNumber
    })
    .select()
    .single();
  if (vehicleError) return NextResponse.json({ error: vehicleError.message }, { status: 500 });

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      customer_id: profile.id,
      service_id: service.id,
      vehicle_id: vehicle.id,
      issue_description: parsed.data.issueDescription,
      pickup_location: parsed.data.pickupLocation,
      scheduled_at: parsed.data.scheduleMode === "now" ? new Date().toISOString() : parsed.data.scheduledAt,
      status: "pending",
      estimated_arrival_minutes: 15
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
