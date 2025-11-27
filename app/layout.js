import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";
import "./globals.css";
import NavClientWrapper from "@/components/navigation/NavClientWrapper";

import { Josefin_Sans, Instrument_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-instrument",
});

// Metadata for SEO
export const metadata = {
  title: "Next.js Post App",
  description: "A modern post application built with Next.js 16",
};

// Root Layout - wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-[#1a1a1a]">
        <NavClientWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
