// Server Action til at oprette initial tidslots i Firebase
"use server";

// Reset alle tidslots til tilgængelige
export async function resetAllTimeSlots() {
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (!baseUrl) {
    return { success: false, error: "Firebase URL not configured" };
  }

  try {
    const url = `${baseUrl}/timeSlot.json`;
    const response = await fetch(url);

    if (!response.ok) {
      return { success: false, error: "Failed to fetch time slots" };
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      return { success: false, error: "No time slots found" };
    }

    // Opdater ALLE tidslots til available: true
    const results = await Promise.all(
      Object.keys(data).map(async (key) => {
        const updateUrl = `${baseUrl}/timeSlot/${key}.json`;
        const updateResponse = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ available: true }),
        });

        if (!updateResponse.ok) {
          throw new Error(`Failed to update slot: ${key}`);
        }

        return key;
      })
    );

    return {
      success: true,
      message: `Reset ${results.length} time slots to available`,
      count: results.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function initTimeSlots() {
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (!baseUrl) {
    return { success: false, error: "Firebase URL not configured" };
  }

  // Definer tidslots fra 12:30 til 20:30 i 30-minutters intervaller
  // Alle starter som tilgængelige - de bliver kun utilgængelige når de faktisk er reserveret
  const timeSlots = [
    { timeslot: "12:30 - 13:00", available: true },
    { timeslot: "13:00 - 13:30", available: true },
    { timeslot: "13:30 - 14:00", available: true },
    { timeslot: "14:00 - 14:30", available: true },
    { timeslot: "14:30 - 15:00", available: true },
    { timeslot: "15:00 - 15:30", available: true },
    { timeslot: "15:30 - 16:00", available: true },
    { timeslot: "16:00 - 16:30", available: true },
    { timeslot: "16:30 - 17:00", available: true },
    { timeslot: "17:00 - 17:30", available: true },
    { timeslot: "17:30 - 18:00", available: true },
    { timeslot: "18:00 - 18:30", available: true },
    { timeslot: "18:30 - 19:00", available: true },
    { timeslot: "19:00 - 19:30", available: true },
    { timeslot: "19:30 - 20:00", available: true },
    { timeslot: "20:00 - 20:30", available: true },
  ];

  try {
    // Hent eksisterende tidslots først
    const existingUrl = `${baseUrl}/timeSlot.json`;
    const existingResponse = await fetch(existingUrl);
    let existingSlots = {};

    if (existingResponse.ok) {
      const existingData = await existingResponse.json();
      if (existingData && typeof existingData === "object") {
        existingSlots = existingData;

        // Opdater ALLE eksisterende tidslots til at være tilgængelige
        await Promise.all(
          Object.keys(existingSlots).map(async (key) => {
            const updateUrl = `${baseUrl}/timeSlot/${key}.json`;
            await fetch(updateUrl, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ available: true }),
            });
          })
        );
      }
    }

    // Opret eller opdater hver tidslot i Firebase
    const results = await Promise.all(
      timeSlots.map(async (slot) => {
        // Tjek om tidslot allerede eksisterer
        const existingSlotId = Object.keys(existingSlots).find(
          (key) => existingSlots[key].timeslot === slot.timeslot
        );

        if (existingSlotId) {
          // Opdater eksisterende tidslot til at være tilgængelig (tvinger available: true)
          const updateUrl = `${baseUrl}/timeSlot/${existingSlotId}.json`;
          const updateResponse = await fetch(updateUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timeslot: slot.timeslot,
              available: true,
            }),
          });

          if (!updateResponse.ok) {
            throw new Error(`Failed to update slot: ${slot.timeslot}`);
          }

          return { name: existingSlotId, updated: true };
        } else {
          // Opret nyt tidslot
          const url = `${baseUrl}/timeSlot.json`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(slot),
          });

          if (!response.ok) {
            throw new Error(`Failed to create slot: ${slot.timeslot}`);
          }

          return await response.json();
        }
      })
    );

    return {
      success: true,
      message: `Created/updated ${timeSlots.length} time slots - all are now available`,
      results,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
