"use client";

import React from "react";
import Link from "next/link";

export default function OverlayClient({ open, onClose, links = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 w-screen h-screen"
        onClick={onClose}
      />
      {/* centered content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {/* close button top-right */}
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="absolute top-0 right-2.5 p-2 flex items-center justify-center text-3xl font-bold shadow-lg text-white"
        >
          ✕
        </button>

        {/* centered vertical nav */}
        <nav className="flex flex-col items-center justify-center gap-6 text-2xl text-white">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block text-center"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
