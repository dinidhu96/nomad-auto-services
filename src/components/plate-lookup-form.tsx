"use client";

import { CheckCircle2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { australianStates, normalizePlate } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";

type LookupResult = Record<string, unknown> & {
  plate?: string;
  state?: string;
  registrationStatus?: string;
  expiryDate?: string;
  requestId?: string;
  vehicle?: string;
  recommendations?: Record<string, string> | { system: string; recommendation: string }[];
  provider?: string;
};

export function PlateLookupForm({ mode }: { mode: "rego" | "lube" }) {
  const storageKey = `nomad:last-${mode}-lookup`;
  const [plate, setPlate] = useState("");
  const [state, setState] = useState("WA");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const recommendationEntries = Array.isArray(result?.recommendations)
    ? result.recommendations.map((item) => [item.system, item.recommendation] as const)
    : Object.entries(result?.recommendations || {});

  useEffect(() => {
    window.setTimeout(() => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      const value = JSON.parse(saved) as { plate?: string; state?: string };
      if (value.plate) setPlate(value.plate);
      if (value.state) setState(value.state);
    }, 0);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ plate: normalizePlate(plate), state }));
  }, [plate, state, storageKey]);

  async function submit() {
    setBusy(true);
    setError("");
    setResult(null);
    const response = await fetch(mode === "rego" ? "/api/rego" : "/api/lube/rego", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ plate, state })
    });
    const data = (await response.json()) as LookupResult & { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(data.error || "Lookup failed.");
      return;
    }
    setResult(data);
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_180px]">
        <Field label="Registration plate">
          <Input value={plate} onChange={(event) => setPlate(event.target.value)} placeholder="1ABC234" />
        </Field>
        <Field label="State">
          <Select value={state} onChange={(event) => setState(event.target.value)}>
            {australianStates.map((item) => <option key={item} value={item}>{item}</option>)}
          </Select>
        </Field>
      </div>
      <Button onClick={submit} disabled={busy} className="mt-4">
        <Search className="h-4 w-4" /> {busy ? "Checking..." : mode === "rego" ? "Check Rego" : "Find Lubricants"}
      </Button>
      {error && <p className="mt-4 rounded-xl bg-[#FF4D4D]/15 p-3 text-sm font-bold text-[#FFB3B3]">{error}</p>}
      {result && (
        <div className="mt-5 grid gap-4">
          <div className="rounded-2xl border border-[#F8B000]/25 bg-[#001240]/70 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#27C46B]/15 text-[#8EF3B8]">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">{mode === "rego" ? "Registration result" : "Lube guide result"}</p>
                <h2 className="mt-1 text-2xl font-black">{result.plate || normalizePlate(plate)} {result.state ? `- ${result.state}` : ""}</h2>
                {result.vehicle && <p className="mt-1 text-[#C9D6F5]">{result.vehicle}</p>}
              </div>
            </div>
            <dl className="mt-5 grid gap-3 text-sm text-[#C9D6F5] md:grid-cols-3">
              <div><dt className="font-bold text-white">Status</dt><dd>{result.registrationStatus || result.provider || "Available"}</dd></div>
              <div><dt className="font-bold text-white">Expiry date</dt><dd>{result.expiryDate || "Not supplied"}</dd></div>
              <div><dt className="font-bold text-white">Request ID</dt><dd>{result.requestId || "Not supplied"}</dd></div>
            </dl>
          </div>
          {recommendationEntries.length > 0 && (
            <div className="grid gap-3 md:grid-cols-2">
              {recommendationEntries.map(([system, recommendation]) => (
                <article key={system} className="rounded-xl border border-white/10 bg-white/8 p-4">
                  <h3 className="font-black text-white">{system}</h3>
                  <p className="mt-1 text-sm text-[#C9D6F5]">{recommendation}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
