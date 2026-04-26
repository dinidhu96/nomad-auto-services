"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function submit(formData: FormData) {
    setState("saving");
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "content-type": "application/json" }
    });
    setState(response.ok ? "saved" : "error");
  }

  return (
    <form action={submit} className="glass grid gap-4 rounded-2xl p-6">
      <Field label="Name">
        <Input name="name" required placeholder="Your name" />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email">
          <Input name="email" type="email" required placeholder="you@example.com" />
        </Field>
        <Field label="Mobile">
          <Input name="mobile" required placeholder="0456 616 256" />
        </Field>
      </div>
      <Field label="Message">
        <Textarea name="message" required minLength={10} placeholder="How can Nomad help?" />
      </Field>
      <Button disabled={state === "saving"}>
        <Send className="h-4 w-4" /> {state === "saving" ? "Sending..." : "Send Message"}
      </Button>
      {state === "saved" && <p className="text-sm font-semibold text-[#8EF3B8]">Message saved. Our dispatcher will follow up.</p>}
      {state === "error" && <p className="text-sm font-semibold text-[#FFB3B3]">Unable to save right now. Please call the support line.</p>}
    </form>
  );
}
