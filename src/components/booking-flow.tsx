"use client";

import { ArrowLeft, ArrowRight, CalendarCheck, Car, CheckCircle2, MapPin, Wrench } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

const steps = ["Service", "Vehicle", "Location", "Schedule", "Confirm"];

export function BookingFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const initialService = params.get("service") || services[0].slug;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceId: services.find((service) => service.slug === initialService)?.id || services[0].id,
    issueDescription: params.get("issue") || "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: new Date().getFullYear().toString(),
    plateNumber: "",
    pickupLocation: params.get("location") || "",
    scheduleMode: (params.get("schedule") === "later" ? "later" : "now") as "now" | "later",
    scheduledAt: "2026-04-26T10:00"
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const service = useMemo(() => services.find((item) => item.id === form.serviceId) || services[0], [form.serviceId]);

  function setValue(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit() {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form)
    });
    if (response.status === 401) {
      router.push(`/customer/login?returnTo=${encodeURIComponent(`/book?service=${service.slug}`)}`);
      return;
    }
    const data = (await response.json()) as { id?: string; error?: string };
    if (!response.ok || !data.id) {
      setMessage(data.error || "Unable to create booking.");
      setBusy(false);
      return;
    }
    router.push(`/customer/bookings/${data.id}`);
  }

  return (
    <div className="glass mx-auto max-w-3xl rounded-2xl p-5 md:p-7">
      <div className="flex flex-wrap gap-2">
        {steps.map((label, index) => (
          <span key={label} className={`rounded-full px-3 py-1 text-xs font-bold ${index === step ? "bg-[#F8B000] text-[#001240]" : "bg-white/10 text-[#C9D6F5]"}`}>
            {index + 1}. {label}
          </span>
        ))}
      </div>

      <div className="mt-7">
        {step === 0 && (
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Select service or issue</h2>
            <Field label="Roadside issue" icon={<Wrench className="h-4 w-4 text-[#FFC526]" />}>
              <Select value={form.serviceId} onChange={(event) => setValue("serviceId", event.target.value)}>
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Issue details">
              <Textarea value={form.issueDescription} onChange={(event) => setValue("issueDescription", event.target.value)} placeholder="Tell us what happened" />
            </Field>
          </section>
        )}

        {step === 1 && (
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Vehicle details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Make" icon={<Car className="h-4 w-4 text-[#FFC526]" />}>
                <Input value={form.vehicleMake} onChange={(event) => setValue("vehicleMake", event.target.value)} placeholder="Toyota" />
              </Field>
              <Field label="Model">
                <Input value={form.vehicleModel} onChange={(event) => setValue("vehicleModel", event.target.value)} placeholder="Aqua" />
              </Field>
              <Field label="Year">
                <Input value={form.vehicleYear} onChange={(event) => setValue("vehicleYear", event.target.value)} type="number" />
              </Field>
              <Field label="Plate number">
                <Input value={form.plateNumber} onChange={(event) => setValue("plateNumber", event.target.value)} placeholder="NOM-1024" />
              </Field>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Pickup location</h2>
            <Field label="Where should the technician meet you?" icon={<MapPin className="h-4 w-4 text-[#FFC526]" />}>
              <Input value={form.pickupLocation} onChange={(event) => setValue("pickupLocation", event.target.value)} placeholder="Street, landmark, or address" />
            </Field>
            <div className="rounded-2xl border border-dashed border-[#FFC526]/40 bg-[#001240]/60 p-8 text-center text-[#C9D6F5]">
              Mock map placeholder. Real map/geocoding can replace this block later.
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Schedule service</h2>
            <Field label="Timing" icon={<CalendarCheck className="h-4 w-4 text-[#FFC526]" />}>
              <Select value={form.scheduleMode} onChange={(event) => setValue("scheduleMode", event.target.value)}>
                <option value="now">Send help now</option>
                <option value="later">Schedule for later</option>
              </Select>
            </Field>
            {form.scheduleMode === "later" && (
              <Field label="Scheduled time">
                <Input type="datetime-local" value={form.scheduledAt} onChange={(event) => setValue("scheduledAt", event.target.value)} />
              </Field>
            )}
          </section>
        )}

        {step === 4 && (
          <section className="grid gap-4">
            <h2 className="text-2xl font-black">Confirm request</h2>
            <div className="grid gap-3 rounded-2xl bg-white/8 p-5 text-sm text-[#C9D6F5]">
              <p><strong className="text-white">Service:</strong> {service.name}</p>
              <p><strong className="text-white">Vehicle:</strong> {form.vehicleYear} {form.vehicleMake} {form.vehicleModel} ({form.plateNumber})</p>
              <p><strong className="text-white">Location:</strong> {form.pickupLocation || "Not set"}</p>
              <p><strong className="text-white">ETA:</strong> Mock ETA starts at 15 minutes after dispatch.</p>
            </div>
            <p className="flex items-center gap-2 text-sm text-[#C9D6F5]"><CheckCircle2 className="h-4 w-4 text-[#27C46B]" /> No payment required upfront.</p>
          </section>
        )}
      </div>

      {message && <p className="mt-5 rounded-xl bg-[#FF4D4D]/15 p-3 text-sm font-bold text-[#FFB3B3]">{message}</p>}

      <div className="mt-7 flex justify-between gap-3">
        <Button variant="secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={busy}>
            {busy ? "Creating..." : "Confirm Request"}
          </Button>
        )}
      </div>
    </div>
  );
}
