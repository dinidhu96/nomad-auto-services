import { AdminAppShell } from "@/components/app-shells";
import { StatusBadge } from "@/components/status";
import { getAdminBookings, requireRole } from "@/lib/auth";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const profile = await requireRole(["admin", "dispatcher", "technician"]);
  const bookings = await getAdminBookings();
  const active = bookings.filter((booking) => !["completed", "cancelled"].includes(booking.status)).length;

  return (
    <AdminAppShell profile={profile}>
      <div className="grid gap-5">
        <h1 className="text-4xl font-black">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["New requests", bookings.filter((b) => b.status === "pending").length],
            ["Active jobs", active],
            ["Completed today", bookings.filter((b) => b.status === "completed").length],
            ["Cancelled jobs", bookings.filter((b) => b.status === "cancelled").length],
            ["Avg response", "15m"]
          ].map(([label, value]) => (
            <div key={label} className="glass rounded-2xl p-5">
              <p className="text-sm text-[#8FA4D4]">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#FFC526]">{value}</p>
            </div>
          ))}
        </div>
        <section className="glass overflow-hidden rounded-2xl">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-2xl font-black">Recent bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/5 text-[#8FA4D4]">
                <tr><th className="p-4">Customer</th><th>Service</th><th>Location</th><th>Status</th><th>Scheduled</th></tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-white/10">
                    <td className="p-4">{booking.customer?.full_name || "Customer"}</td>
                    <td>{booking.service?.name}</td>
                    <td>{booking.pickup_location}</td>
                    <td><StatusBadge status={booking.status} /></td>
                    <td>{new Date(booking.scheduled_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminAppShell>
  );
}
