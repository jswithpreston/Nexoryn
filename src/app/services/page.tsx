import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six interconnected engineering domains: web platforms, mobile systems, infrastructure & OS, cybersecurity, trading technology, and digital growth. End-to-end expertise for mission-critical systems.",
  alternates: { canonical: "https://nexoryn.com/services" },
  openGraph: {
    title: "Engineering Services | Nexoryn",
    description:
      "Six interconnected engineering domains built to work together — web, mobile, OS, security, trading, and growth.",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "Nexoryn", url: "https://nexoryn.com" },
    serviceType: "Systems Engineering",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & SaaS Platforms" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infrastructure & OS" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trading Technology" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Growth" } },
      ],
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicesClient />
    </>
  );
}
