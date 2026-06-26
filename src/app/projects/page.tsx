import type { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Nexoryn's deployed systems: Elevate OS (secure mobile environment), TradeGuard (sub-millisecond risk engine), and Nexoryn Secure (threat intelligence platform).",
  alternates: { canonical: "https://nexoryn.com/projects" },
  openGraph: {
    title: "Our Work | Nexoryn",
    description:
      "From custom mobile operating systems to high-frequency trading infrastructure — systems built to last.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
