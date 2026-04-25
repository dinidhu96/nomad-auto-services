import { CustomerAppShell } from "@/components/app-shells";
import { ServiceCard } from "@/components/cards";
import { requireRole } from "@/lib/auth";
import { services } from "@/lib/constants";

export const metadata = { title: "Customer Services" };

export default async function CustomerServicesPage() {
  const profile = await requireRole(["customer"]);
  return (
    <CustomerAppShell profile={profile}>
      <h1 className="text-4xl font-black">Services</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </CustomerAppShell>
  );
}
