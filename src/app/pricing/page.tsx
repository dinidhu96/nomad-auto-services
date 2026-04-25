import { PricingCard, ServiceCard } from "@/components/cards";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { pricingPlans, services } from "@/lib/constants";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 pb-28 md:px-6">
        <h1 className="text-4xl font-black md:text-6xl">Simple plans, clear service prices.</h1>
        <p className="mt-4 max-w-3xl text-[#C9D6F5]">Prices may vary depending on location, vehicle, and issue severity. No payment is required upfront during the MVP booking flow.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} highlighted={index === 1} />
          ))}
        </div>
        <h2 className="mt-12 text-3xl font-black">Service estimates</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
    </>
  );
}
