import { AlertTriangle, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="glass flex items-center justify-center gap-3 rounded-2xl p-8 text-[#C9D6F5]">
      <Loader2 className="h-5 w-5 animate-spin text-[#FFC526]" />
      {label}
    </div>
  );
}

export function EmptyState({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <div className={cn("glass rounded-2xl p-8 text-center", className)}>
      <Search className="mx-auto h-10 w-10 text-[#FFC526]" />
      <h3 className="mt-3 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm text-[#C9D6F5]">{body}</p>
    </div>
  );
}

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#FF4D4D]/40 bg-[#FF4D4D]/10 p-6 text-white">
      <AlertTriangle className="h-8 w-8 text-[#FF4D4D]" />
      <h3 className="mt-3 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm text-[#C9D6F5]">{body}</p>
    </div>
  );
}
