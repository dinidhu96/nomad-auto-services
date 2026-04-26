import type { Metadata } from "next";
import site from "@/content/site.json";
import servicesJson from "@/content/services.json";
import packagesJson from "@/content/packages.json";
import faqsJson from "@/content/faqs.json";
import blogJson from "@/content/blog.json";

export const siteContent = site;
export const business = site.business;
export const serviceContent = servicesJson;
export const servicePackages = packagesJson;
export const faqContent = faqsJson;
export const blogPosts = blogJson;

export type ServiceContent = (typeof serviceContent)[number];
export type ServicePackage = (typeof servicePackages)[number];

export function aud(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(value);
}

export function findService(slug: string) {
  return serviceContent.find((service) => service.slug === slug);
}

export function findPackage(id: string) {
  return servicePackages.find((pkg) => pkg.id === id);
}

export function normalizePlate(value: string) {
  return value.trim().toUpperCase().replace(/[\s-]/g, "");
}

export const australianStates = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;
export type AustralianState = (typeof australianStates)[number];

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const absoluteTitle = `${title} | ${business.name}`;

  return {
    title: absoluteTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle,
      description,
      url: path,
      siteName: business.name,
      images: [{ url: business.ogImage, width: 1200, height: 630, alt: business.slogan }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description,
      images: [business.ogImage]
    }
  };
}
