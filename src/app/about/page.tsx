import { CheckCircle2 } from "lucide-react";
import { MascotHero } from "@/components/mascot-hero";
import { PublicPage } from "@/components/public-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("About", "Nomad Auto Services delivers fast, friendly mobile roadside assistance and automotive support for Australian drivers.", "/about");

const points = ["MRB registered", "Perth and WA mobile support", "No payment required upfront", "Friendly dispatch support"];

export default function AboutPage() {
  return (
    <PublicPage>
      <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-10 pb-28 md:px-6 lg:grid-cols-[1fr_.8fr]">
        <section>
          <h1 className="text-4xl font-black md:text-6xl">Fast, friendly mobile roadside assistance.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#C9D6F5]">
            Nomad Auto Services delivers fast, friendly mobile roadside assistance wherever drivers need help.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {["Our mission", "Why drivers trust us", "Certified technicians", "Mobile coverage"].map((title) => (
              <article key={title} className="glass rounded-2xl p-5">
                <h2 className="text-xl font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">We combine clear communication, prepared technicians, and mobile-first booking so help gets moving quickly.</p>
              </article>
            ))}
          </div>
          <ul className="mt-8 grid gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="h-5 w-5 text-[#27C46B]" /> {point}
              </li>
            ))}
          </ul>
        </section>
        <MascotHero />
      </main>
    </PublicPage>
  );
}
