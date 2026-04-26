import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { SiteFooter } from "@/components/site-footer";
import { business } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <div className="page-enter">{children}</div>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}

export function PageHero({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-16">
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[.18em] text-[#FFC526]">Nomad Auto Services</p>
        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#C9D6F5]">{body}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={business.phoneLink}><Phone className="h-4 w-4" /> Call {business.phone}</ButtonLink>
          <ButtonLink href={business.whatsapp} variant="secondary"><MessageCircle className="h-4 w-4" /> WhatsApp</ButtonLink>
        </div>
      </div>
    </section>
  );
}
