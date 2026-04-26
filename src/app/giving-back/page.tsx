import { PageHero, PublicPage } from "@/components/public-page";

export const metadata = { title: "Giving Back", description: "How Nomad Auto Services supports drivers and local community initiatives." };

export default function GivingBackPage() {
  return (
    <PublicPage>
      <main className="pb-28">
        <PageHero title="Giving back to the road community." body="Nomad is building a service brand that helps drivers stay safe, informed, and supported when car trouble interrupts the day." />
        <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3 md:px-6">
          {["Driver safety", "Local partnerships", "Fleet readiness"].map((title) => (
            <article key={title} className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-[#C9D6F5]">This section is ready for real community stories, workshop partners, and customer support programs as Nomad grows.</p>
            </article>
          ))}
        </section>
      </main>
    </PublicPage>
  );
}
