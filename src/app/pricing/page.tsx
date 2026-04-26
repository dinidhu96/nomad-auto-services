import { ServiceCard } from "@/components/cards";
import { PublicPage } from "@/components/public-page";
import { pricingPlans, services } from "@/lib/constants";
import { aud, pageMetadata, servicePackages } from "@/lib/site";

export const metadata = pageMetadata("Pricing", "Clear Nomad Auto Services package pricing for car service, fleet support, brakes, oil changes, and full service work.", "/pricing");

export default function PricingPage() {
  return (
    <PublicPage>
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 pb-28 md:px-6">
        <h1 className="text-4xl font-black md:text-6xl">Simple plans, clear service prices.</h1>
        <p className="mt-4 max-w-3xl text-[#C9D6F5]">Prices may vary depending on location, vehicle, and issue severity. Fixed-price packages can be started online through the mock checkout flow until a real gateway is connected.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {servicePackages.map((pkg) => (
            <article key={pkg.id} className="glass rounded-2xl p-5">
              <p className="text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">{pkg.category}</p>
              <h2 className="mt-2 text-2xl font-black">{pkg.name}</h2>
              <p className="mt-2 min-h-12 text-sm text-[#C9D6F5]">{pkg.description}</p>
              <p className="mt-4 text-3xl font-black text-[#FFC526]">from {aud(pkg.price)}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-12 text-3xl font-black">Roadside plans</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.id} className="glass rounded-2xl p-5">
              <h3 className="text-xl font-black">{plan.name}</h3>
              <p className="mt-2 text-sm text-[#C9D6F5]">{plan.description}</p>
              <p className="mt-4 text-3xl font-black text-[#FFC526]">{aud(plan.price)}</p>
              <ul className="mt-4 grid gap-2 text-sm text-[#C9D6F5]">{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </article>
          ))}
        </div>
        <h2 className="mt-12 text-3xl font-black">Service estimates</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
    </PublicPage>
  );
}
