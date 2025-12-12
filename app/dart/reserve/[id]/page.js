// Dart bekræftelsesside - viser reservationens detaljer efter booking
// "use client" er nødvendigt fordi siden bruger useState, useEffect og useParams til at hente dynamisk data
// Uden "use client" vil Next.js prøve at rendere komponenten på serveren, hvilket giver fejl fordi hooks kun virker i client components
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import playDart from "@/public/images/playDart.svg";

export default function DartOrder() {
  // Hent reservation ID fra URL'en
  const params = useParams();
  const { id } = params;

  // State til at holde reservation data fra Firebase
  const [dartOrder, setDartOrder] = useState(null);

  // URL til at hente reservation fra Firebase
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/dartOrders/${id}.json`;

  // Hent reservation data fra Firebase når siden indlæses
  useEffect(() => {
    async function fetchDartOrder() {
      const response = await fetch(url);
      const data = await response.json();
      setDartOrder(data);
    }

    fetchDartOrder();
  }, [url]);

  // Vis loading besked mens data hentes
  if (!dartOrder) {
    return (
      <div className="bg-[#000000] text-[#FFF5D6] min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] text-[#FFF5D6] h-auto">
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

      <main className="pt-4 pb-0">
        <div className="max-w-sm mx-auto px-6 text-center">
          {/* Bekræftelsesoverskrift */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#E5A702] mb-12 leading-tight">
            Great! Your time for dart have been reserved
          </h1>

          {/* Vis det reserverede tidspunkt i en gul box */}
          <div className="bg-[#E5A702] text-black rounded-lg py-6 px-12 mb-12 inline-block">
            <p className="text-4xl md:text-5xl font-heading font-normal">
              {dartOrder.timeslot || "Time slot"}
            </p>
          </div>

          {/* Instruktioner til brugeren */}
          <p className="text-2xl md:text-3xl font-body text-[#FFF5D6] mb-8">
            Provide your number at the bar to get darts, then it&apos;s your
            turn.
          </p>

          {/* Vis reservation nummeret */}
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-body text-[#FFF5D6] mb-2">
              Your Number:
            </p>
            <p className="text-5xl md:text-6xl font-heading font-bold text-white">
              {dartOrder.dartNumber}
            </p>
          </div>

          {/* Tilbage til hjem knap */}
          <Link
            href="/"
            className="inline-block bg-[#E5A702] text-black font-heading text-2xl px-10 py-5 rounded-lg hover:brightness-110 transition-all"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
