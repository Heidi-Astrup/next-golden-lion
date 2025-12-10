//"use client";

import OrderCard from "@/components/OrderCard";
//import { useState } from "react";

export default function OrderBox({ orders, setOrders }) {
  //const [orders, setOrders] = useState();

  async function orderDone(orderId) {
    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order/${orderId}.json`; // Get Firebase Realtime Database URL

    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        isDone: true,
      }),
    });

    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  }

  async function orderCanceled(orderId) {
    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order/${orderId}.json`; // Get Firebase Realtime Database URL

    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        isCanceled: true,
      }),
    });

    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  }

  function countBeverages(beverages) {
    return Object.values(
      beverages.reduce((acc, bev) => {
        if (!bev || typeof bev !== "object" || !bev.id) return acc;

        if (acc[bev.id]) acc[bev.id].quantity += 1;
        else acc[bev.id] = { ...bev, quantity: 1 };

        return acc;
      }, {})
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        {orders.map((order) => (
          <div
            key={order.id}
            className="text-left border-4 border-[#E5A702] p-4 rounded-2xl"
          >
            <p className="text-[#E5A702] text-2xl p-4">Order ID: {order.id}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {order.beverages && order.beverages.length > 0 ? (
                countBeverages(order.beverages).map((beverages) => (
                  <OrderCard
                    key={beverages.id}
                    beverages={beverages}
                    phone={order.phone}
                    name={order.name}
                  />
                ))
              ) : (
                <p className="text-white">Ingen ordrer endnu.</p>
              )}
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => orderDone(order.id)}
                className="bg-[#E5A702] w-4/4 font-bold p-2 rounded-[10px] text-black text-3xl"
              >
                DONE
              </button>
              <button
                onClick={() => orderCanceled(order.id)}
                className="bg-black w-4/4 font-bold p-2 border-2 border-[#E5A702] rounded-[10px] text-[#E5A702] text-3xl"
              >
                CANCEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
