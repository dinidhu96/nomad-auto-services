import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { business } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <PageTransition>{children}</PageTransition>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}

export function PageHero({ title, body }: { title: string; body: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-16">
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[.18em] text-[#FFC526]">Nomad Auto Services</p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#C9D6F5] sm:text-lg sm:leading-8">{body}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.phoneLink} className="w-full sm:w-auto">
            <Phone className="h-4 w-4" /> Call {business.phone}
          </ButtonLink>
          <ButtonLink href={business.whatsapp} variant="secondary" className="w-full sm:w-auto">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
