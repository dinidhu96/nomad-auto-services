import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { demoBookings } from "@/lib/constants";
import { createClientServer } from "@/lib/supabase-server";
import type { Profile, UserRole } from "@/lib/types";

export async function getCurrentProfile(): Promise<Profile | null> {
  const cookieStore = await cookies();
  const demoCustomer = cookieStore.get("nomad_demo_customer")?.value;

  if (demoCustomer) {
    return {
      id: "demo-customer",
      full_name: "Demo Driver",
      email: "driver@example.com",
      phone: demoCustomer,
      role: "customer",
      avatar_url: null,
      is_active: true
    };
  }

  const supabase = await createClientServer();
  if (!supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function requireRole(roles: UserRole[]) {
  const profile = await getCurrentProfile();
  if (!profile) redirect(roles.includes("customer") ? "/customer/login" : "/admin/login");
  if (!roles.includes(profile.role)) redirect(profile.role === "customer" ? "/customer/dashboard" : "/admin/dashboard");
  return profile;
}

export async function getCustomerBookings(customerId: string) {
  const supabase = await createClientServer();
  if (!supabase || customerId === "demo-customer") return demoBookings;

  const { data } = await supabase
    .from("bookings")
    .select("*, service:services(name, slug, icon), vehicle:vehicles(*), customer:profiles(full_name, phone, email)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  return (data || demoBookings) as typeof demoBookings;
}

export async function getAdminBookings() {
  const supabase = await createClientServer();
  if (!supabase) return demoBookings;

  const { data } = await supabase
    .from("bookings")
    .select("*, service:services(name, slug, icon), vehicle:vehicles(*), customer:profiles(full_name, phone, email)")
    .order("created_at", { ascending: false });

  return (data || demoBookings) as typeof demoBookings;
}
