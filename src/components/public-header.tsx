import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import { brand } from "@/lib/constants";
import { BrandLogo } from "@/components/brand-logo";
import { ButtonLink } from "@/components/ui/button";

const nav = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Book Now", "/book"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 hidden border-b border-white/10 bg-[#001240]/78 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <BrandLogo />
        <nav className="flex items-center gap-8 text-sm font-semibold text-[#C9D6F5]">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[#FFC526]">
              {label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/book" className="px-5">
          <Phone className="h-4 w-4" /> Get Help Now
        </ButtonLink>
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
        <a
          aria-label={`Call Nomad Auto Services ${brand.phone}`}
          href={`tel:${brand.phone}`}
          className="grid h-11 w-11 place-items-center rounded-xl bg-[#F8B000] text-[#1D1D1D]"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
