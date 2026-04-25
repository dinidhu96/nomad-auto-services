import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#FFC526] focus:ring-offset-2 focus:ring-offset-[#001240] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#F8B000] text-[#1D1D1D] shadow-[0_12px_30px_rgba(248,176,0,.28)] hover:bg-[#FFC526]",
        variant === "secondary" && "border border-white/20 bg-white/8 text-white hover:bg-white/12",
        variant === "ghost" && "bg-transparent text-[#C9D6F5] hover:bg-white/10",
        variant === "danger" && "bg-[#FF4D4D] text-white hover:bg-red-500",
        className
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#FFC526] focus:ring-offset-2 focus:ring-offset-[#001240]",
        variant === "primary" && "bg-[#F8B000] text-[#1D1D1D] shadow-[0_12px_30px_rgba(248,176,0,.28)] hover:bg-[#FFC526]",
        variant === "secondary" && "border border-white/20 bg-white/8 text-white hover:bg-white/12",
        variant === "ghost" && "bg-transparent text-[#C9D6F5] hover:bg-white/10",
        variant === "danger" && "bg-[#FF4D4D] text-white hover:bg-red-500",
        className
      )}
    >
      {children}
    </Link>
  );
}
