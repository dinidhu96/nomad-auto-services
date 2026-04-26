import { CalendarCheck, Phone, Star } from "lucide-react";
import { Suspense } from "react";
import { BookingWidget } from "@/components/booking-widget";
import { ServiceCard, StatCard, TestimonialCard } from "@/components/cards";
import { MascotHero } from "@/components/mascot-hero";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/ui/button";
import { business, serviceContent } from "@/lib/site";

const stats = [
  { icon: "Clock3", value: "24/7 Support", label: "We are here whenever you need us." },
  { icon: "Gauge", value: "15 Min Avg.", label: "Quick help right when you need it." },
  { icon: "ShieldCheck", value: "Certified Techs", label: "Skilled, licensed professionals." },
  { icon: "MapPin", value: "Perth & WA", label: "Mobile support where drivers need help." }
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <PageTransition>
        <main className="road-grid overflow-hidden pb-28 lg:pb-0">
        <section className="city-shadow relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-8 md:px-6 lg:min-h-[720px] lg:grid-cols-[1fr_.95fr_.78fr] lg:items-center lg:gap-8 lg:py-12">
          <div className="relative z-10 pt-4 text-center lg:pt-0 lg:text-left">
            <h1 className="mx-auto max-w-2xl text-4xl font-black leading-[.96] tracking-normal sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
              No roadside?
              <br />
              No problem.
              <br />
              <span className="text-[#F8B000]">Nomad</span> is on the way.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-[#C9D6F5] md:text-lg md:leading-8 lg:mx-0">
              Fast, friendly, and professional mobile auto services delivered to you. From log book servicing and batteries to brakes, cooling systems, and fleet support, we keep drivers moving.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:gap-4 lg:justify-start">
              <ButtonLink href={business.phoneLink} className="text-base">
                <Phone className="h-5 w-5" /> Call {business.phone}
              </ButtonLink>
              <ButtonLink href="/book" variant="secondary" className="text-base">
                <CalendarCheck className="h-5 w-5" /> Book Service
              </ButtonLink>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F8B000] text-[#001240]">
                <Star className="h-7 w-7 fill-current" />
              </span>
              <div className="text-left">
                <p className="font-black">4.9/5 Star Rated</p>
                <p className="text-sm text-[#C9D6F5]">Trusted by 1,000+ drivers</p>
              </div>
            </div>
          </div>
          <MascotHero className="order-2 -mb-4 overflow-hidden lg:order-none lg:-mb-24" mobile />
          <div className="relative z-10 order-3 hidden lg:block">
            <Suspense fallback={null}>
              <BookingWidget compact />
            </Suspense>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {serviceContent.slice(0, 5).map((service) => (
              <ServiceCard key={service.slug} service={{ id: service.slug, name: service.title, slug: service.slug, description: service.summary, base_price: 99, icon: service.icon, is_active: true }} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-4 max-w-7xl px-4 md:px-6">
          <div className="glass grid rounded-2xl md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.value} {...stat} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-4 max-w-7xl px-4 pb-10 md:px-6">
          <div className="glass grid rounded-2xl lg:grid-cols-3">
            <TestimonialCard name="Jason M." quote="Amazing service. They arrived in minutes and had me back on the road on time." />
            <TestimonialCard name="Sarah L." quote="Professional, friendly, and super convenient. Nomad Auto Services is a lifesaver." />
            <TestimonialCard name="Kevin R." quote="The mechanic knew the issue and fixed my car right on the spot." />
          </div>
        </section>
        </main>
      </PageTransition>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}
