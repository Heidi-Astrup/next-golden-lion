"use client";

import { useEffect, useState } from "react";
import OrderMessage from "@/components/OrderMessage";

export default function Order({ params }) {
  const { id } = params;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order/${id}.json`;
      const res = await fetch(url);
      const data = await res.json();

      // Bestem status
      let status;
      if (data?.isCanceled) status = "canceled";
      else if (data?.isDone) status = "done";
      else status = "pending";

      setOrder({ ...data, status });
    }

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-center">
      <main className="max-w-[600px] text-center">
        <h1 className="text-[#E5A702] font-heading text-5xl mb-8">
          Order status
        </h1>
        <OrderMessage status={order.status} orderNumber={order.orderNumber} />
      </main>
    </div>
  );
}
