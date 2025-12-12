"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideNav = pathname?.startsWith("/staff");
  const hideFooter =
    pathname?.startsWith("/staff")

  return (
    <>
      {!hideNav && <Nav />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
