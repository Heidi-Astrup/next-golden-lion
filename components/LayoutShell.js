"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/staff");

  return (
    <>
      {!hideChrome && <Nav />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
