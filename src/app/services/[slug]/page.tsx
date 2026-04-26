import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { ServiceCard } from "@/components/cards";
import { PageHero, PublicPage } from "@/components/public-page";
import { ButtonLink } from "@/components/ui/button";
import { business, findService, serviceContent } from "@/lib/site";
import servicePages from "@/content/service-pages.json";

export async function generateStaticParams() {
  return serviceContent.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  return {
    title: service?.title || "Service",
    description: service?.summary,
    alternates: { canonical: `/services/${slug}` }
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  const page = servicePages.find((entry) => entry.slug === slug);
  const detail = service as (typeof serviceContent)[number] & {
    ideal_for?: string;
    what_you_get?: string[];
    sample_jobs?: string[];
    common_signs?: string[];
  };
  const whatYouGet = detail.what_you_get || [];
  const sampleJobs = detail.sample_jobs || [];
  const commonSigns = detail.common_signs || [];

  return (
    <PublicPage>
      <main className="pb-28">
        <PageHero title={service.title} body={service.description} />
        <section className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-[1.1fr_.9fr] md:px-6">
          <article className="grid gap-5">
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-black uppercase tracking-[.18em] text-[#FFC526]">Service overview</p>
              <h2 className="mt-2 text-3xl font-black">{service.title}</h2>
              <p className="mt-3 max-w-3xl text-[#C9D6F5]">{detail.ideal_for || service.summary}</p>
              {page?.intro && <p className="mt-4 max-w-4xl text-sm leading-7 text-[#C9D6F5]">{page.intro}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/8 p-4">
                  <div className="flex items-center gap-2 font-black text-white"><ShieldCheck className="h-4 w-4 text-[#FFC526]" /> Mobile support</div>
                  <p className="mt-2 text-sm text-[#C9D6F5]">On-site service at home, work, or roadside when the job can be done safely without towing.</p>
                </div>
                <div className="rounded-xl bg-white/8 p-4">
                  <div className="flex items-center gap-2 font-black text-white"><CalendarClock className="h-4 w-4 text-[#FFC526]" /> Clear booking flow</div>
                  <p className="mt-2 text-sm text-[#C9D6F5]">Call, WhatsApp, or book online. We keep the next step obvious on desktop and mobile.</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-black">What this service covers</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {whatYouGet.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/8 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#27C46B]" />
                    <p className="text-sm leading-6 text-[#C9D6F5]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {page?.sections?.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {page.sections.map((section) => (
                  <article key={section.title} className="glass rounded-2xl p-6">
                    <h3 className="text-2xl font-black">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#C9D6F5]">{section.body}</p>
                  </article>
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <article className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-black">Sample jobs</h3>
                <div className="mt-4 grid gap-3">
                  {sampleJobs.map((job) => (
                    <div key={job} className="rounded-xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-[#C9D6F5]">{job}</div>
                  ))}
                </div>
              </article>
              <article className="glass rounded-2xl p-6">
                <h3 className="text-2xl font-black">When to book</h3>
                <div className="mt-4 grid gap-3">
                  {commonSigns.map((sign) => (
                    <div key={sign} className="rounded-xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-[#C9D6F5]">{sign}</div>
                  ))}
                </div>
              </article>
            </div>
          </article>

          <article className="grid gap-5">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-black">How booking works</h3>
              <div className="mt-4 grid gap-3">
                {[
                  "Choose the service or call Nomad directly",
                  "Share the vehicle, location, and issue details",
                  "Book a time or request immediate assistance",
                  "Get a clear response and next-step guidance"
                ].map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-xl border border-white/10 bg-white/8 p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFC526] text-sm font-black text-[#001240]">{index + 1}</span>
                    <p className="text-sm leading-6 text-[#C9D6F5]">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/book"><Sparkles className="h-4 w-4" /> Book this service</ButtonLink>
                <ButtonLink href={business.phoneLink} variant="secondary"><Phone className="h-4 w-4" /> Call {business.phone}</ButtonLink>
              </div>
            </div>

            <article className="glass rounded-2xl p-6">
              <h3 className="text-2xl font-black">Related services</h3>
              <div className="mt-5 grid gap-4">
                {serviceContent.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => (
                  <ServiceCard key={item.slug} service={{ id: item.slug, name: item.title, slug: item.slug, description: item.summary, base_price: 99, icon: item.icon, is_active: true }} />
                ))}
              </div>
            </article>
          </article>
        </section>
      </main>
    </PublicPage>
  );
}
