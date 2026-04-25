import { AdminAuthCard } from "@/components/auth-card";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full">
        <BrandLogo className="mx-auto mb-8 justify-center" />
        <AdminAuthCard />
      </div>
    </main>
  );
}
