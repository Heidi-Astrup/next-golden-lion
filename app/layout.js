import "./globals.css";
import NavClientWrapper from "@/components/navigation/NavClientWrapper";

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
      </body>
    </html>
  );
}
