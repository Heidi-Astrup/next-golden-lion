// TimeSlot komponent - viser tidslots i et grid og lader brugeren vælge et tidspunkt
"use client";

import { useState } from "react";

export default function TimeSlot({ times, onSelect, selectedTime }) {
  // Hvis der ikke er nogen tidslots, vis en besked
  if (!times || times.length === 0) {
    return (
      <div className="mb-8">
        <p className="text-[#FFF5D6] text-center">
          No time slots available. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {/* Loop gennem alle tidslots og vis dem som knapper */}
      {times.map((time) => {
        // Tjek om tidslot er tilgængeligt (default er true hvis ikke sat)
        const isAvailable = time.available !== false;
        // Tjek om dette tidslot er det valgte
        const isSelected = selectedTime === time.timeslot;

        return (
          <button
            key={time.id}
            type="button"
            onClick={() => isAvailable && onSelect(time.timeslot)}
            disabled={!isAvailable}
            className={`text-lg font-heading py-3 px-4 rounded-lg transition-all ${
              // Hvis valgt: hel gul baggrund med hvid tekst
              isSelected
                ? "bg-[#E5A702] text-white border-2 border-[#E5A702]"
                : // Hvis tilgængelig: hvid tekst med solid gul border
                isAvailable
                ? "bg-transparent text-white border-2 border-[#E5A702] hover:bg-[#E5A702]/20"
                : // Hvis ikke tilgængelig (taget): grå tekst med dashed grå border
                  "bg-transparent text-[#6f6f6f] border-2 border-dashed border-[#6f6f6f] cursor-not-allowed"
            }`}
          >
            {time.timeslot}
          </button>
        );
      })}
    </div>
  );
}
