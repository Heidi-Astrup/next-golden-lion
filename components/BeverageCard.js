"use client";

import Image from "next/image";
import OrderedPopUp from "./OrderedPopUp";
import { useState } from "react";
import trashCan from "@/public/images/trash.png";

const BeverageCard = ({ beverages, basket, basketItems, setBasketItems }) => {
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
    setBasketItems(updatedArray);
  }

  function trashIt() {
    const updatedArray = [...basketItems];
    const index = updatedArray.findIndex((item) => item.id === beverages.id);
    if (index !== -1) updatedArray.splice(index, 1);
    localStorage.setItem("beverageName", JSON.stringify(updatedArray));
    setBasketItems(updatedArray);
  }

  function minus() {
    const updatedArray = [...basketItems];
    const index = updatedArray.findIndex((item) => item.id === beverages.id);
    if (index !== -1) updatedArray.splice(index, 1);
    localStorage.setItem("beverageName", JSON.stringify(updatedArray));
    setBasketItems(updatedArray);
  }

  function plus() {
    const updatedArray = [...basketItems];
    const index = updatedArray.findIndex((item) => item.id === beverages.id);
    if (index !== -1) updatedArray.splice(index, 1);
    localStorage.setItem("beverageName", JSON.stringify(updatedArray));
    setBasketItems(updatedArray);
  }

  if (basket === "inBasket") {
    return (
      <div className="text-left text-[#FFF5D6] w-44 h-80 border-2 border-[#E5A702] rounded-xl p-4 flex flex-col justify-between">
        <Image
          className="w-35 h-35 rounded-lg"
          src={beverages.image}
          alt={beverages.description}
          width={150}
          height={150}
        ></Image>
        <h3 className="text-[28px] font-heading leading-none mt-4">
          {beverages.name}{" "}
          {beverages.quantity > 1 ? `x${beverages.quantity}` : ""}
        </h3>
        <p className="font-body text-[20px]">{beverages.price}</p>
        <div className="flex justify-between">
          <div className="flex justify-between gap-3 px-2 border-2 border-[#E5A702] rounded-lg">
            <h3
              onClick={minus}
              className="text-4xl text-[#E5A702] font-heading leading-none"
            >
              -
            </h3>
            <h3 className="text-3xl text-[#E5A702] font-heading leading-none mt-1.5">
              {beverages.quantity}
            </h3>
            <h3
              onClick={plus}
              className="text-4xl text-[#E5A702] font-heading leading-none"
            >
              +
            </h3>
          </div>
          <Image
            className="w-8 h-10"
            src={trashCan}
            alt="Trash Can"
            width={50}
            height={50}
            onClick={trashIt}
          ></Image>
        </div>
      </div>
    );
  } else {
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
};

export default BeverageCard;
