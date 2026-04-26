import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { business } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: business.name,
    template: `%s | ${business.name}`
  },
  description: "Mobile mechanic, roadside assistance, log book service, batteries, brakes, cooling repairs, and fleet servicing across Perth.",
  applicationName: business.name,
  manifest: "/manifest.json",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: business.name,
    description: business.slogan,
    url: business.website,
    images: [business.ogImage]
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.slogan,
    images: [business.ogImage]
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/assets/logo-mark-crop.jpeg",
    shortcut: "/assets/logo-mark-crop.jpeg",
    apple: "/assets/logo-mark-crop.jpeg"
  },
  appleWebApp: {
    capable: true,
    title: business.shortName,
    statusBarStyle: "black-translucent"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#001240"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased">{children}</body>
    </html>
  );
}
