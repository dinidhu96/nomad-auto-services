import { CustomerAppShell } from "@/components/app-shells";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { requireRole } from "@/lib/auth";
import { demoVehicle } from "@/lib/constants";

export const metadata = { title: "Profile" };

export default async function CustomerProfilePage() {
  const profile = await requireRole(["customer"]);

  return (
    <CustomerAppShell profile={profile}>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass rounded-2xl p-6">
          <h1 className="text-3xl font-black">Profile</h1>
          <div className="mt-5 grid gap-4">
            <Field label="Name"><Input defaultValue={profile.full_name || ""} /></Field>
            <Field label="Phone"><Input defaultValue={profile.phone || ""} /></Field>
            <Field label="Email"><Input defaultValue={profile.email || ""} /></Field>
            <Button>Save profile</Button>
          </div>
        </section>
        <section className="glass rounded-2xl p-6">
          <h2 className="text-2xl font-black">Vehicles</h2>
          <div className="mt-4 rounded-xl bg-white/8 p-4">
            <p className="font-bold">{demoVehicle.year} {demoVehicle.make} {demoVehicle.model}</p>
            <p className="text-sm text-[#C9D6F5]">{demoVehicle.color} · {demoVehicle.plate_number}</p>
          </div>
          <div className="mt-5 grid gap-3">
            <Field label="Add vehicle"><Input placeholder="Make, model, plate" /></Field>
            <Button variant="secondary">Add vehicle</Button>
          </div>
        </section>
      </div>
    </CustomerAppShell>
  );
}
