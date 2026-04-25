import { Suspense } from "react";
import { CustomerOtpCard } from "@/components/auth-card";
import { BrandLogo } from "@/components/brand-logo";

export const metadata = { title: "Customer Register" };

export default function CustomerRegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full">
        <BrandLogo className="mx-auto mb-8 justify-center" />
        <Suspense fallback={null}>
          <CustomerOtpCard mode="register" />
        </Suspense>
      </div>
    </main>
  );
}
