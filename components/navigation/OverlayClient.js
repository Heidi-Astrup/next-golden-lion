"use client";

import React from "react";
import Link from "next/link";

export default function OverlayClient({ open, onClose, links = [] }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      onClick={onClose}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-3xl"
        >
          ×
        </button>

        <nav className="space-y-6 text-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-3xl font-semibold hover:opacity-80"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
