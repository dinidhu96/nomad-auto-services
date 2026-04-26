"use client";

import { CalendarCheck, Home, Phone, Tags, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Book Now", href: "/book", icon: CalendarCheck, center: true },
  { label: "Pricing", href: "/pricing", icon: Tags },
  { label: "Contact", href: "/contact", icon: Phone }
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#001240]/92 px-2 pt-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold",
                active ? "text-[#FFC526]" : "text-[#8FA4D4]",
                item.center && "-mt-8"
              )}
            >
              <span
                className={cn(
                  "grid place-items-center",
                  item.center ? "h-16 w-16 rounded-full bg-[#F8B000] text-[#1D1D1D] shadow-lg" : "h-7 w-7"
                )}
              >
                <Icon className={item.center ? "h-7 w-7" : "h-6 w-6"} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
