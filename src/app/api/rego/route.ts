import { NextResponse } from "next/server";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { plateSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const limit = rateLimit(`rego:${requestIp(request)}`);
  if (!limit.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const parsed = plateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid plate or state" }, { status: 400 });

  const baseUrl = process.env.BLUEFLAG_BASE_URL;
  const apiKey = process.env.BLUEFLAG_API_KEY;
  if (baseUrl && apiKey) {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/rego`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ plate: parsed.data.plate, state: parsed.data.state, env: process.env.BLUEFLAG_ENV })
    });
    if (!response.ok) return NextResponse.json({ error: "Registration provider error" }, { status: 502 });
    return NextResponse.json(await response.json());
  }

  return NextResponse.json({
    plate: parsed.data.plate,
    state: parsed.data.state,
    registrationStatus: "Mock active",
    expiryDate: "2026-12-31",
    requestId: `MOCK-${Date.now()}`
  });
}
