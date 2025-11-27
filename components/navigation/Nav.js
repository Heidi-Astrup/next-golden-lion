"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/create", label: "Create" },
    { href: "/menu", label: "Menu" },
    { href: "/karaoke", label: "Karaoke" },
    { href: "/football", label: "Football" },
    { href: "/pubQuiz", label: "Pub Quiz" },
    { href: "/staff", label: "Staff" },
  ];

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1 w-8 h-8 justify-center"
          >
            <span className="block h-0.5 bg-black dark:bg-white rounded-full" />
            <span className="block h-0.5 bg-black dark:bg-white rounded-full" />
            <span className="block h-0.5 bg-black dark:bg-white rounded-full" />
          </button>

          <Link href="/" className="text-xl font-bold">
            Golden Lion
          </Link>
        </div>
      </div>

      <OverlayClient open={open} onClose={() => setOpen(false)} links={links} />
    </header>
  );
}
