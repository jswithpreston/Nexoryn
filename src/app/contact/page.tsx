import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Nexoryn. Reach out for engineering consultations, system architecture, cybersecurity, trading infrastructure, and custom software development.",
  alternates: { canonical: "https://nexoryn.com/contact" },
  openGraph: {
    title: "Contact Nexoryn | Start a Project",
    description:
      "Ready to build something exceptional? Our engineering team responds within 24 hours.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
