import Image from "next/image";
import { cn } from "@/lib/utils";

export function MascotHero({ className, mobile = false }: { className?: string; mobile?: boolean }) {
  return (
    <div className={cn("relative z-10", className)}>
      <div className="absolute inset-x-10 bottom-4 h-16 rounded-full bg-black/40 blur-2xl" />
      <Image
        src={mobile ? "/assets/mascot-right-crop.jpeg" : "/assets/mascot-right-crop.jpeg"}
        alt="Nomad kangaroo mechanic giving thumbs up"
        width={760}
        height={1040}
        priority
        className="floaty relative mx-auto h-auto max-h-[560px] w-full max-w-[430px] object-contain mix-blend-screen drop-shadow-[0_30px_50px_rgba(0,0,0,.45)]"
      />
    </div>
  );
}
