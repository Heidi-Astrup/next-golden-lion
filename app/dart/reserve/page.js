// Dart reservationsside - viser tilgængelige tidslots og formular til reservation
"use client";

import Form from "@/components/Form";
import Image from "next/image";
import playDart from "@/public/images/playDart.svg";
import TidsSlot from "@/components/TidsSlot";
import { useEffect, useState } from "react";
import { sendDartOrder } from "./reserver";
import { initTimeSlots, resetAllTimeSlots } from "./opret-tidslots";

export default function ReserveDart() {
  // State til at holde alle tidslots fra Firebase
  const [times, setTimes] = useState([]);
  // State til at holde det valgte tidspunkt
  const [selectedTime, setSelectedTime] = useState(null);
  // State til at holde loading status
  const [loading, setLoading] = useState(true);
  // State til at holde fejlbesked
  const [error, setError] = useState(null);
  // State til at holde init status
  const [initStatus, setInitStatus] = useState(null);

  // Hent alle tidslots fra Firebase når siden indlæses
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

        // Tjek om Firebase URL er sat
        if (!baseUrl) {
          const errorMsg =
            "NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set in environment variables";
          console.error(errorMsg);
          setError(errorMsg);
          setLoading(false);
          return;
        }

        const url = `${baseUrl}/timeSlot.json`;
        console.log("Fetching time slots from:", url);

        const response = await fetch(url);

        if (!response.ok) {
          const errorMsg = `Failed to fetch time slots: ${response.status} ${response.statusText}`;
          console.error(errorMsg);
          setError(errorMsg);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Time slot data received:", data);

        // Hvis data er null eller tom, sæt times til tom array (ikke fejl)
        if (!data || data === null || typeof data !== "object") {
          console.log("No time slot data found - data is null or empty");
          setTimes([]);
          setError(null);
          setLoading(false);
          return;
        }

        // Konverter Firebase objekt til array med id'er
        // Tjek også om tidslots skal reset efter midnat
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        const timeArray = [];
        const slotsToReset = [];

        for (const key of Object.keys(data)) {
          const slot = { id: key, ...data[key] };

          // Hvis tidslotet er markeret som utilgængelig og har en reservedAt dato
          if (slot.available === false && slot.reservedAt) {
            const reservedDate = new Date(slot.reservedAt);
            const reservedDay = new Date(
              reservedDate.getFullYear(),
              reservedDate.getMonth(),
              reservedDate.getDate()
            );

            // Hvis reservationen var fra i går eller tidligere, reset tidslotet
            if (reservedDay < today) {
              slotsToReset.push(key);
              // Opdater slot til tilgængelig i arrayet
              slot.available = true;
              delete slot.reservedAt;
            }
          }

          timeArray.push(slot);
        }

        // Reset tidslots i Firebase hvis nogen skal reset
        if (slotsToReset.length > 0) {
          await Promise.all(
            slotsToReset.map(async (slotId) => {
              try {
                const resetUrl = `${baseUrl}/timeSlot/${slotId}.json`;
                await fetch(resetUrl, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    available: true,
                    reservedAt: null,
                  }),
                });
                console.log(`Reset time slot ${slotId} after midnight`);
              } catch (error) {
                console.error(`Error resetting slot ${slotId}:`, error);
              }
            })
          );
        }

        console.log("Time slots array:", timeArray);
        // Sorter tidsslots efter starttidspunkt (hh:mm), fordi Firebase giver et objekt uden rækkefølge
        const sorted = timeArray.sort((a, b) => {
          const toMinutes = (slot) => {
            // forventet format "HH:MM - HH:MM"
            if (!slot?.timeslot) return Number.MAX_SAFE_INTEGER; // ingen tid skal læg sidst i array
            const [start] = slot.timeslot.split(" - "); // tag startdelen
            const [h, m] = start.split(":").map(Number); // split i timer/minutter
            return (h ?? 0) * 60 + (m ?? 0); // konverter til minutter
          };
          return toMinutes(a) - toMinutes(b); // sorter stigende på starttid
        });
        setTimes(sorted);
        setError(null);
        setLoading(false);
      } catch (error) {
        const errorMsg = `Error fetching time slots: ${error.message}`;
        console.error(errorMsg, error);
        setError(errorMsg);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Håndter form submission - tilføj valgt tidspunkt til form data
  async function handleSubmit(formData) {
    if (selectedTime) {
      formData.append("timeslot", selectedTime);
    }
    return sendDartOrder(formData);
  }

  // Initialiser tidslots i Firebase (kun hvis der ikke er nogen)
  async function handleInitTimeSlots() {
    try {
      setInitStatus("Resetting all time slots...");

      // Først reset alle eksisterende tidslots til tilgængelige
      const resetResult = await resetAllTimeSlots();
      if (!resetResult.success) {
        console.warn("Reset warning:", resetResult.error);
      }

      // Derefter initialiser/opdater alle tidslots
      setInitStatus("Initializing time slots...");
      const result = await initTimeSlots();

      if (result.success) {
        setInitStatus("All time slots set to available! Refreshing...");
        // Genhent tidslots efter oprettelse
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setInitStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setInitStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div className="bg-[#000000] text-[#FFF5D6]">
      {/* Hero-billede med dart-spiller */}
      <section className="relative w-full h-[300px] mt-0">
        <Image
          src={playDart}
          alt="Dart at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        {/* Gradient i bunden af billedet */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="min-h-screen pt-4 pb-16">
        <div className="max-w-sm mx-auto px-6">
          {/* Hovedoverskrift */}
          <h1 className="font-heading text-[#E5A702] text-6xl md:text-7xl text-center font-semibold tracking-tight mb-8 -mt-4">
            Dart
          </h1>

          {/* Overskrift for tidslots */}
          <h3 className="font-heading text-2xl md:text-3xl text-[#FFF5D6] mb-6">
            Times available today
          </h3>

          {/* Vis tidslots i grid - brugeren kan vælge et tidspunkt */}
          <TidsSlot
            times={times}
            onSelect={setSelectedTime}
            selectedTime={selectedTime}
          />

          {/* Formular til at indtaste navn og telefon - sender reservation til server */}
          <Form action={handleSubmit} submitLabel="RESERVE THIS SPOT" />
        </div>
      </main>
    </div>
  );
}
