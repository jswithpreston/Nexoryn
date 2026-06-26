import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/cursor";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Nav } from "@/components/ui/nav";
import { Footer } from "@/components/ui/footer";
import { PageTransition } from "@/components/ui/page-transition";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nexoryn.com"),
  title: {
    default: "Nexoryn | Systems Engineering",
    template: "%s | Nexoryn",
  },
  description:
    "Nexoryn designs, builds, secures, and scales intelligent digital systems. From custom operating systems to high-frequency trading infrastructure.",
  keywords: [
    "systems engineering",
    "software development",
    "cybersecurity",
    "trading infrastructure",
    "custom OS",
    "web applications",
    "mobile development",
    "Nexoryn",
  ],
  authors: [{ name: "Nexoryn" }],
  creator: "Nexoryn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexoryn.com",
    siteName: "Nexoryn",
    title: "Nexoryn | Systems Engineering",
    description:
      "Nexoryn designs, builds, secures, and scales intelligent digital systems.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Nexoryn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexoryn | Systems Engineering",
    description:
      "Nexoryn designs, builds, secures, and scales intelligent digital systems.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden relative">
        <Cursor />
        <AnimatedBackground />
        <Nav />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-24 relative">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
