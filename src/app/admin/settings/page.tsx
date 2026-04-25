import { AdminAppShell } from "@/components/app-shells";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { requireRole } from "@/lib/auth";
import { brand } from "@/lib/constants";

export const metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const profile = await requireRole(["admin"]);
  return (
    <AdminAppShell profile={profile}>
      <section className="glass max-w-2xl rounded-2xl p-6">
        <h1 className="text-4xl font-black">Settings</h1>
        <div className="mt-6 grid gap-4">
          <Field label="Business phone"><Input defaultValue={brand.phone} /></Field>
          <Field label="Business email"><Input defaultValue={brand.email} /></Field>
          <Field label="SMS gateway"><Input placeholder="Twilio, MessageBird, or local provider" /></Field>
          <Button>Save settings</Button>
        </div>
      </section>
    </AdminAppShell>
  );
}
