import { AdminAuthCard } from "@/components/auth-card";
import { BrandLogo } from "@/components/brand-logo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Admin Register", "Create a company account for Nomad Auto Services.", "/admin/register");

export default function AdminRegisterPage() {
  return (
    <main className="road-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full">
        <BrandLogo compact className="mx-auto mb-8 justify-center" />
        <div className="page-enter">
          <AdminAuthCard mode="register" />
        </div>
      </div>
    </main>
  );
}
