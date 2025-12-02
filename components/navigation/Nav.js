"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import OverlayClient from "./OverlayClient";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the nav overlay when the route changes
  useEffect(() => {
    // Defer closing to avoid synchronous setState inside the effect
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/football", label: "Football" },
    { href: "/karaoke", label: "Karaoke" },
    { href: "/pubQuiz", label: "Pub Quiz" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About us" },
    { href: "/staff", label: "Staff" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-linear-to-b from-black to-transparent">
      <div className="max-w-7xl mx-auto px-7 py-4 flex items-center justify-between">
        <Logo
          href="/"
          imgClassName="h-15 w-15 m-2"
          size={32}
          linkClassName="inline-block"
        />
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 w-12 h-12 justify-center items-end"
        >
          <span className="block h-1 bg-[#e5a702] rounded-full w-7" />
          <span className="block h-1 bg-[#e5a702] rounded-full w-7" />
          <span className="block h-1 bg-[#e5a702] rounded-full w-7" />
        </button>
      </div>

      <OverlayClient open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
