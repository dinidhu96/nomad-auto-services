import { ServiceCard } from "@/components/cards";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { services } from "@/lib/constants";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 pb-28 md:px-6">
        <h1 className="text-4xl font-black md:text-6xl">Roadside help that comes to you.</h1>
        <p className="mt-4 max-w-2xl text-[#C9D6F5]">Choose the issue, share your location, and Nomad dispatches a qualified technician with the right tools.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
    </>
  );
}
