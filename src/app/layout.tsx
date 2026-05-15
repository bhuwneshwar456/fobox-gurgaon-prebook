import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "fobox — Pre-book India's smartest meal subscription",
  description:
    "Three meal plans for Gurgaon professionals. Calm for sensitive stomachs, Fit for macro goals, Daily for real home food. Lock 50% off for 12 months. Free to register.",
  keywords: ["meal subscription", "Gurgaon", "tiffin service", "healthy food delivery", "fobox"],
  openGraph: {
    title: "fobox — Food that doesn't fight back.",
    description: "Lock 50% off your meal subscription for 12 months. Free to register. Launching 1 September 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
