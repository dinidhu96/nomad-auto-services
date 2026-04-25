import { CalendarCheck, LayoutDashboard, MessageSquare, Settings, Users, Wrench } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import type { Profile } from "@/lib/types";

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Technicians", href: "/admin/technicians", icon: Users },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export function CustomerAppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  return (
    <main className="min-h-screen pb-28 lg:pb-10">
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <header className="mb-6 flex items-center justify-between">
          <BrandLogo />
          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-[#C9D6F5]">
            {profile.full_name || "Driver"}
          </div>
        </header>
        {children}
      </div>
      <MobileBottomNav />
    </main>
  );
}

export function AdminAppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-white/10 bg-[#001240]/80 p-6 lg:block">
        <BrandLogo />
        <nav className="mt-10 grid gap-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#C9D6F5] hover:bg-white/10 hover:text-white">
                <Icon className="h-5 w-5 text-[#FFC526]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#001240]/78 px-4 py-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center justify-between">
            <BrandLogo className="lg:hidden" />
            <div className="hidden lg:block">
              <p className="text-sm text-[#8FA4D4]">Operations console</p>
              <h1 className="text-xl font-black">Nomad Dispatch</h1>
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-[#C9D6F5]">
              {profile.full_name || profile.email || "Admin"}
            </div>
          </div>
        </header>
        <div className="px-4 py-6 lg:px-8">{children}</div>
      </section>
    </main>
  );
}
