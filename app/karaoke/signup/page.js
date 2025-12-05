import Image from "next/image";
import { redirect } from "next/navigation";
import Form from "@/components/Form";

// searchParams indeholder de query-params vi sender fra findsong-siden (artist, title, length)
export default async function KaraokeSignUpPage({ searchParams }) {

  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;

  // Læs valgt sang ud fra URL'en (?artist=...&title=...&length=...)
  const artist = params?.artist;
  const title = params?.title;
  const length = params?.length;

  // Bruges til at afgøre om vi har en sang eller skal vise "No song selected"
  const hasSong = artist || title || length;

  // Endpoint i Firebase, hvor karaoke-tilmeldinger gemmes
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/karaokeSignups.json`;

  // Server Action som bliver kaldt når brugeren trykker SIGN UP
  async function sendKaraokeSignup(formData) {
    "use server";

    // Hent navn og telefon fra formen
    const name = formData.get("name");
    const phone = formData.get("phone");

    // Hent sang-data fra hidden inputs (sikrer at det virker i production/Vercel)
    const artist = formData.get("artist");
    const title = formData.get("title");
    const length = formData.get("length");

    // Gem tilmeldingen i Firebase sammen med den valgte sang
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
        artist: artist || null,
        title: title || null,
        length: length || null,
        createdAt: new Date().toISOString(),
      }),
    });

    // Efter succesfuld signup sender vi brugeren til bekræftelsessiden
    redirect("/karaoke/confirmed");
  }

  return (
    <div className="bg-[#000000] text-[#FFF5D6] min-h-screen">
      {/* Hero-billede */}
      <section className="relative w-full h-[260px] mt-0">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="pt-6 pb-16">
        <div className="max-w-sm mx-auto px-6">
          {/* Overskrift */}
          <section className="mt-2 mb-8 text-center">
            <h1 className="font-heading text-[#E5A702] text-4xl leading-tight">
              <span className="block tracking-[0.16em]">Sign Up for</span>
              <span className="block tracking-[0.16em]">karaoke</span>
            </h1>
          </section>

          {/* Valgt sang – viser enten den valgte sang fra findsong eller "No song selected" */}
          <section className="mb-8">
            <p className="font-heading text-[#E5A702] text-2xl mb-2">
              Chosen song
            </p>
            <div className="bg-[#FFF5D6] text-black rounded-lg px-4 py-3 flex items-center justify-between text-sm">
              <span className="font-body">
                {hasSong
                  ? `${artist ?? ""}${artist && title ? " — " : ""}${
                      title ?? ""
                    }`
                  : "No song selected"}
              </span>
              <span className="ml-4 shrink-0 font-body">
                {hasSong ? length : ""}
              </span>
            </div>
          </section>

          {/* Formular til navn og telefonnummer – genbruger Form men med SIGN UP-knap
              Hidden fields sender sang-dataen med til server action'en, så den virker i production */}
          <Form
            action={sendKaraokeSignup}
            submitLabel="SIGN UP"
            hiddenFields={{
              artist: artist || "",
              title: title || "",
              length: length || "",
            }}
          />
        </div>
      </main>
    </div>
  );
}
