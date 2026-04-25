import { Phone } from "lucide-react";
import { CustomerAppShell } from "@/components/app-shells";
import { ServiceCard } from "@/components/cards";
import { StatusBadge } from "@/components/status";
import { ButtonLink } from "@/components/ui/button";
import { getCustomerBookings, requireRole } from "@/lib/auth";
import { services } from "@/lib/constants";

export const metadata = { title: "Customer Dashboard" };

export default async function CustomerDashboardPage() {
  const profile = await requireRole(["customer"]);
  const bookings = await getCustomerBookings(profile.id);
  const active = bookings.find((booking) => !["completed", "cancelled"].includes(booking.status));

  return (
    <CustomerAppShell profile={profile}>
      <section className="grid gap-5">
        <div className="glass rounded-3xl p-6">
          <p className="text-sm font-bold text-[#FFC526]">Welcome back</p>
          <h1 className="mt-1 text-4xl font-black">{profile.full_name || "Nomad Driver"}</h1>
          <p className="mt-3 text-[#C9D6F5]">Need roadside help now? Start a request and Nomad will guide the next steps.</p>
          <ButtonLink href="/book" className="mt-6 w-full md:w-auto">
            <Phone className="h-5 w-5" /> Get Help Now
          </ButtonLink>
        </div>

        {active && (
          <div className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#8FA4D4]">Active booking</p>
                <h2 className="text-2xl font-black">{active.service?.name}</h2>
              </div>
              <StatusBadge status={active.status} />
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/10">
              <div className="h-3 w-2/3 rounded-full bg-[#F8B000]" />
            </div>
            <p className="mt-3 text-sm text-[#C9D6F5]">Mock ETA: {active.estimated_arrival_minutes || 15} minutes</p>
            <ButtonLink href={`/customer/bookings/${active.id}`} variant="secondary" className="mt-4">View booking</ButtonLink>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </CustomerAppShell>
  );
}
