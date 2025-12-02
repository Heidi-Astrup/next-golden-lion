"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

export default function OverlayClient({ open, onClose, links = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/90 w-screen h-screen"
        onClick={onClose}
      />
      {/* centered content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {/* logo in top-left (reuse shared Logo component) */}
        <div className="absolute inset-x-0 top-0 mx-auto px-7 py-4 flex items-center justify-between">
          <Logo
            href="/"
            imgClassName="h-15 w-15 m-2"
            size={32}
            linkClassName="inline-block"
          />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute top-5 right-2.5 p-2 flex items-center justify-center text-3xl font-bold shadow-lg text-white"
          >
            ✕
          </button>
        </div>

        {/* centered vertical nav */}
        <nav>
          <ul className="flex flex-col items-center justify-center gap-6 text-2xl text-white list-none p-0 m-0">
            {links.map((l) => (
              <li key={l.href} className="list-none">
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          {/* social icons placed after links */}
          <div className="mt-8 flex items-center gap-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              onClick={onClose}
            >
              <Image
                src="/images/facesort.png"
                alt="Facebook"
                width={40}
                height={40}
                className="object-contain"
              />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={onClose}
            >
              <Image
                src="/images/instasort.png"
                alt="Instagram"
                width={40}
                height={40}
                className="object-contain"
              />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
