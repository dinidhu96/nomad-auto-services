"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClientBrowser, hasSupabaseEnv } from "@/lib/supabase";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function CustomerOtpCard({ mode = "login" }: { mode?: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/customer/dashboard";
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  async function sendOtp() {
    const response = await fetch("/api/demo-otp/start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone, fullName })
    });
    setSent(response.ok);
    setMessage(response.ok ? "Demo OTP sent. Use 123456." : "Enter a valid phone number.");
  }

  async function verifyOtp() {
    const response = await fetch("/api/demo-otp/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone, otp, fullName })
    });
    if (response.ok) router.push(returnTo);
    else setMessage("The demo OTP is 123456.");
  }

  return (
    <div className="glass mx-auto w-full max-w-md rounded-2xl p-6">
      <h1 className="text-3xl font-black">{mode === "register" ? "Create customer account" : "Customer login"}</h1>
      <p className="mt-2 text-sm leading-6 text-[#C9D6F5]">Enter your mobile number. The MVP uses simulated OTP for fast testing.</p>
      <div className="mt-6 grid gap-4">
        {mode === "register" && (
          <Field label="Full name">
            <Input value={fullName} onChange={(event) => setFullName(event.target.value)} required placeholder="Customer name" />
          </Field>
        )}
        <Field label="Mobile number" icon={<Phone className="h-4 w-4 text-[#FFC526]" />}>
          <Input value={phone} onChange={(event) => setPhone(event.target.value)} required placeholder="+1 876 555 0101" />
        </Field>
        {sent && (
          <Field label="Demo OTP">
            <Input value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" placeholder="123456" />
          </Field>
        )}
        <Button type="button" onClick={sent ? verifyOtp : sendOtp}>
          {sent ? "Verify OTP" : "Send OTP"} <ArrowRight className="h-4 w-4" />
        </Button>
        {message && <p className="text-sm font-semibold text-[#FFC526]">{message}</p>}
        <ButtonLink href="/admin/login" variant="secondary">Company login</ButtonLink>
      </div>
    </div>
  );
}

export function AdminAuthCard({ mode = "login" }: { mode?: "login" | "register" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setMessage("");
    try {
      if (!hasSupabaseEnv()) {
        setMessage("Supabase env vars are missing. Add them to use real admin auth.");
        return;
      }
      const supabase = createClientBrowser();
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      const fullName = String(formData.get("fullName") || "");
      const result =
        mode === "register"
          ? await supabase.auth.signUp({
              email,
              password,
              options: { data: { full_name: fullName, role: "admin" }, emailRedirectTo: `${location.origin}/admin/dashboard` }
            })
          : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) setMessage(result.error.message);
      else router.push("/admin/dashboard");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form action={submit} className="glass mx-auto grid w-full max-w-md gap-4 rounded-2xl p-6">
      <h1 className="text-3xl font-black">{mode === "register" ? "Register admin" : "Admin login"}</h1>
      {mode === "register" && (
        <Field label="Full name">
          <Input name="fullName" required placeholder="Team member name" />
        </Field>
      )}
      <Field label="Email" icon={<Mail className="h-4 w-4 text-[#FFC526]" />}>
        <Input name="email" type="email" required placeholder="admin@nomad.test" />
      </Field>
      <Field label="Password">
        <Input name="password" type="password" required minLength={8} />
      </Field>
      <Button disabled={busy}>{busy ? "Signing in..." : mode === "register" ? "Create account" : "Sign in"}</Button>
      <Button type="button" variant="secondary" disabled>
        Continue with Google
      </Button>
      {message && <p className="text-sm font-semibold text-[#FFC526]">{message}</p>}
      <ButtonLink href="/customer/login" variant="ghost">Customer login</ButtonLink>
    </form>
  );
}

export function RoleSelectionCard() {
  return (
    <div className="mx-auto grid w-full max-w-2xl gap-4 md:grid-cols-2">
      <ButtonLink href="/customer/login" className="min-h-28 flex-col text-lg">
        <Phone className="h-7 w-7" /> Customer Login
      </ButtonLink>
      <ButtonLink href="/admin/login" variant="secondary" className="min-h-28 flex-col text-lg">
        <Mail className="h-7 w-7" /> Company Login
      </ButtonLink>
    </div>
  );
}
