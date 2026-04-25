import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  compact = false,
  className
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Nomad Auto Services home">
      <Image
        src={compact ? "/assets/logo-mark-crop.jpeg" : "/assets/logo-horizontal-crop.jpeg"}
        alt="Nomad Auto Services logo"
        width={compact ? 44 : 178}
        height={compact ? 44 : 72}
        className={cn("object-contain", compact ? "h-11 w-11 rounded-full" : "h-12 w-auto")}
        priority
      />
    </Link>
  );
}
