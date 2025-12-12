// Server Action - gemmer dart reservation i Firebase og redirecter til bekræftelsesside
"use server";

import { redirect } from "next/navigation";

export async function sendDartOrder(formData) {
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  // URL til Firebase hvor reservationer gemmes
  const url = `${baseUrl}/dartOrders.json`;

  // Hent form data (navn, telefon og valgt tidspunkt)
  const name = formData.get("name");
  const phone = formData.get("phone");
  const timeslot = formData.get("timeslot");

  // Generer et tilfældigt nummer til reservationen (0-9999)
  let dartNumber = Math.floor(Math.random() * 10000);

  // Send reservation til Firebase
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      timeslot,
      dartNumber,
      createdAt: new Date().toISOString(), // Tilføj tidspunkt for reservation
    }),
  });

  // Hvis reservation gemt succesfuldt, marker tidslot som utilgængelig og redirect
  if (response.ok) {
    const data = await response.json();
    const id = data.name; // Firebase returnerer et unikt ID

    // Marker det reserverede tidslot som utilgængelig i Firebase
    if (timeslot) {
      try {
        // Hent alle tidslots for at finde det rigtige ID
        const timeSlotsUrl = `${baseUrl}/timeSlot.json`;
        const timeSlotsResponse = await fetch(timeSlotsUrl);

        if (timeSlotsResponse.ok) {
          const timeSlotsData = await timeSlotsResponse.json();

          // Find tidslot ID'et der matcher timeslot string'en
          const timeSlotId = Object.keys(timeSlotsData).find(
            (key) => timeSlotsData[key].timeslot === timeslot
          );

          // Opdater tidslot til utilgængelig hvis det blev fundet
          // Gem også tidspunktet for reservationen så vi kan reset efter midnat
          if (timeSlotId) {
            await fetch(`${baseUrl}/timeSlot/${timeSlotId}.json`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                available: false,
                reservedAt: new Date().toISOString(), // Gem tidspunkt for reservation
              }),
            });
          }
        }
      } catch (error) {
        // Log fejl men fortsæt med redirect
        console.error("Error updating time slot availability:", error);
      }
    }

    redirect(`/dart/reserve/${id}`);
  }
}
