import Link from "next/link";
import { AdminAppShell } from "@/components/app-shells";
import { StatusBadge } from "@/components/status";
import { ButtonLink } from "@/components/ui/button";
import { getAdminBookings, requireRole } from "@/lib/auth";

export const metadata = { title: "Admin Bookings" };

export default async function AdminBookingsPage() {
  const profile = await requireRole(["admin", "dispatcher", "technician"]);
  const bookings = await getAdminBookings();

  return (
    <AdminAppShell profile={profile}>
      <h1 className="text-4xl font-black">Bookings</h1>
      <div className="glass mt-6 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-white/5 text-[#8FA4D4]">
              <tr><th className="p-4">Customer</th><th>Phone</th><th>Service</th><th>Location</th><th>Status</th><th>Scheduled</th><th>Technician</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td className="p-4">{booking.customer?.full_name || "Customer"}</td>
                  <td>{booking.customer?.phone || "-"}</td>
                  <td>{booking.service?.name}</td>
                  <td>{booking.pickup_location}</td>
                  <td><StatusBadge status={booking.status} /></td>
                  <td>{new Date(booking.scheduled_at).toLocaleString()}</td>
                  <td>{booking.assigned_technician_id ? "Assigned" : "Unassigned"}</td>
                  <td><Link className="font-bold text-[#FFC526]" href={`/admin/bookings/${booking.id}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ButtonLink href="/admin/technicians" variant="secondary" className="mt-5">Manage technicians</ButtonLink>
    </AdminAppShell>
  );
}
