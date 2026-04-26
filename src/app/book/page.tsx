import { Suspense } from "react";
import { BookingFlow } from "@/components/booking-flow";
import { ServiceCard } from "@/components/cards";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { serviceContent } from "@/lib/site";

export const metadata = { title: "Book Service" };

export default function BookPage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 pb-28 md:px-6">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-4xl font-black md:text-6xl">Book roadside assistance.</h1>
          <p className="mt-4 text-[#C9D6F5]">Five quick steps. A dispatcher can accept and assign a technician from the admin console.</p>
        </div>
        <section className="mx-auto mb-8 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {serviceContent.filter((service) => service.primary).map((service) => (
            <ServiceCard
              key={service.slug}
              service={{
                id: service.slug,
                name: service.title,
                slug: service.slug,
                description: service.summary,
                base_price: 99,
                icon: service.icon,
                is_active: true
              }}
            />
          ))}
        </section>
        <Suspense fallback={null}>
          <BookingFlow />
        </Suspense>
      </main>
    </>
  );
}
