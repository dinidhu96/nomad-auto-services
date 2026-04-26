import { Suspense } from "react";
import { CustomerOtpCard } from "@/components/auth-card";
import { BrandLogo } from "@/components/brand-logo";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Customer Login", "Customer mobile OTP login for Nomad Auto Services.", "/customer/login");

export default function CustomerLoginPage() {
  return (
    <main className="road-grid grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full">
        <BrandLogo compact className="mx-auto mb-8 justify-center" />
        <Suspense fallback={null}>
          <div className="page-enter">
            <CustomerOtpCard />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
