import Form from "@/components/Form";

export default function BasketPage() {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/guests.json`; // Get Firebase Realtime Database URL

  async function sendOrder(formData) {
    "use server";
    const name = formData.get("name");
    const phone = formData.get("phone");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        uid: "OPPe5jue2Ghxx3mtnxevB5FwCYe2", // TODO: Replace with actual user ID from auth
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      redirect("/menu/basket/order");
    }
  }
  return (
    <div>
      <h1>Shopping Basket</h1>
      <Form action={sendOrder} />
    </div>
  );
}
