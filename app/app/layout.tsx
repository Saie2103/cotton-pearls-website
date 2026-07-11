import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";

// Display face: Syne, loaded from Google Fonts (works out of the box).
// The brief also allows Clash Display, which is not on Google Fonts —
// see README "Swapping in Clash Display" if you'd rather self-host that one.
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cotton Pearls — Jaipur Cotton Ethnic Wear",
  description:
    "Kurtis, coord sets and suits, cut from breathable Jaipur cotton. Heritage fabric, everyday drops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        {/* Footer intentionally left for a follow-up pass — flag if you want it now */}
      </body>
    </html>
  );
}
