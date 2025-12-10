"use client";

import OrderBox from "@/components/OrderBox";
import { useEffect, useState } from "react";

export default function Staff() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Protect this page with Firebase Auth. We initialize the app locally here
    // (avoids importing a shared client) and attach an auth state listener.
    let unsubscribeAuth = null;
    let unsubscribeOrders = null;

    async function initAndFetch() {
      try {
        const { initializeApp, getApps } = await import("firebase/app");
        const {
          getAuth,
          onAuthStateChanged,
          setPersistence,
          browserLocalPersistence,
        } = await import("firebase/auth");
        const { getDatabase, ref, onValue, off } = await import(
          "firebase/database"
        );

        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        let app;
        if (!getApps() || getApps().length === 0) {
          app = initializeApp(firebaseConfig);
        } else {
          app = getApps()[0];
        }

        const auth = getAuth(app);

        // Ensure persistence so staff stays signed in across reloads
        await setPersistence(auth, browserLocalPersistence);

        unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            // Not signed in — redirect to login
            const { default: router } = await import("next/router");
            // In app router we can use location fallback
            if (typeof unsubscribeOrders === "function") unsubscribeOrders();
            window.location.href = "/staff";
            return;
          }

          // Signed in — subscribe to orders so staff view updates live
          try {
            const db = getDatabase(app);
            const orderRef = ref(db, "order");

            const handleSnapshot = (snapshot) => {
              const dataObject = snapshot.val();
              const orderList = Object.keys(dataObject || {}).map((key) => ({
                id: key,
                ...dataObject[key],
              }));

              const filteredOrders = orderList.filter(
                (order) => order.isDone !== true && order.isCanceled !== true
              );

              setOrders(filteredOrders);
            };

            const unsubscribe = onValue(orderRef, handleSnapshot, (err) => {
              console.error("Failed to subscribe to orders:", err);
            });
            unsubscribeOrders = () => {
              off(orderRef, "value", handleSnapshot);
              if (typeof unsubscribe === "function") unsubscribe();
            };
          } catch (err) {
            console.error("Failed to subscribe to orders:", err);
          }
        });

        // nothing to return here from async fn — cleanup handled below
      } catch (err) {
        console.error("Auth/init error:", err);
        // fallback: redirect to login
        window.location.href = "/staff";
      }
    }

    initAndFetch();

    return () => {
      if (typeof unsubscribeOrders === "function") unsubscribeOrders();
      if (typeof unsubscribeAuth === "function") unsubscribeAuth();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-heading font-semibold mb-4 tracking-tight text-[#ffffff]">
          Staff page
        </h1>
        <OrderBox key={orders.id} orders={orders} setOrders={setOrders} />
      </main>
    </div>
  );
}
