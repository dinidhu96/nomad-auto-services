import { ServiceCard } from "@/components/cards";
import { PageHero, PublicPage } from "@/components/public-page";
import { pageMetadata, serviceContent } from "@/lib/site";

export const metadata = pageMetadata("Services", "Mobile mechanic, log book servicing, battery, brake, cooling, and fleet support from Nomad Auto Services.", "/services");

export default function ServicesPage() {
  const primaryServices = serviceContent.filter((service) => service.primary);
  return (
    <PublicPage>
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 pb-28 md:px-6">
        <PageHero title="Mobile mechanic and roadside services." body="Choose a service, call Nomad, or book online. The core services are presented first so mobile users can move straight into the job they need." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {primaryServices.map((service) => (
            <ServiceCard key={service.slug} service={{ id: service.slug, name: service.title, slug: service.slug, description: service.summary, base_price: 99, icon: service.icon, is_active: true }} />
          ))}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-black">More service pages</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#C9D6F5]">Each page expands on the job type with examples, signs to book, and a clear call-to-action so customers can move from browsing to booking quickly.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceContent.filter((service) => !service.primary).map((service) => (
            <ServiceCard key={service.slug} service={{ id: service.slug, name: service.title, slug: service.slug, description: service.description, base_price: 99, icon: service.icon, is_active: true }} />
          ))}
        </div>
        </div>
      </main>
    </PublicPage>
  );
}
