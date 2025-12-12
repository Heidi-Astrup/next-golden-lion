import Form from "@/components/Form";
import Image from "next/image";
import playDart from "@/public/images/playDart.svg";

export default function ReserveDart() {
  function sendDartOrder() {
    alert("valgt timesloth");
  }

  async function sendDartOrder(formData) {
    const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/dartOrders.json`; // Get Firebase Realtime Database URL

    const name = formData.get("name");
    const phone = formData.get("phone");

    let dartNumber = Math.floor(Math.random() * 10000);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        dartNumber,
        createdAt: new Date().toISOString(), // Add creation timestamp
      }),
    });

    if (response.ok) {
      const data = await response.json(); // <-- Firebase returnerer { name: 'unik-id' }
      const id = data.name; // <-- det unikke id
      router.push(`/reserve/${id}`);
    }
  }

  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={400}
          src={playDart}
          alt="beer keg"
          className="w-dvh h-auto -z-10 relative"
        />
      </section>

      <div className="min-h-screen pb-10 px-5 flex justify-between">
        <main className="max-w-[600px]">
          <h1 className="font-heading mt-10 text-[#e5a702] text-5xl text-center font-semibold tracking-tight m-auto mb-8">
            Dart
          </h1>
          <h3 className="font-heading text-lg text-[#FFF5D6] mb-8">
            Pick a timesloth
          </h3>
          <Form action={sendDartOrder} />
        </main>
      </div>
    </div>
  );
}
