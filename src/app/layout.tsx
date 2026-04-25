import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

export const metadata: Metadata = {
  title: {
    default: "Nomad Auto Services",
    template: "%s | Nomad Auto Services"
  },
  description: "Fast, friendly mobile roadside assistance wherever drivers need help.",
  applicationName: "Nomad Auto Services",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Nomad Auto",
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
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
