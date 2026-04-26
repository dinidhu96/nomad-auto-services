import Link from "next/link";
import { PageHero, PublicPage } from "@/components/public-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Mock Payment Gateway", description: "Simulated payment gateway for Nomad Auto Services checkout." };

export default async function MockGatewayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => String(params[key] || "");
  return (
    <PublicPage>
      <main className="mx-auto max-w-4xl px-4 pb-28 md:px-6">
        <PageHero title="Mock payment gateway." body="This screen simulates hosted checkout until a real payment gateway is configured." />
        <section className="glass rounded-2xl p-6">
          <dl className="grid gap-3 text-sm text-[#C9D6F5] md:grid-cols-2">
            {["reference", "product_name", "amount", "currency", "quantity", "customer_name", "customer_email", "customer_mobile"].map((key) => (
              <div key={key}><dt className="font-bold text-white">{key.replaceAll("_", " ")}</dt><dd>{get(key) || "-"}</dd></div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={get("return_url") || "/buy?payment=success"}>Simulate Success</ButtonLink>
            <Link href={get("cancel_url") || "/buy?payment=cancelled"} className="inline-flex min-h-11 items-center rounded-xl border border-white/20 px-5 py-3 font-bold text-white">Cancel</Link>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
