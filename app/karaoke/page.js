import Image from "next/image";
import Link from "next/link";
import KaraokeInfoButton from "@/components/KaraokeInfoButton";

// Marker siden som dynamisk, så den altid henter friske data fra Firebase
// Dette sikrer at kø-listen altid viser de nyeste tilmeldinger
export const dynamic = "force-dynamic";

// Hovedkomponenten for karaoke-siden – henter og viser alle karaoke-tilmeldinger
// Tilmeldinger gemmes i Firebase under /karaokeSignups.json når brugeren trykker SIGN UP
export default async function KaraokePage() {
  // Hent Firebase database URL fra environment variabler
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  // Start med tom kø-liste – fyldes op hvis vi kan hente data fra Firebase
  let queue = [];

  // Hvis vi har en Firebase URL, henter vi alle tilmeldinger
  if (baseUrl) {
    try {
      // Rens URL'en (fjern evt. trailing slash) og byg stien til karaoke-tilmeldinger
      const cleanedBase = baseUrl.replace(/\/$/, "");
      const url = `${cleanedBase}/karaokeSignups.json`;

      // Hent alle tilmeldinger fra Firebase
      // cache: "no-store" sikrer at vi ALTID får de nyeste data (ingen caching)
      // Dette betyder at hver gang siden indlæses, hentes friske data fra Firebase
      const response = await fetch(url, { cache: "no-store" });

      if (response.ok) {
        // Firebase returnerer et objekt hvor hver nøgle er et unikt ID (fx "abc123")
        // og værdien er tilmeldingen (name, phone, artist, title, length, createdAt)
        const data = await response.json();

        // Konverter Firebase-objekt til array og formater dataen til kø-format
        if (data && typeof data === "object") {
          queue = Object.entries(data)
            .map(([id, signup]) => {
              // Formater sang-navn til at vise "Artist — Title" hvis begge findes
              // Eller bare "Title" eller "Artist" hvis kun en findes
              // Eller "No song selected" hvis ingen sang er valgt
              const songName =
                signup.artist && signup.title
                  ? `${signup.artist} — ${signup.title}`
                  : signup.title || signup.artist || "No song selected";

              // Formater tidspunkt fra createdAt (ISO string) til "HH:MM" format
              // Fx "2024-01-15T23:30:00.000Z" bliver til "23:30"
              let time = "";
              if (signup.createdAt) {
                const date = new Date(signup.createdAt);
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                time = `${hours}:${minutes}`;
              }

              // Returner formateret tilmelding klar til at blive vist i kø-listen
              return {
                id, // Firebase ID (fx "abc123")
                name: signup.name || "Unknown", // Brugerens navn
                song: songName, // Formateret sang-navn
                time, // Formateret tidspunkt (fx "23:30")
                createdAt: signup.createdAt || "", // Behold original createdAt til sortering
              };
            })
            // Sorter efter createdAt (ældste først, så de kommer i kø-rækkefølge)
            // Den første der tilmeldte sig skal være først i køen
            .sort((a, b) => {
              if (!a.createdAt || !b.createdAt) return 0;
              // Sorter kronologisk: ældste dato først (mindste timestamp først)
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
        }
      }
    } catch (error) {
      // Hvis der er fejl ved at hente data (fx Firebase er nede eller URL er forkert),
      // log fejlen men vis bare en tom liste i stedet for at crashe hele siden
      console.error("Error loading karaoke queue:", error);
      // queue forbliver tom array, så vi viser "No one in the queue yet" beskeden
    }
  }
  return (
    <div className="bg-[#000000] text-[#FFF5D6]">
      {/* Karaoke-billede i headeren – længere nede under navigationen */}
      <section className="relative w-full h-[300px] mt-0">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        {/* Gradient i bunden af billedet */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="min-h-screen pt-4 pb-16">
        {/* Indhold i smal kolonne ligesom på screenshot */}
        <div className="max-w-sm mx-auto px-6">
          {/* Overskrift og tekst */}
          <section className="text-center mt-0 mb-8">
            <h1 className="text-5xl font-heading font-bold text-[#E5A702] tracking-[0.18em] mb-3">
              KARAOKE
            </h1>
            <p className="text-xl font-body mb-5">
              Karaoke Nights at The Golden Lion!
            </p>
            <p className="text-lg font-body leading-relaxed">
              Grab the mic and shine! Join us for fun-filled karaoke nights
              where everyone can sing along, laugh, and enjoy the vibe. Whether
              you&apos;re a superstar or a first-timer, The Golden Lion is the
              perfect place to let your voice be heard.
            </p>
          </section>

          {/* Divider og Sign Up-knap med spørgsmålstegn-popup */}
          <section className="text-center mb-12">
            <div className="h-px w-full bg-[#FFF5D6] mb-8" />

            <Link
              href="/karaoke/findsong"
              className="w-full flex items-center justify-center gap-5 bg-[#E5A702] text-black font-light py-7 rounded-lg text-3xl tracking-[0.1em] uppercase"
            >
              SIGN UP
              <KaraokeInfoButton />
            </Link>

            <div className="h-px w-full bg-[#FFF5D6] mt-10" />
          </section>

          {/* Karaoke Queue liste – viser alle tilmeldinger i kø-rækkefølge
              Hver tilmelding viser: navn (i cirkel), sang-navn, og tidspunkt for tilmelding */}
          <section className="mb-10">
            <h2 className="text-4xl font-bold text-[#E5A702] mb-6 tracking-[0.12em]">
              Karaoke Queue
            </h2>

            <div className="space-y-4">
              {/* Hvis der ikke er nogen tilmeldinger endnu, vis en venlig besked */}
              {queue.length === 0 ? (
                <p className="text-sm text-[#FFF5D6]/60 text-center py-4">
                  No one in the queue yet. Be the first to sign up!
                </p>
              ) : (
                // Vis alle tilmeldinger i kø-rækkefølge (ældste først)
                // Hver tilmelding er en række med: navn (i guld cirkel), sang-navn, og tidspunkt
                queue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-4 rounded-full border border-[#3A3A3A] bg-[#0C0C0C]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Vis brugerens navn i en guld cirkel (kun første bogstav eller forkortelse) */}
                      <div className="w-10 h-10 rounded-full border border-[#E5A702] flex items-center justify-center text-xs font-semibold text-[#E5A702]">
                        {item.name}
                      </div>
                      {/* Sang-navnet (fx "Adele — Hello") – truncate hvis det er for langt */}
                      <span className="text-sm truncate">{item.song}</span>
                    </div>
                    {/* Tidspunkt for tilmelding (fx "23:30") – vises til højre */}
                    <span className="text-sm text-right text-[#FFF5D6]/80">
                      {item.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
