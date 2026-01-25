import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * 🎓 MENTOR NOTE: Font Configuration
 * ----------------------------------
 * Next.js automatically optimizes fonts:
 * - Downloads at build time (no layout shift)
 * - Self-hosts (no Google tracking at runtime)
 * - Applies font-display: swap for fast rendering
 *
 * Using display: 'swap' prevents hydration mismatches
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

/**
 * 🎓 MENTOR NOTE: Metadata for SEO
 * --------------------------------
 * This metadata is crucial for:
 * - Google rankings (title, description)
 * - Social sharing (Open Graph)
 * - Twitter cards
 *
 * Customize these for each page using generateMetadata()
 */
export const metadata: Metadata = {
  title: {
    default: "OneTripDocs - One Trip. Done. | OCI Application Validation",
    template: "%s | OneTripDocs",
  },
  description:
    "Stop getting trapped at the BLS counter. Validate your OCI application before you go. One trip. Zero surprise fees. Done.",
  keywords: [
    "OCI application",
    "OCI card",
    "BLS India",
    "Indian citizenship",
    "OCI checklist",
    "OCI documents",
    "BLS fee",
    "OCI validation",
  ],
  authors: [{ name: "OneTripDocs" }],
  creator: "OneTripDocs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://onetripdocs.com",
    siteName: "OneTripDocs",
    title: "OneTripDocs - One Trip. Done.",
    description:
      "Stop getting trapped at the BLS counter. Validate your OCI application before you go.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OneTripDocs - One Trip. Done.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneTripDocs - One Trip. Done.",
    description:
      "Stop getting trapped at the BLS counter. Validate your OCI application before you go.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
