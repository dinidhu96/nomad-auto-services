import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PublicPage } from "@/components/public-page";
import { ButtonLink } from "@/components/ui/button";
import { business, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Contact", "Contact Nomad Auto Services by phone, WhatsApp, email, or the online contact form.", "/contact");

export default function ContactPage() {
  return (
    <PublicPage>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 pb-28 md:px-6">
        <section className="glass overflow-hidden rounded-2xl">
          <div className="border-b border-white/10 p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Where Nomad is based</p>
            <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl md:text-5xl">Perth, Western Australia</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C9D6F5]">
              Start here to see the service area first. Replace this placeholder pin with the exact street address when you want the map to point at a real base of operations.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden sm:h-[360px] md:h-[460px]">
            <iframe
              title="Nomad Auto Services map"
              src="https://www.google.com/maps?q=Perth%2C%20Western%20Australia%2C%20Australia&output=embed"
              className="absolute inset-0 h-full w-full border-0 opacity-85"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#001240] via-transparent to-transparent" />
            <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-2xl border border-white/10 bg-[#001240]/80 p-4 backdrop-blur-md sm:left-4 sm:top-4 sm:max-w-xs">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#FFC526]">Service area</p>
              <p className="mt-1 text-lg font-black">Perth Metro</p>
              <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Mobile roadside assistance, workshop-style servicing, and dispatch support across the Perth area.</p>
              <ButtonLink href="https://www.google.com/maps/search/?api=1&query=Perth%20Western%20Australia" variant="secondary" className="mt-4 w-full">
                Open Google Maps
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <div className="glass rounded-2xl p-5">
            <Phone className="h-8 w-8 text-[#FFC526]" />
            <p className="mt-3 text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">Call</p>
            <a href={business.phoneLink} className="mt-2 block text-xl font-black hover:text-[#FFC526]">{business.phone}</a>
            <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Direct dispatch line for immediate roadside help.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <MessageCircle className="h-8 w-8 text-[#FFC526]" />
            <p className="mt-3 text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">WhatsApp</p>
            <ButtonLink href={business.whatsapp} variant="secondary" className="mt-3 w-full">WhatsApp Nomad</ButtonLink>
            <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Quick chat for photos, location sharing, and updates.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <Mail className="h-8 w-8 text-[#FFC526]" />
            <p className="mt-3 text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">Email</p>
            <a href={business.emailLink} className="mt-2 block text-base font-black leading-6 break-words hover:text-[#FFC526] sm:text-lg">
              {business.email}
            </a>
            <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Send booking notes or general enquiries by email.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <LifeBuoy className="h-8 w-8 text-[#FFC526]" />
            <p className="mt-3 text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">Support</p>
            <h2 className="mt-2 text-xl font-black">24/7 support</h2>
            <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Emergency requests are prioritized through the booking and dispatch workflow.</p>
            <p className="mt-3 text-sm text-[#8FA4D4]">MRB {business.mrb}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="grid gap-3">
            {["How fast can a technician arrive?", "Do I pay upfront?", "Can Nomad help outside city centers?"].map((question) => (
              <details key={question} className="glass rounded-xl p-4">
                <summary className="cursor-pointer font-bold">{question}</summary>
                <p className="mt-2 text-sm text-[#C9D6F5]">Our team confirms the details first. ETAs and final pricing depend on location, vehicle, and issue severity.</p>
              </details>
            ))}
          </div>
          <div className="grid gap-4">
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Inquiry form</p>
              <h2 className="mt-2 text-2xl font-black">Contact us with your job details</h2>
              <p className="mt-3 text-sm leading-7 text-[#C9D6F5]">Use the form below to request roadside help, servicing, or a callback from the Nomad team.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
