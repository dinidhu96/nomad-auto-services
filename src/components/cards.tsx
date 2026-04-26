import { ArrowUpRight, ChevronRight, Star } from "lucide-react";
import { ServiceIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import type { PricingPlan, Service } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="glass rounded-2xl p-4 transition hover:-translate-y-1 hover:border-[#FFC526]/50 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <ServiceIcon name={service.icon} className="h-11 w-11 shrink-0 text-[#F8B000] sm:h-12 sm:w-12" />
        <ButtonLink href={`/services/${service.slug}`} variant="ghost" className="min-h-9 px-2 text-[#FFC526]">
          Details <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </div>
      <h3 className="mt-4 text-lg font-black text-white sm:text-xl">{service.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[#C9D6F5] sm:min-h-12">{service.description}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-bold text-[#FFC526]">From {formatMoney(service.base_price)}</span>
        <ButtonLink href={`/book?service=${service.slug}`} className="min-h-9 w-full px-3 sm:w-auto">
          Book <ChevronRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}

export function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-3 border-white/10 p-4 text-left lg:flex-row lg:items-center lg:gap-4 lg:border-r last:border-r-0">
      <ServiceIcon name={icon} className="h-11 w-11 shrink-0 text-[#F8B000]" />
      <div>
        <div className="text-xl font-black">{value}</div>
        <div className="text-sm text-[#C9D6F5]">{label}</div>
      </div>
    </div>
  );
}

export function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <article className="flex flex-col gap-3 border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:gap-4 lg:border-r last:border-r-0">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#FFC526] text-lg font-black text-[#001240] sm:h-16 sm:w-16 sm:text-xl">
        {name[0]}
      </div>
      <div>
        <p className="text-sm leading-6 text-white">&quot;{quote}&quot;</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-[#FFC526]">
          - {name}
          <span className="flex">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</span>
        </div>
      </div>
    </article>
  );
}

export function PricingCard({ plan, highlighted = false }: { plan: PricingPlan; highlighted?: boolean }) {
  return (
    <article className={`glass rounded-2xl p-5 sm:p-6 ${highlighted ? "border-[#FFC526]/80 shadow-[0_0_0_1px_rgba(248,176,0,.4)]" : ""}`}>
      <h3 className="text-xl font-black sm:text-2xl">{plan.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[#C9D6F5] sm:min-h-12">{plan.description}</p>
      <div className="mt-6 flex items-end gap-1">
        <span className="text-3xl font-black text-[#FFC526] sm:text-4xl">{formatMoney(plan.price)}</span>
        <span className="pb-1 text-[#8FA4D4]">/ mo</span>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-[#C9D6F5]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#27C46B]" />
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink href="/book" className="mt-6 w-full">
        Choose Plan
      </ButtonLink>
    </article>
  );
}
