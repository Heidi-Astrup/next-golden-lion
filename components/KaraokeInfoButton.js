"use client";

import { useState } from "react";

export default function KaraokeInfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="ml-1 flex items-center justify-center w-9 h-9 rounded-full border border-black text-base pt-px bg-transparent cursor-pointer"
        aria-label="How does Sign Up work?"
      >
        ?
      </span>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-xs w-full rounded-2xl bg-[#FFF5D6] text-black px-6 py-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg leading-relaxed">
              Click <span className="italic font-semibold">Sign Up</span> to
              choose your song and join the karaoke queue!
            </p>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(false);
                }
              }}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-black px-4 py-1 text-sm font-semibold cursor-pointer"
            >
              Close
            </div>
          </div>
        </div>
      )}
    </>
  );
}


