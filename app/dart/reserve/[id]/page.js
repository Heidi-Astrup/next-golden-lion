"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import playDart from "@/public/images/playDart.svg";

export default function DartOrder() {
  const params = useParams();
  const { id } = params;

  const [dartOrder, setDartOrder] = useState(null);

  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/dartOrders/${id}.json`;

  useEffect(() => {
    async function fetchDartOrder() {
      const response = await fetch(url);
      const data = await response.json();
      setDartOrder(data);
    }

    fetchDartOrder();
  }, [url]);

  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={400}
          src={playDart}
          alt="beer keg"
          className="w-dvh h-auto -z-10 relative"
        />
      </section>

      <div className="min-h-screen pb-10 px-5 flex justify-center">
        <main className="max-w-[600px] text-center">
          <h2 className="text-3xl font-semibold mb-4">
            DU har til kl. {dartOrder.timeslot}
          </h2>
          <p className="text-xl">Dart nummer: {dartOrder.dartNumber}</p>
        </main>
      </div>
    </div>
  );
}
