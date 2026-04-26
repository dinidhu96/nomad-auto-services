import { PlateLookupForm } from "@/components/plate-lookup-form";
import { PageHero, PublicPage } from "@/components/public-page";
import { business } from "@/lib/site";

export const metadata = { title: "Lube Guide", description: "Find lubricant recommendations by registration with Nomad and SPRINT LUBRICANTS." };

export default function LubeGuidePage() {
  return (
    <PublicPage>
      <main className="mx-auto max-w-7xl px-4 pb-28 md:px-6">
        <PageHero title="Lube guide by rego." body={`${business.partnerLabel}: ${business.partnerName}. Enter plate and state to load lubricant recommendations.`} />
        <PlateLookupForm mode="lube" />
      </main>
    </PublicPage>
  );
}
