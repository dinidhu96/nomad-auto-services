import { PlateLookupForm } from "@/components/plate-lookup-form";
import { PageHero, PublicPage } from "@/components/public-page";

export const metadata = { title: "Rego Check", description: "Check vehicle registration status through a server-side provider proxy." };

export default function RegoCheckPage() {
  return (
    <PublicPage>
      <main className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
        <PageHero title="Rego check." body="Enter an Australian plate and state. The API key stays server-side and the result is shown only at runtime." />
        <PlateLookupForm mode="rego" />
      </main>
    </PublicPage>
  );
}
