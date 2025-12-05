"use client";

import BeverageCard from "@/components/BeverageCard";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BasketPage() {
  const [basketItems, setBasketItems] = useState([]);
  const router = useRouter();

  //get items in basket from local storage
  useEffect(() => {
    const stored = localStorage.getItem("beverageName");
    const arr = stored ? JSON.parse(stored) : [];
    setBasketItems(arr);
  }, []);

  async function sendOrder(formData) {
    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order.json`; // Get Firebase Realtime Database URL

    const name = formData.get("name");
    const phone = formData.get("phone");
    const comment = formData.get("comment");

    let orderNumber = Math.floor(Math.random() * 10000);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        comment,
        orderNumber,
        isDone: false,
        isCanceled: false,
        beverages: basketItems,
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      const data = await response.json(); // <-- Firebase returnerer { name: 'unik-id' }
      const id = data.name; // <-- det unikke id
      localStorage.removeItem("beverageName");
      router.push(`/orders/${id}`);
    }
  }

  // Count duplicates: { id: { ...bev, quantity: X } }
  const countedItems = basketItems.reduce((acc, bev) => {
    if (acc[bev.id]) acc[bev.id].quantity += 1;
    else acc[bev.id] = { ...bev, quantity: 1 };
    return acc;
  }, {});
  const uniqueItems = Object.values(countedItems);

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px]">
        <h1 className="font-heading mt-10 text-[#FFF5D6] text-5xl text-center font-semibold mb-4 tracking-tight ">
          Shopping Basket
        </h1>
        <h2 className="text-2xl mb-2 font-body text-[#FFF5D6]">
          Valgte drinks:
        </h2>
        {uniqueItems.length === 0 ? (
          <p>Ingen drinks valgt endnu.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {uniqueItems.map((bev) => (
              <BeverageCard
                key={bev.id}
                beverages={bev}
                basket="inBasket"
                basketItems={basketItems}
                setBasketItems={setBasketItems}
              />
            ))}
          </div>
        )}
        <Form action={sendOrder} />
      </main>
    </div>
  );
}
