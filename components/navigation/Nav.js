"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import OverlayClient from "./OverlayClient";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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
    <header className="fixed inset-x-0 top-0 h-40 z-40 pointer-events-none bg-linear-to-b from-black/90 via-black/60 to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Logo
            imgClassName="h-10 w-10 m-3"
            size={32}
            linkClassName="inline-block"
          />
        </div>
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1 w-8 h-8 justify-center items-end"
        >
          <span className="block h-0.5 bg-black dark:bg-white rounded-full w-6" />
          <span className="block h-0.5 bg-black dark:bg-white rounded-full w-6" />
          <span className="block h-0.5 bg-black dark:bg-white rounded-full w-6" />
        </button>
      </div>

      <OverlayClient open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
