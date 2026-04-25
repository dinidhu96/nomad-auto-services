import { AdminAppShell } from "@/components/app-shells";
import { ServiceIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { requireRole } from "@/lib/auth";
import { services } from "@/lib/constants";
import { formatMoney } from "@/lib/utils";

export const metadata = { title: "Admin Services" };

export default async function AdminServicesPage() {
  const profile = await requireRole(["admin", "dispatcher"]);
  return (
    <AdminAppShell profile={profile}>
      <h1 className="text-4xl font-black">Services</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.7fr]">
        <section className="glass rounded-2xl p-5">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between border-t border-white/10 py-4 first:border-t-0">
              <div className="flex items-center gap-3">
                <ServiceIcon name={service.icon} className="h-8 w-8 text-[#FFC526]" />
                <div><p className="font-bold">{service.name}</p><p className="text-sm text-[#C9D6F5]">{formatMoney(service.base_price)} base price</p></div>
              </div>
              <Button variant="secondary">Edit</Button>
            </div>
          ))}
        </section>
        <section className="glass rounded-2xl p-5">
          <h2 className="text-2xl font-black">Create service</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Name"><Input placeholder="Service name" /></Field>
            <Field label="Base price"><Input type="number" placeholder="75" /></Field>
            <Button>Add service</Button>
          </div>
        </section>
      </div>
    </AdminAppShell>
  );
}
