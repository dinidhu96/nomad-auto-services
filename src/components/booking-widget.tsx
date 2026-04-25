"use client";

import { CalendarCheck, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselected = searchParams.get("service");
  const [serviceSlug, setServiceSlug] = useState(preselected || services[0].slug);
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [issue, setIssue] = useState("");
  const [schedule, setSchedule] = useState("now");

  const service = useMemo(() => services.find((item) => item.slug === serviceSlug) || services[0], [serviceSlug]);

  function submit() {
    const params = new URLSearchParams({
      service: service.slug,
      location,
      vehicle,
      issue,
      schedule
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="text-2xl font-black">Book a Service</h2>
      <div className="mt-4 grid gap-4">
        <Field label="What's the issue?" icon={<Wrench className="h-4 w-4 text-[#FFC526]" />}>
          <Select value={serviceSlug} onChange={(event) => setServiceSlug(event.target.value)} aria-label="Select issue">
            {services.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Your Location" icon={<MapPin className="h-4 w-4 text-[#FFC526]" />}>
          <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Enter your location" />
        </Field>
        {!compact && (
          <>
            <Field label="Vehicle">
              <Input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="Toyota Aqua, plate NOM-1024" />
            </Field>
            <Field label="Issue details">
              <Textarea value={issue} onChange={(event) => setIssue(event.target.value)} placeholder="Tell us what happened" />
            </Field>
          </>
        )}
        <Field label="Schedule" icon={<CalendarCheck className="h-4 w-4 text-[#FFC526]" />}>
          <Select value={schedule} onChange={(event) => setSchedule(event.target.value)}>
            <option value="now">Today, as soon as possible</option>
            <option value="later">Schedule for later</option>
          </Select>
        </Field>
        <Button onClick={submit} className="w-full text-base">
          Book Service
        </Button>
        <p className="flex items-center justify-center gap-2 text-xs font-semibold text-[#C9D6F5]">
          <ShieldCheck className="h-4 w-4" /> No payment required upfront
        </p>
      </div>
    </div>
  );
}
