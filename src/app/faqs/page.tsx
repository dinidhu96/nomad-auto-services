import { PageHero, PublicPage } from "@/components/public-page";
import { faqContent } from "@/lib/site";

export const metadata = { title: "FAQs", description: "Frequently asked questions about Nomad Auto Services." };

export default function FaqsPage() {
  return (
    <PublicPage>
      <main className="pb-28">
        <PageHero title="FAQs" body="Straight answers about mobile servicing, roadside support, pricing, and booking with Nomad." />
        <section className="mx-auto grid max-w-4xl gap-4 px-4 md:px-6">
          {faqContent.map((item) => (
            <details key={item.question} className="glass rounded-2xl p-5">
              <summary className="cursor-pointer text-lg font-black">{item.question}</summary>
              <p className="mt-3 leading-7 text-[#C9D6F5]">{item.answer}</p>
            </details>
          ))}
        </section>
      </main>
    </PublicPage>
  );
}
