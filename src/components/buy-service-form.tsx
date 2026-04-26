"use client";

import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck, ShoppingCart, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import packages from "@/content/packages.json";
import { aud, business } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";

const storageKey = "nomad:last-service-purchase";

type CheckoutMode = "visitor" | "customer";

type BillingState = {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type CustomerState = {
  customer_name: string;
  customer_email: string;
  customer_mobile: string;
};

const steps = [
  { id: 1, label: "Service" },
  { id: 2, label: "Details" },
  { id: 3, label: "Card" },
  { id: 4, label: "Review" }
] as const;

export function BuyServiceForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState(packages[0].id);
  const [quantity, setQuantity] = useState(1);
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>("visitor");
  const [customer, setCustomer] = useState<CustomerState>({ customer_name: "", customer_email: "", customer_mobile: "" });
  const [billing, setBilling] = useState<BillingState>({ cardholder: "", cardNumber: "", expiry: "", cvc: "" });
  const [message, setMessage] = useState("");

  const product = useMemo(() => packages.find((item) => item.id === productId) || packages[0], [productId]);
  const total = product.price * quantity;
  const cardTail = billing.cardNumber.replace(/\D/g, "").slice(-4);
  const cardPreview = cardTail ? `•••• •••• •••• ${cardTail}` : "•••• •••• •••• ••••";
  const paymentReady = Boolean(billing.cardholder && billing.cardNumber && billing.expiry && billing.cvc);
  const nextEnabled = step === 1 ? Boolean(productId && quantity) : step === 2 ? true : step === 3 ? paymentReady : true;

  useEffect(() => {
    window.setTimeout(() => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      const value = JSON.parse(saved) as {
        productId?: string;
        quantity?: number;
        customer?: CustomerState;
        checkoutMode?: CheckoutMode;
      };
      if (value.productId) setProductId(value.productId);
      if (value.quantity) setQuantity(value.quantity);
      if (value.customer) setCustomer(value.customer);
      if (value.checkoutMode) setCheckoutMode(value.checkoutMode);
    }, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ productId, quantity, customer, checkoutMode }));
  }, [productId, quantity, customer, checkoutMode]);

  async function checkout() {
    setMessage("");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity, ...customer })
    });
    const data = (await response.json()) as { redirectUrl?: string; error?: string };
    if (!response.ok || !data.redirectUrl) {
      setMessage(data.error || "Unable to start checkout.");
      return;
    }
    router.push(data.redirectUrl);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div className="grid gap-5">
        <div className="glass rounded-2xl p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-4">
            {steps.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm font-black",
                  step >= item.id ? "border-[#FFC526]/60 bg-[#FFC526]/15 text-white" : "border-white/10 bg-white/5 text-[#8FA4D4]"
                )}
              >
                Step {item.id}: {item.label}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <section className="glass rounded-2xl p-6">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Choose your service</p>
            <h2 className="mt-2 text-2xl font-black">Select package and quantity</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Service package">
                <Select value={productId} onChange={(event) => setProductId(event.target.value)}>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.category} - {pkg.name} from {aud(pkg.price)}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Quantity">
                <Select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </Select>
              </Field>
              <div className="grid gap-3 md:grid-cols-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setProductId(pkg.id)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      productId === pkg.id ? "border-[#FFC526]/70 bg-[#FFC526]/10" : "border-white/10 bg-white/5 hover:border-white/25"
                    )}
                  >
                    <div className="text-sm font-black uppercase tracking-[.14em] text-[#FFC526]">{pkg.category}</div>
                    <div className="mt-1 text-lg font-black text-white">{pkg.name}</div>
                    <div className="mt-2 text-sm text-[#C9D6F5]">{pkg.description}</div>
                    <div className="mt-4 text-2xl font-black text-[#FFC526]">from {aud(pkg.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="glass rounded-2xl p-6">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Visitor or customer</p>
            <h2 className="mt-2 text-2xl font-black">Tell us who is checking out</h2>
            <div className="mt-5 grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                {(["visitor", "customer"] as CheckoutMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCheckoutMode(mode)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left transition",
                      checkoutMode === mode ? "border-[#FFC526]/70 bg-[#FFC526]/10" : "border-white/10 bg-white/5 hover:border-white/25"
                    )}
                  >
                    <div className="flex items-center gap-2 text-lg font-black text-white">
                      {mode === "customer" ? <Smartphone className="h-4 w-4 text-[#FFC526]" /> : <ShieldCheck className="h-4 w-4 text-[#FFC526]" />}
                      {mode === "customer" ? "Customer" : "Visitor"}
                    </div>
                    <p className="mt-2 text-sm text-[#C9D6F5]">
                      {mode === "customer"
                        ? "Use this if you already know the vehicle and want to keep contact details attached to the order."
                        : "Use this if you are booking on behalf of someone else or checking out quickly from mobile."}
                    </p>
                  </button>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Name">
                  <Input value={customer.customer_name} onChange={(event) => setCustomer({ ...customer, customer_name: event.target.value })} placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <Input type="email" value={customer.customer_email} onChange={(event) => setCustomer({ ...customer, customer_email: event.target.value })} placeholder="you@example.com" />
                </Field>
                <Field label="Mobile">
                  <Input value={customer.customer_mobile} onChange={(event) => setCustomer({ ...customer, customer_mobile: event.target.value })} placeholder={business.phone} />
                </Field>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="glass rounded-2xl p-6">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Card payment</p>
            <h2 className="mt-2 text-2xl font-black">Enter card details for the checkout step</h2>
            <p className="mt-3 text-sm leading-6 text-[#C9D6F5]">
              Card details are not stored in the app. They are only shown in this step so the flow feels like a real credit card checkout on mobile and desktop.
            </p>
            <div className="mt-5 grid gap-4">
              <Field label="Cardholder name">
                <Input value={billing.cardholder} onChange={(event) => setBilling({ ...billing, cardholder: event.target.value })} placeholder="CARDHOLDER NAME" />
              </Field>
              <Field label="Card number">
                <Input
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={billing.cardNumber}
                  onChange={(event) => setBilling({ ...billing, cardNumber: event.target.value.replace(/[^\d ]/g, "") })}
                  placeholder="4111 1111 1111 1111"
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Expiry">
                  <Input
                    autoComplete="cc-exp"
                    value={billing.expiry}
                    onChange={(event) => setBilling({ ...billing, expiry: event.target.value })}
                    placeholder="MM / YY"
                  />
                </Field>
                <Field label="CVC">
                  <Input
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={billing.cvc}
                    onChange={(event) => setBilling({ ...billing, cvc: event.target.value.replace(/[^\d]/g, "") })}
                    placeholder="123"
                  />
                </Field>
              </div>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="glass rounded-2xl p-6">
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Review</p>
            <h2 className="mt-2 text-2xl font-black">Confirm the order</h2>
            <div className="mt-5 grid gap-3 text-sm text-[#C9D6F5] md:grid-cols-2">
              <div className="rounded-xl bg-white/8 p-4">
                <div className="font-black text-white">Package</div>
                <div className="mt-1">{product.category} - {product.name}</div>
                <div className="mt-2 font-black text-[#FFC526]">{aud(product.price)} each</div>
              </div>
              <div className="rounded-xl bg-white/8 p-4">
                <div className="font-black text-white">Quantity and total</div>
                <div className="mt-1">{quantity} item(s)</div>
                <div className="mt-2 font-black text-[#FFC526]">{aud(total)}</div>
              </div>
              <div className="rounded-xl bg-white/8 p-4">
                <div className="font-black text-white">Checkout type</div>
                <div className="mt-1 capitalize">{checkoutMode}</div>
              </div>
              <div className="rounded-xl bg-white/8 p-4">
                <div className="font-black text-white">Payment method</div>
                <div className="mt-1 flex items-center gap-2"><CreditCard className="h-4 w-4 text-[#FFC526]" /> Credit card</div>
                <div className="mt-2 text-[#C9D6F5]">{cardPreview}</div>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-[#FFC526]/20 bg-[#FFC526]/10 p-4 text-sm text-[#FFE39A]">
              Real payment processing is handled by the hosted checkout redirect. If no gateway is configured, you will be sent to the mock gateway for a simulated card success flow.
            </div>
          </section>
        )}

        {message && <p className="rounded-xl bg-[#FF4D4D]/15 p-4 text-sm font-bold text-[#FFB3B3]">{message}</p>}

        <div className="flex flex-wrap gap-3">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => setStep((value) => value - 1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : null}
          {step < 4 ? (
            <Button type="button" onClick={() => setStep((value) => Math.min(4, value + 1))} disabled={!nextEnabled}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={checkout} disabled={!paymentReady}>
              <ShoppingCart className="h-4 w-4" /> Pay by card
            </Button>
          )}
        </div>
      </div>

      <aside className="grid gap-5">
        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Order summary</p>
          <h2 className="mt-2 text-2xl font-black">{product.name}</h2>
          <p className="mt-2 text-sm text-[#C9D6F5]">{product.description}</p>
          <dl className="mt-5 grid gap-3 text-sm text-[#C9D6F5]">
            <div className="flex items-center justify-between rounded-xl bg-white/8 p-3">
              <dt>Quantity</dt>
              <dd className="font-black text-white">{quantity}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/8 p-3">
              <dt>Price each</dt>
              <dd className="font-black text-white">{aud(product.price)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/8 p-3">
              <dt>Total</dt>
              <dd className="font-black text-[#FFC526]">{aud(total)}</dd>
            </div>
          </dl>
        </div>

        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-black uppercase tracking-[.16em] text-[#FFC526]">Checkout note</p>
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/8 p-4">
              <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#FFC526]" />
            <p className="text-sm leading-6 text-[#C9D6F5]">
              PAYMENT_GATEWAY_CHECKOUT_URL is used when configured. Otherwise the app sends the order to the mock gateway so customers can test the full flow safely.
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
