import { BuyServiceForm } from "@/components/buy-service-form";
import { PageHero, PublicPage } from "@/components/public-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Buy Service Online", "Buy fixed-price Nomad Auto Services packages online.", "/buy");

export default function BuyPage() {
  return (
    <PublicPage>
      <main className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
        <PageHero title="Buy service online." body="Choose a package, switch between visitor or customer checkout, enter card details, and continue to the hosted payment step. Customer details stay in your browser for convenience." />
        <BuyServiceForm />
      </main>
    </PublicPage>
  );
}
