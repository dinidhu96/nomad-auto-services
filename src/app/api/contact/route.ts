import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid contact form" }, { status: 400 });

  const smtpReady = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.CONTACT_TO_EMAIL);
  if (!smtpReady) {
    return NextResponse.json({
      ok: true,
      mode: "mock",
      message: "Contact request validated. Configure Gmail SMTP env vars to send email."
    });
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME || "Nomad Auto Services"}" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: `Nomad contact request from ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Mobile: ${parsed.data.mobile}`,
        "",
        parsed.data.message
      ].join("\n"),
      html: `
        <h2>Nomad Auto Services contact request</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Mobile:</strong> ${parsed.data.mobile}</p>
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message.replace(/\n/g, "<br />")}</p>
      `
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json({ error: "Unable to send contact email" }, { status: 502 });
  }
}
