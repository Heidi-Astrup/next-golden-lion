"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 w-full bg-linear-to-b from-black/95 to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/images/GoldenlionLogo.png"
            alt="Golden Lion"
            width={32}
            height={32}
            className="h-10 w-10 m-3"
          />
        </Link>
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
