"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/navigation/Nav";
import Footer from "@/components/Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  // Hide nav/footer for staff area; hide footer on kontrolrapport/404 view
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
