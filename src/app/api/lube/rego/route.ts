import { NextResponse } from "next/server";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { plateSchema } from "@/lib/validations";

const recommendations = [
  ["Engine Oil", "SPRINT 5W-30 C3 full synthetic"],
  ["Transmission", "Automatic transmission fluid to OEM specification"],
  ["Differential", "75W-90 synthetic gear oil"],
  ["Brake Fluid", "DOT 4 brake fluid"],
  ["Coolant", "Long-life premix coolant"],
  ["Power Steering", "OEM compatible power steering fluid"],
  ["Hydraulics", "Hydraulic fluid matched to equipment spec"],
  ["Other", "Cabin filter, air filter, and fuel filter checks"]
];

export async function POST(request: Request) {
  const limit = rateLimit(`lube:${requestIp(request)}`);
  if (!limit.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const body = await request.json().catch(() => ({}));
  const parsed = plateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid plate or state" }, { status: 400 });

  if ((process.env.LUBE_PROVIDER || "mock") === "infomedia") {
    return NextResponse.json({
      provider: "infomedia",
      status: "placeholder",
      message: "Infomedia provider will be enabled when API docs and credentials are supplied.",
      plate: parsed.data.plate,
      state: parsed.data.state
    });
  }

  return NextResponse.json({
    provider: "mock",
    plate: parsed.data.plate,
    state: parsed.data.state,
    vehicle: "Toyota Hilux 2019 2.8L Turbo Diesel 4x4 Auto",
    recommendations: recommendations.map(([system, recommendation]) => ({ system, recommendation })),
    partner: "SPRINT LUBRICANTS",
    requestId: `LUBE-${Date.now()}`
  });
}
