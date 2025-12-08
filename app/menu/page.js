"use client";

import BeverageCard from "@/components/BeverageCard";
import Image from "next/image";
import Link from "next/link";
import beerKeg from "@/public/images/Beer.svg";
import { useEffect, useState } from "react";

export default function Menu() {
  const [basketItems, setBasketItems] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/beverages.json`;
      const response = await fetch(url);
      const dataObject = await response.json();

      const beveragesArray = Object.keys(dataObject).map((key) => ({
        id: key,
        ...dataObject[key],
      }));

      setBeverages(beveragesArray);
    }

    fetchData();
  }, []);

  const draughtBeverages = beverages.filter((b) => b.tag === "draught");
  const bottledBeverages = beverages.filter((b) => b.tag === "bottled");
  const rumBeverages = beverages.filter((b) => b.tag === "rum");
  const whiskeyBeverages = beverages.filter((b) => b.tag === "whisky");

  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={400}
          src={beerKeg}
          alt="beer keg"
          className="w-dvh h-auto -z-10 relative"
        />
      </section>

      <div className="min-h-screen pb-10 px-5 flex justify-between">
        <main className="max-w-[600px]">
          <h1 className="font-heading mt-10 text-[#FFF5D6] text-5xl text-center font-semibold mb-4 tracking-tight ">
            Menu
          </h1>

          <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">
            Draught
          </h3>
          <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
            {draughtBeverages.map((beverages) => (
              <BeverageCard
                key={beverages.id}
                beverages={beverages}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            ))}
          </div>

          <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">
            Bottled
          </h3>
          <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
            {bottledBeverages.map((beverages) => (
              <BeverageCard
                key={beverages.id}
                beverages={beverages}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            ))}
          </div>

          <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Whisky</h3>
          <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
            {whiskeyBeverages.map((beverages) => (
              <BeverageCard
                key={beverages.id}
                beverages={beverages}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            ))}
          </div>

          <h3 className="font-heading mt-10 text-[#FFF5D6] text-5xl">Rum</h3>
          <div className="flex flex-wrap gap-4 max-w-[600px] justify-between">
            {rumBeverages.map((beverages) => (
              <BeverageCard
                key={beverages.id}
                beverages={beverages}
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
