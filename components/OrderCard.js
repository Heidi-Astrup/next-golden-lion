"use client";

import { useState } from "react";

export default function BeverageCard({ beverages, name }) {
  const [active, setActive] = useState(true);

  function done() {
    setActive(!active);
  }

  function cancel() {
    alert("order canceled");
  }

  return (
    <div
      className={`text-left  w-40 h-auto border-2 rounded-xl p-4 flex flex-col gap-4 justify-between ${
        active
          ? "border-[#E5A702] text-[#FFF5D6]"
          : "border-[#6f6f6f] text-[#6f6f6f]"
      }`}
    >
      <h3 className="text-[28px] font-heading leading-none mt-4">
        {beverages.name}{" "}
        {beverages.quantity > 1 ? `x${beverages.quantity}` : ""}
      </h3>
      <p className="font-body text-[20px]">For {name}</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={done}
          className={`w-4/4 p-2 rounded-[10px] text-black text-1xl ${
            active ? "bg-[#E5A702]" : "bg-[#6f6f6f]"
          }`}
        >
          DONE
        </button>
        <button
          onClick={cancel}
          className="bg-black w-4/4 p-2 border-2 border-[#E5A702] rounded-[10px] text-[#E5A702] text-1xl"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
