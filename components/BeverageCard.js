"use client";

import Image from "next/image";
import OrderedPopUp from "./OrderedPopUp";
import { useState } from "react";

export default function BeverageCard({ beverages }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const togglePopUp = () => {
    setShowPopUp((prev) => !prev);
  };

  function storeIt() {
    // 1. Hent eksisterende array fra localStorage
    const stored = localStorage.getItem("beverageName");
    const prevArray = stored ? JSON.parse(stored) : [];

    // 2. Læg den nye drink i arrayet
    const updatedArray = [...prevArray, beverages];

    // 3. Gem arrayet igen
    localStorage.setItem("beverageName", JSON.stringify(updatedArray));
  }

  return (
    <div
      onClick={storeIt}
      className="text-left text-[#FFF5D6] w-44 h-80 border-2 border-[#E5A702] rounded-xl p-4 flex flex-col justify-between"
    >
      <Image
        className="w-35 h-35 rounded-lg"
        src={beverages.image}
        alt={beverages.description}
        width={150}
        height={150}
      ></Image>
      <h3 className="text-[28px] font-heading leading-none mt-4">
        {beverages.name}
      </h3>
      <p className="font-body text-[20px]">{beverages.price}</p>
      <button
        onClick={togglePopUp}
        className="bg-[#E5A702] w-4/4 p-2 rounded-[10px]"
      >
        ORDER
      </button>

      {showPopUp && (
        <OrderedPopUp togglePopUp={togglePopUp} beverages={beverages.name} />
      )}
    </div>
  );
}
