import Form from "@/components/Form";
import { redirect } from "next/navigation";

export default function BasketPage({ name }) {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/order.json`; // Get Firebase Realtime Database URL

  async function sendOrder(formData) {
    "use server";
    const name = formData.get("name");
    const phone = formData.get("phone");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      redirect("/menu/basket/order");
    }
  }

  console.log(localStorage.getItem("beverageName"));
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex justify-between">
      <main className="max-w-[600px]">
        <h1 className="font-heading mt-10 text-[#FFF5D6] text-5xl text-center font-semibold mb-4 tracking-tight ">
          Shopping Basket
        </h1>
        <Form action={sendOrder} />
      </main>
    </div>
  );
}
