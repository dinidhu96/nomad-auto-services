"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { siteContent } from "@/lib/site";

export function DesktopRouteTabs() {
  const pathname = usePathname();
  const tabs = useMemo(() => siteContent.navigation, []);
  const activeIndex = Math.max(
    0,
    tabs.findIndex(({ href }) => pathname === href || pathname.startsWith(`${href}/`))
  );

  return (
    <nav className="relative mx-auto hidden min-w-0 flex-1 items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl lg:flex">
      <span
        className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-[#F8B000] shadow-[0_10px_30px_rgba(248,176,0,.28)] transition-transform duration-300 ease-out"
        style={{ width: `calc((100% - 0.5rem) / ${tabs.length})`, transform: `translateX(${activeIndex * 100}%)` }}
      />
      <div className="relative z-10 grid w-full grid-cols-6 gap-0">
        {tabs.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-full px-3 py-2 text-center text-sm font-semibold transition-colors duration-300",
                active ? "text-[#001240]" : "text-[#C9D6F5] hover:text-white"
              )}
            >
              <span className="block truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
