"use client";

import { useEffect, useState } from "react";
import OrderMessage from "@/components/OrderMessage";
import { useParams } from "next/navigation";
import Image from "next/image";
import beerKeg from "@/public/images/Beer.svg";

export default function Order() {
  const params = useParams();
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
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={400}
          src={beerKeg}
          alt="beer keg"
          className="w-dvh h-auto -z-10 relative"
        ></Image>
      </section>
      <div className="min-h-screen pb-10 px-5 flex justify-center">
        <main className="max-w-[600px] text-center">
          <OrderMessage status={order.status} orderNumber={order.orderNumber} />
        </main>
      </div>
    </div>
  );
}
