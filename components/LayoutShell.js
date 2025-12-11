"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  // gem nav/footer for staff area; gem footer på kontrolrapport/404 side
  const hideNav = pathname?.startsWith("/staff");
  const hideFooter =
    pathname?.startsWith("/staff") || pathname === "/kontrolrapport";

  return (
    <>
      {!hideNav && <Nav />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
