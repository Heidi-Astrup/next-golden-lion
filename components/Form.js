// Denne komponent er en genbrugelig formular til navn + telefon
// Den er client-side pga. brug af react-phone-input-2 (kontrolleret input)
"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// 'action' er en Server Action som siden sender ind (fx sendOrder, sendKaraokeSignup)
// 'submitLabel' gør at samme form kan vise forskellige knap-tekster (ORDER BEVERAGES / SIGN UP)
// 'hiddenFields' bruges til at sende ekstra data med (fx artist, title, length for karaoke)
export default function Form({
  action,
  submitLabel = "ORDER BEVERAGES",
  hiddenFields = {},
}) {
  // Lokalt state til telefonnummeret, som vi giver til PhoneInput
  const [phone, setPhone] = useState("");

  return (
    // 'action' peger på en server-funktion – når man submitter, kaldes den på serveren
    <form action={action} className="flex flex-col gap-1">
      {/* Hidden inputs til at sende ekstra data med til server action (fx sang-info til karaoke) */}
      {Object.entries(hiddenFields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value || ""} />
      ))}
      <label className="font-heading text-[#E5A702] text-2xl" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        aria-label="name"
        placeholder="Write your name..."
        className="bg-[#FFF5D6] text-black p-4 text-lg rounded-md mb-6"
      />
      <label className="font-heading text-[#E5A702] text-2xl" htmlFor="phone">
        Phone number
      </label>
      <PhoneInput
        placeholder="Your phone number..."
        country="dk"
        value={phone}
        onChange={setPhone}
        inputProps={{
          name: "phone",
          id: "phone",
          "aria-label": "phone",
          required: true,
          className:
            "bg-[#FFF5D6] text-black text-lg mt-2 block rounded-md p-4 pl-[45px] pr-[12px] justify-between",
        }}
        className="mb-6 bg-[#FFF5D6] rounded-md"
      />

      <div className="bg-[#E5A702] p-4 rounded-lg w-1/2 m-auto text-center">
        <button>{submitLabel}</button>
      </div>
    </form>
  );
}
