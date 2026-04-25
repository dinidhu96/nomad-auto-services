import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  icon,
  children
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#C9D6F5]">
      <span className="flex items-center gap-2">{icon}{label}</span>
      {children}
    </label>
  );
}

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "min-h-12 w-full rounded-xl border border-white/15 bg-[#001240]/70 px-4 text-white outline-none placeholder:text-[#8FA4D4] focus:border-[#FFC526]",
        props.className
      )}
    />
  );
}

export function Select(props: ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-12 w-full rounded-xl border border-white/15 bg-[#001240]/70 px-4 text-white outline-none focus:border-[#FFC526]",
        props.className
      )}
    />
  );
}

export function Textarea(props: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-white/15 bg-[#001240]/70 px-4 py-3 text-white outline-none placeholder:text-[#8FA4D4] focus:border-[#FFC526]",
        props.className
      )}
    />
  );
}
