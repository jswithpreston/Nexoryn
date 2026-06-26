import type { Metadata } from "next";
import LabsClient from "./labs-client";

export const metadata: Metadata = {
  title: "Innovation Lab",
  description:
    "Nexoryn's R&D division exploring neural network infrastructure, next-gen embedded systems in Rust, and generative UI frameworks. Active research into future computing paradigms.",
  alternates: { canonical: "https://nexoryn.com/labs" },
  openGraph: {
    title: "Innovation Lab | Nexoryn",
    description:
      "Experimental technologies, AI architectures, and future computing paradigms under active research.",
  },
};

export default function LabsPage() {
  return <LabsClient />;
}
