import { NextResponse } from "next/server";
import { findPackage } from "@/lib/site";
import { checkoutSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid checkout request" }, { status: 400 });

  const product = findPackage(parsed.data.product_id);
  if (!product) return NextResponse.json({ error: "Unknown service package" }, { status: 400 });

  const reference = `NAS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const amount = product.price * parsed.data.quantity;
  const url = new URL(process.env.PAYMENT_GATEWAY_CHECKOUT_URL || "/payment-gateway/mock", request.url);
  const returnUrl = new URL("/buy?payment=success", request.url).toString();
  const cancelUrl = new URL("/buy?payment=cancelled", request.url).toString();

  const params = {
    reference,
    product_id: product.id,
    product_name: product.name,
    amount: String(amount),
    currency: product.currency,
    quantity: String(parsed.data.quantity),
    return_url: returnUrl,
    cancel_url: cancelUrl,
    customer_name: parsed.data.customer_name,
    customer_email: parsed.data.customer_email,
    customer_mobile: parsed.data.customer_mobile
  };

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  return NextResponse.json({ redirectUrl: url.toString(), reference });
}
