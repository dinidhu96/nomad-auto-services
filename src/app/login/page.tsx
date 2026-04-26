import { RoleSelectionCard } from "@/components/auth-card";
import { BrandLogo } from "@/components/brand-logo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Login", "Choose customer login or company login for Nomad Auto Services.", "/login");

export default function LoginPage() {
  return (
    <main className="road-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full">
        <BrandLogo compact className="mx-auto mb-8 justify-center" />
        <RoleSelectionCard />
      </div>
    </main>
  );
}
