import Link from "next/link";
import { CustomerAppShell } from "@/components/app-shells";
import { EmptyState } from "@/components/states";
import { StatusBadge } from "@/components/status";
import { getCustomerBookings, requireRole } from "@/lib/auth";

export const metadata = { title: "My Bookings" };

export default async function CustomerBookingsPage() {
  const profile = await requireRole(["customer"]);
  const bookings = await getCustomerBookings(profile.id);

  return (
    <CustomerAppShell profile={profile}>
      <h1 className="text-4xl font-black">My bookings</h1>
      <div className="mt-6 grid gap-4">
        {bookings.length === 0 && <EmptyState title="No bookings yet" body="Start a request when you need roadside support." />}
        {bookings.map((booking) => (
          <Link key={booking.id} href={`/customer/bookings/${booking.id}`} className="glass rounded-2xl p-5 transition hover:border-[#FFC526]/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{booking.service?.name || "Roadside service"}</h2>
                <p className="mt-2 text-sm text-[#C9D6F5]">{booking.pickup_location}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
          </Link>
        ))}
      </div>
    </CustomerAppShell>
  );
}
