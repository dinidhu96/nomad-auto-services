import { ArrowRight, BadgeCheck, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import { PricingCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/button";
import { PublicPage } from "@/components/public-page";
import { pricingPlans, services } from "@/lib/constants";
import { aud, pageMetadata, servicePackages, business } from "@/lib/site";

export const metadata = pageMetadata("Pricing", "Clear Nomad Auto Services package pricing for car service, fleet support, brakes, oil changes, and full service work.", "/pricing");

export default function PricingPage() {
  return (
    <PublicPage>
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 pb-28 md:px-6 lg:py-10">
        <section className="glass grid gap-6 rounded-3xl p-5 md:p-7 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid gap-4">
            <p className="text-sm font-black uppercase tracking-[.18em] text-[#FFC526]">Pricing insight</p>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Straightforward pricing for real roadside work.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[#C9D6F5] sm:text-base">
              Use the packages below to estimate common jobs before you book. Final pricing can shift with access, distance, vehicle type, and issue severity, but the structure stays clear before the job starts.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: CalendarCheck, label: "Fast booking", text: "Start online in minutes." },
                { icon: ShieldCheck, label: "Clear scope", text: "Know what is included." },
                { icon: BadgeCheck, label: "No surprises", text: "We confirm before dispatch." },
                { icon: Sparkles, label: "Premium support", text: "Roadside and mobile service." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <Icon className="h-5 w-5 text-[#FFC526]" />
                    <p className="mt-3 text-sm font-black">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[#C9D6F5]">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#001240]/70 p-5">
              <p className="text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">Quick estimate</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
                  <span className="text-sm text-[#C9D6F5]">Standard roadside visit</span>
                  <span className="font-black text-white">from {aud(99)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
                  <span className="text-sm text-[#C9D6F5]">Most common service jobs</span>
                  <span className="font-black text-white">from {aud(150)}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
                  <span className="text-sm text-[#C9D6F5]">Fleet and tradie plans</span>
                  <span className="font-black text-white">from {aud(154)}</span>
                </div>
              </div>
              <ButtonLink href="/book" className="mt-5 w-full">
                Book now <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <p className="mt-3 text-sm leading-6 text-[#8FA4D4]">If you need a custom quote, call {business.phone} or use WhatsApp from the header.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {servicePackages.map((pkg, index) => (
            <article key={pkg.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">{pkg.category}</p>
                <span className="rounded-full border border-[#FFC526]/30 bg-[#FFC526]/10 px-3 py-1 text-xs font-bold text-[#FFC526]">Fixed price</span>
              </div>
              <h2 className="mt-3 text-2xl font-black">{pkg.name}</h2>
              <p className="mt-2 min-h-16 text-sm leading-6 text-[#C9D6F5]">{pkg.description}</p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[.16em] text-[#8FA4D4]">Starts from</p>
                  <p className="mt-1 text-3xl font-black text-[#FFC526]">{aud(pkg.price)}</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8 text-sm font-black text-white">
                  0{index + 1}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="glass rounded-3xl p-5 md:p-6">
            <h2 className="text-2xl font-black sm:text-3xl">Roadside plans that scale with how you drive</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#C9D6F5]">
              The plans below are built for regular drivers, busy families, and fleets that need predictable support.
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={plan.id} plan={plan} highlighted={index === 1} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="glass rounded-3xl p-5 md:p-6">
              <h3 className="text-2xl font-black">What can change the price</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-[#C9D6F5]">
                {[
                  "Distance to the vehicle and access to the breakdown location",
                  "Vehicle type, age, and whether special tools or parts are needed",
                  "Time of day, urgency, and if the job needs towing instead of onsite repair",
                  "Whether the issue is a quick fix, a safety repair, or a deeper inspection"
                ].map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass rounded-3xl p-5 md:p-6">
              <h3 className="text-2xl font-black">Popular service estimates</h3>
              <p className="mt-2 text-sm leading-7 text-[#C9D6F5]">These estimates help customers understand common entry points before they book.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {services.slice(0, 4).map((service) => (
                  <div key={service.id} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-sm font-black text-white">{service.name}</p>
                    <p className="mt-2 text-sm text-[#C9D6F5]">{service.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="glass rounded-3xl p-5 md:p-6">
            <h2 className="text-2xl font-black sm:text-3xl">How booking and pricing work</h2>
            <div className="mt-5 grid gap-3">
              {[
                "Pick the service or roadside problem you need help with.",
                "Share the vehicle, location, and any signs the mechanic should know.",
                "We confirm the scope and dispatch the best available tech.",
                "If extra work is needed, we explain it before proceeding."
              ].map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/8 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F8B000] text-sm font-black text-[#001240]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#C9D6F5]">{step}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass rounded-3xl p-5 md:p-6">
            <h2 className="text-2xl font-black sm:text-3xl">Best use cases</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Customers wanting a fast, fixed-price starting point",
                "Fleet managers needing repeatable service costs",
                "Drivers comparing common roadside package options",
                "Visitors booking without creating an account"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-[#C9D6F5]">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </PublicPage>
  );
}
