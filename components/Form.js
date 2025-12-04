"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Form({ action }) {
  const [phone, setPhone] = useState("");

  return (
    // Form uses Server Action passed as prop
    <form action={action} className="flex flex-col gap-1 mt-8">
      <label className="font-heading text-[#E5A702] text-2xl" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        aria-label="name"
        placeholder="Write your name..."
        className="bg-[#FFF5D6] p-4 text-lg rounded-md mb-6"
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
            "bg-[#FFF5D6] text-gray-950 text-lg mt-2 block rounded-md p-4 pl-[45px] pr-[12px] justify-between",
        }}
        className="mb-6 bg-[#FFF5D6] rounded-md"
      />

      <div className="bg-[#E5A702] p-4 rounded-lg w-1/2 m-auto text-center">
        <button>ORDER BEVERAGES</button>
      </div>
    </form>
  );
}
