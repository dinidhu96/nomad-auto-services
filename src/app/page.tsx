import { CalendarCheck, Phone, Star } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { BookingWidget } from "@/components/booking-widget";
import { ServiceCard, StatCard, TestimonialCard } from "@/components/cards";
import { MascotHero } from "@/components/mascot-hero";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { ButtonLink } from "@/components/ui/button";
import { services } from "@/lib/constants";

const stats = [
  { icon: "Clock3", value: "24/7 Support", label: "We are here whenever you need us." },
  { icon: "Gauge", value: "15 Min Avg.", label: "Quick help right when you need it." },
  { icon: "ShieldCheck", value: "Certified Techs", label: "Skilled, licensed professionals." },
  { icon: "MapPin", value: "Islandwide", label: "Coverage wherever drivers need help." }
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <main className="road-grid overflow-hidden pb-28 lg:pb-0">
        <section className="city-shadow relative mx-auto grid min-h-[720px] max-w-7xl grid-cols-[1.05fr_.95fr] items-center gap-4 px-4 py-8 md:px-6 lg:grid-cols-[1fr_.9fr_.78fr] lg:gap-8 lg:py-12">
          <div className="relative z-10 pt-4 lg:pt-0">
            <h1 className="max-w-2xl text-4xl font-black leading-[.96] tracking-normal sm:text-5xl md:text-6xl lg:text-7xl">
              No roadside?
              <br />
              No problem.
              <br />
              <span className="text-[#F8B000]">Nomad</span> is on the way.
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#C9D6F5] md:text-lg md:leading-8">
              Fast, friendly, and professional mobile auto services delivered to you. From jump starts and tire changes to emergency fuel and on-site repairs, we have you covered, anytime, anywhere.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
              <ButtonLink href="/book" className="text-base">
                <Phone className="h-5 w-5" /> Get Help Now
              </ButtonLink>
              <ButtonLink href="/book" variant="secondary" className="text-base">
                <CalendarCheck className="h-5 w-5" /> Book Service
              </ButtonLink>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F8B000] text-[#001240]">
                <Star className="h-7 w-7 fill-current" />
              </span>
              <div>
                <p className="font-black">4.9/5 Star Rated</p>
                <p className="text-sm text-[#C9D6F5]">Trusted by 1,000+ drivers</p>
              </div>
            </div>
          </div>
          <MascotHero className="-mb-10 max-h-[390px] overflow-hidden md:max-h-none lg:-mb-24" mobile />
          <div className="relative z-10 hidden lg:block">
            <Suspense fallback={null}>
              <BookingWidget compact />
            </Suspense>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
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
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="hidden border-t border-white/10 bg-[#001240] lg:block">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <Image src="/assets/logo-horizontal-crop.jpeg" alt="Nomad Auto Services" width={178} height={72} className="h-16 w-auto" />
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#C9D6F5]">No roadside? No problem. Nomad is on the way.</p>
        </div>
        <FooterList title="Services" items={["Battery Jump Start", "Tire Replacement", "Fuel Delivery", "On-site Mechanic"]} />
        <FooterList title="Company" items={["About Us", "Our Process", "Pricing", "Careers"]} />
        <FooterList title="Support" items={["FAQ", "Contact Us", "Terms of Service", "Privacy Policy"]} />
      </div>
      <p className="pb-5 text-center text-xs text-[#8FA4D4]">© 2026 Nomad Auto Services. All rights reserved.</p>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-[#C9D6F5]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
