import { BadgePercent, Gift, Hash, Mail, MessageCircle, Phone, Repeat2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { business, serviceContent, siteContent } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#001240] pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
        <div className="lg:col-span-2">
          <Image src="/assets/logo-horizontal-crop.jpeg" alt={business.name} width={320} height={112} className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#C9D6F5]">{business.slogan}</p>
          <div className="mt-5 grid gap-2 text-sm text-[#C9D6F5]">
            <a href={business.phoneLink} className="flex items-center gap-2 hover:text-[#FFC526]"><Phone className="h-4 w-4" /> {business.phone}</a>
            <a href={business.emailLink} className="flex items-center gap-2 hover:text-[#FFC526]"><Mail className="h-4 w-4" /> {business.email}</a>
            <p>MRB: {business.mrb}</p>
            <p>{business.partnerLabel}: <span className="font-black text-[#FFC526]">{business.partnerName}</span></p>
          </div>
        </div>
        <FooterList title="Navigation" items={siteContent.navigation} />
        <FooterList title="Services" items={serviceContent.map((service) => ({ label: service.title, href: `/services/${service.slug}` })).slice(0, 8)} />
        <div className="grid gap-5">
          <div>
            <h3 className="font-black">Connect</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={business.facebook} className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-sm font-black text-[#C9D6F5] hover:text-[#FFC526]" aria-label="Facebook">f</a>
              <a href={business.whatsapp} className="grid h-11 w-11 place-items-center rounded-xl bg-[#27C46B]/20 text-[#8EF3B8]" aria-label="WhatsApp"><MessageCircle className="h-5 w-5" /></a>
              <a href="/contact" className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[#FFC526]" aria-label="Contact">
                <Hash className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black">Redeem items</h3>
            <div className="mt-3 grid gap-2">
              {[
                { icon: Gift, label: "Loyalty offers" },
                { icon: BadgePercent, label: "Service deals" },
                { icon: Sparkles, label: "Seasonal check-ups" },
                { icon: Repeat2, label: "Fleet repeat bookings" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-sm text-[#C9D6F5]">
                    <Icon className="h-4 w-4 text-[#FFC526]" /> {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-black">Hashtags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["#NomadAutoServices", "#RoadsideHelp", "#MobileMechanic", "#PerthDrivers"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-bold text-[#C9D6F5]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black">Payment Methods</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#001240]">
              {siteContent.paymentMethods.map((method) => (
                <span key={method} className="rounded-md bg-white px-2 py-1">{method}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-[#8FA4D4]">© 2026 {business.name}. All rights reserved.</p>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-[#C9D6F5]">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-[#FFC526]">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
