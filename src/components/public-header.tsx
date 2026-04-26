import { Menu, Phone, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/ui/button";
import { business, serviceContent, siteContent } from "@/lib/site";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-white/10 bg-[#001240]/78 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <BrandLogo />
        <nav className="flex items-center gap-8 text-sm font-semibold text-[#C9D6F5]">
          {siteContent.navigation.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:text-[#FFC526]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/customer/profile" variant="secondary" className="px-4">
            <User className="h-4 w-4" /> Profile
          </ButtonLink>
          <ButtonLink href={business.phoneLink} className="px-5">
            <Phone className="h-4 w-4" /> {business.phone}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

export function MobileAppHeader() {
  return (
    <header className="safe-top sticky top-0 z-50 border-b border-white/10 bg-[#001240]/88 px-4 pb-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between">
        <button aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-xl text-white">
          <Menu className="h-7 w-7" />
        </button>
        <BrandLogo className="scale-90" />
        <a aria-label={`Call ${business.name} ${business.phone}`} href={business.phoneLink} className="grid h-11 w-11 place-items-center rounded-xl bg-[#F8B000] text-[#1D1D1D]">
          <Phone className="h-5 w-5" />
        </a>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-xs font-bold text-[#C9D6F5]">
        <Link className="rounded-full bg-white/10 px-3 py-2" href="/book">Book Now</Link>
        <a className="rounded-full bg-[#27C46B]/20 px-3 py-2 text-[#8EF3B8]" href={business.whatsapp}>
          <MessageCircle className="mr-1 inline h-3 w-3" /> WhatsApp
        </a>
        <details className="relative rounded-full bg-white/10 px-3 py-2">
          <summary className="cursor-pointer list-none">Services</summary>
          <div className="absolute left-0 top-9 z-50 grid w-64 gap-1 rounded-xl border border-white/10 bg-[#001240] p-2 shadow-xl">
            {serviceContent.slice(0, 5).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-lg px-3 py-2 hover:bg-white/10">
                {service.title}
              </Link>
            ))}
          </div>
        </details>
        <Link className="rounded-full bg-white/10 px-3 py-2" href="/customer/profile">Profile</Link>
      </div>
    </header>
  );
}
