import { AdminAppShell } from "@/components/app-shells";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const profile = await requireRole(["admin", "dispatcher"]);
  return (
    <AdminAppShell profile={profile}>
      <h1 className="text-4xl font-black">Messages</h1>
      <div className="mt-6 grid gap-4">
        {["I need help with a flat tire near Half Way Tree.", "Can I schedule a mechanic inspection tomorrow?"].map((message, index) => (
          <article key={message} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div><p className="font-bold">Contact message #{index + 1}</p><p className="mt-2 text-sm text-[#C9D6F5]">{message}</p></div>
              <Button variant="secondary">Mark resolved</Button>
            </div>
          </article>
        ))}
      </div>
    </AdminAppShell>
  );
}
