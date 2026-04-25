import { LifeBuoy, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { MobileAppHeader, PublicHeader } from "@/components/public-header";
import { ButtonLink } from "@/components/ui/button";
import { brand } from "@/lib/constants";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PublicHeader />
      <MobileAppHeader />
      <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-10 pb-28 md:px-6 lg:grid-cols-[.8fr_1fr]">
        <section>
          <h1 className="text-4xl font-black md:text-6xl">Talk to Nomad support.</h1>
          <p className="mt-4 text-[#C9D6F5]">Send a message, call the dispatch line, or use the booking flow for immediate roadside help.</p>
          <div className="mt-8 grid gap-4">
            <ButtonLink href={`tel:${brand.phone}`}><Phone className="h-5 w-5" /> {brand.phone}</ButtonLink>
            <div className="glass rounded-2xl p-5">
              <Mail className="h-8 w-8 text-[#FFC526]" />
              <p className="mt-2 font-bold">{brand.email}</p>
            </div>
            <div className="glass rounded-2xl p-5">
              <LifeBuoy className="h-8 w-8 text-[#FFC526]" />
              <h2 className="mt-2 text-xl font-black">24/7 support</h2>
              <p className="mt-1 text-sm text-[#C9D6F5]">Emergency requests are prioritized through the booking and dispatch workflow.</p>
            </div>
          </div>
        </section>
        <section>
          <ContactForm />
          <div className="mt-6 grid gap-3">
            {["How fast can a technician arrive?", "Do I pay upfront?", "Can Nomad help outside city centers?"].map((question) => (
              <details key={question} className="glass rounded-xl p-4">
                <summary className="cursor-pointer font-bold">{question}</summary>
                <p className="mt-2 text-sm text-[#C9D6F5]">Our team confirms the details first. ETAs and final pricing depend on location, vehicle, and issue severity.</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
