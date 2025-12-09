"use client";

import { useEffect, useState } from "react";
import OrderMessage from "@/components/OrderMessage";
import { useParams } from "next/navigation";
import Image from "next/image";
import beerKeg from "@/public/images/Beer.svg";

// Subscribe to Firebase Realtime Database so the order status updates live
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";

export default function Order() {
  const params = useParams();
  const { id } = params;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    let unsubscribeOrder = null;

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    // Lazy init client app
    const app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getDatabase(app);
    const orderRef = ref(db, `order/${id}`);

    const handleSnapshot = (snapshot) => {
      const data = snapshot.val();

      let status;
      if (data?.isCanceled) status = "canceled";
      else if (data?.isDone) status = "done";
      else status = "pending";

      setOrder({ ...data, status });
    };

    unsubscribeOrder = onValue(orderRef, handleSnapshot, (err) => {
      console.error("Failed to subscribe to order", err);
    });

    return () => {
      off(orderRef, "value", handleSnapshot);
      if (typeof unsubscribeOrder === "function") unsubscribeOrder();
    };
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
