"use client";

import BeverageCard from "@/components/BeverageCard";
import Form from "@/components/Form";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function BasketPage() {
  const [beverageArray, setBeverageArray] = useState([]);
  let orderNumber = 1;

  useEffect(() => {
    const stored = localStorage.getItem("beverageName");
    const arr = stored ? JSON.parse(stored) : [];
    setBeverageArray(arr);
  }, []);

  async function sendOrder(formData) {
    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order.json`; // Get Firebase Realtime Database URL

    const name = formData.get("name");
    const phone = formData.get("phone");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        orderNumber: orderNumber++,
        isDone: false,
        isCanceled: false,
        beverages: beverageArray,
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      localStorage.removeItem("beverageName");
      redirect(`/menu/basket/order/${id}`);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px]">
        <h1 className="font-heading mt-10 text-[#FFF5D6] text-5xl text-center font-semibold mb-4 tracking-tight ">
          Shopping Basket
        </h1>
        <h2 className="text-2xl mb-2 font-body text-[#FFF5D6]">
          Valgte drinks:
        </h2>
        {beverageArray.length === 0 ? (
          <p>Ingen drinks valgt endnu.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {beverageArray.map((bev) => (
              <BeverageCard key={bev.id} beverages={bev} />
            ))}
          </div>
        )}
        <Form action={sendOrder} />
      </main>
    </div>
  );
}
