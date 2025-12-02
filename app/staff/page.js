"use client";
import BeverageCard from "@/components/BeverageCard";
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
      setOrders(orderList);
    }

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-heading font-semibold mb-4 tracking-tight text-[#ffffff]">
          Staff page
        </h1>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">
          A modern post app built with Next.js 16, featuring Server Components,
          Server Actions, and Firebase integration.
        </p>
        {orders.length === 0 ? (
          <p className="text-gray-400">Ingen ordrer endnu.</p>
        ) : (
          <div className="flex flex-col gap-10 border-4 border-[#E5A702] p-4">
            {orders.map((order) => (
              <div key={order.id} className="text-left">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Kunde: {order.name} | Telefon: {order.phone}
                </h2>
                <p className="text-gray-400 mb-4">
                  Tidspunkt: {new Date(order.createdAt).toLocaleString()}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {order.beverages && order.beverages.length > 0 ? (
                    order.beverages.map((bev) => (
                      <BeverageCard key={bev.id} beverages={bev} />
                    ))
                  ) : (
                    <p className="text-white">Ingen drinks valgt.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
