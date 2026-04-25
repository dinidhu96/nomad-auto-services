import { AdminAppShell } from "@/components/app-shells";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { requireRole } from "@/lib/auth";

export const metadata = { title: "Technicians" };

export default async function AdminTechniciansPage() {
  const profile = await requireRole(["admin", "dispatcher"]);
  return (
    <AdminAppShell profile={profile}>
      <h1 className="text-4xl font-black">Technicians</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.7fr]">
        <section className="glass rounded-2xl p-5">
          {["Andre Blake", "Maya Campbell", "Kevin Reid"].map((name, index) => (
            <div key={name} className="flex items-center justify-between border-t border-white/10 py-4 first:border-t-0">
              <div><p className="font-bold">{name}</p><p className="text-sm text-[#C9D6F5]">{index === 0 ? "On active job" : "Available"}</p></div>
              <Button variant={index === 2 ? "secondary" : "ghost"}>{index === 2 ? "Deactivate" : "View jobs"}</Button>
            </div>
          ))}
        </section>
        <section className="glass rounded-2xl p-5">
          <h2 className="text-2xl font-black">Add technician</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Name"><Input placeholder="Technician name" /></Field>
            <Field label="Email"><Input placeholder="tech@nomad.test" /></Field>
            <Button>Create technician</Button>
          </div>
        </section>
      </div>
    </AdminAppShell>
  );
}
