"use client";

import OrderCard from "@/components/OrderCard";
import { useEffect, useState } from "react";

export default function Staff() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order.json`;
      const response = await fetch(url);
      const dataObject = await response.json();

      const orderList = Object.keys(dataObject).map((key) => ({
        id: key,
        ...dataObject[key],
      }));

      const filteredOrders = orderList.filter(
        (order) => order.isDone !== true && order.isCanceled !== true
      );

      setOrders(filteredOrders);
    }

    fetchOrders();
  }, []);

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

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-heading font-semibold mb-4 tracking-tight text-[#ffffff]">
          Staff page
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">Ingen ordrer endnu.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {orders.map((order) => (
              <div
                key={order.id}
                className="text-left border-4 border-[#E5A702] p-4 rounded-2xl"
              >
                <p className="text-[#E5A702] text-2xl p-4">
                  Order ID: {order.id}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {order.beverages && order.beverages.length > 0 ? (
                    order.beverages.map((beverages) => (
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
        )}
      </main>
    </div>
  );
}
