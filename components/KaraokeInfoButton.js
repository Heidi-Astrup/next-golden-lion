"use client";

import { useState } from "react";

// Lille spørgsmålstegns-knap ved siden af "SIGN UP"
// Viser en forklarende popup om hvordan tilmeldingen fungerer
export default function KaraokeInfoButton() {
  // Styrer om popup/modalen er åben eller lukket
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Selve spørgsmålstegns-ikonet som knap */}
      <span
        role="button"
        tabIndex={0}
        // Klik med mus åbner popup
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          // Tastatur: Enter eller mellemrum åbner også popup
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

      {/* Når open er true, viser vi overlay + boks */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          // Klik udenfor boksen lukker popup igen
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-xs w-full rounded-2xl bg-[#FFF5D6] text-black px-6 py-6 text-center shadow-xl"
            // Stop klik inde i boksen fra at boble op og lukke overlay
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg leading-relaxed">
              Click <span className="italic font-semibold">Sign Up</span> to
              choose your song and join the karaoke queue!
            </p>
            {/* Luk-knap i bunden af boksen */}
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
