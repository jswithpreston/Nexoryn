import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Nexoryn | Systems Engineering",
  description:
    "Nexoryn designs, builds, secures, and scales intelligent digital systems. From custom operating systems to high-frequency trading infrastructure.",
  alternates: { canonical: "https://nexoryn.com" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexoryn",
    url: "https://nexoryn.com",
    description:
      "Nexoryn designs, builds, secures, and scales intelligent digital systems.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@nexoryn.com",
      contactType: "customer service",
    },
    sameAs: [],
    serviceType: [
      "Web Application Development",
      "Mobile Systems Engineering",
      "Cybersecurity",
      "Trading Infrastructure",
      "Custom OS Development",
      "Digital Growth",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
