"use client";

import React from "react";
import Link from "next/link";

export default function Overlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="overlay-root" role="dialog" aria-modal="true">
      <div className="overlay-backdrop" onClick={onClose}></div>
      <div className="overlay-panel">
        <button
          className="overlay-close"
          onClick={onClose}
          aria-label="Close overlay"
        >
          ✕
        </button>
        <nav className="overlay-nav">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
