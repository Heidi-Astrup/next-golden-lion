import Image from "next/image";
import Link from "next/link";
import KaraokeInfoButton from "@/components/KaraokeInfoButton";

// Marker siden som dynamisk, så den altid henter friske data fra Firebase
// Dette sikrer at kø-listen altid viser de nyeste tilmeldinger
export const dynamic = "force-dynamic";

// Hjælpefunktion: parse længde ("3:45") til sekunder
function parseLengthToSeconds(lengthStr) {
  if (!lengthStr || typeof lengthStr !== "string") return 0; // mangler længde er 0 sek
  const parts = lengthStr.split(":").map((p) => parseInt(p, 10)); // Split i minutter/sekunder
  if (parts.length === 2 && !parts.some(Number.isNaN)) {
    const [m, s] = parts; // træk min/sek ud
    return m * 60 + s; // konverter til sekunder
  }
  return 0;
}

// Tilmeldinger gemmes i Firebase under /karaokeSignups.json når brugeren trykker SIGN UP
export default async function KaraokePage() {
  // Hent Firebase database URL fra environment variabler
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  // Start med tom kø-liste – fyldes op hvis vi kan hente data fra Firebase
  let queue = [];

  // Cutoff på 3 timer (i millisekunder) – gamle tilmeldinger fjernes
  const threeHoursMs = 3 * 60 * 60 * 1000;
  const staleIds = [];

  // Formattere tider til dansk tid (bruges både i data-fetch og i UI)
  const timeFormatter = new Intl.DateTimeFormat("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });
  const labelFormatter = new Intl.DateTimeFormat("da-DK", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  });

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
          // Beregn cutoff inde i async-blokken for at undgå impure kald i render
          const now = new Date().getTime();
          const cutoff = now - threeHoursMs;

          queue = Object.entries(data)
            .map(([id, signup]) => {
              // Hvis createdAt mangler eller er ældre end cutoff, marker til sletning
              const createdAtDate = signup.createdAt
                ? new Date(signup.createdAt)
                : null;
              const isStale =
                !createdAtDate ||
                Number.isNaN(createdAtDate.getTime()) ||
                createdAtDate.getTime() < cutoff;
              if (isStale) {
                staleIds.push(id);
                return null;
              }

              // Beregn længde i sekunder til estimat/readyAt (men brug ikke til sletning)
              const lengthSec = parseLengthToSeconds(signup.length || "");

              // Formater sang-navn til at vise "Artist — Title" hvis begge findes
              // Eller bare "Title" eller "Artist" hvis kun en findes
              // Eller "No song selected" hvis ingen sang er valgt
              const songName =
                signup.artist && signup.title
                  ? `${signup.artist} — ${signup.title}`
                  : signup.title || signup.artist || "No song selected";

              // Formater tidspunkt fra createdAt til "HH:MM" format
              // og en mere præcis timestamp (dato + klokkeslæt)
              let time = "";
              let createdAtLabel = "";
              if (signup.createdAt) {
                const date = new Date(signup.createdAt);
                if (!Number.isNaN(date.getTime())) {
                  time = timeFormatter.format(date);
                  createdAtLabel = labelFormatter.format(date);
                }
              }

              // Returner formateret tilmelding klar til at blive vist i kø-listen
              return {
                id, // Firebase ID (fx "abc123")
                name: signup.name || "Unknown", // Brugerens navn
                song: songName, // Formateret sang-navn
                time, // Formateret tidspunkt (fx "23:30")
                createdAt: signup.createdAt || "", // Behold original createdAt til sortering
                createdAtLabel, // Læsevenlig timestamp (dd/mm kl. hh:mm)
                lengthSec, // Sangens længde i sekunder (bruges til estimat)
              };
            })
            .filter(Boolean) // fjern stale/null entries
            // Sorter efter createdAt (ældste først, så de kommer i kø-rækkefølge)
            // Den første der tilmeldte sig skal være først i køen
            .sort((a, b) => {
              if (!a.createdAt || !b.createdAt) return 0;
              // Sorter kronologisk: ældste dato først (mindste timestamp først)
              return new Date(a.createdAt) - new Date(b.createdAt);
            });

          // Beregn estimeret starttidspunkt (readyAt) for hver i køen som på confirmed-siden
          queue = queue.map((item, idx, arr) => {
            const before = arr.slice(0, idx);
            const totalSec = before.reduce(
              (sum, prev) => sum + (prev.lengthSec || 0),
              0
            );
            let readyAt = null;
            if (item.createdAt) {
              const createdAtDate = new Date(item.createdAt);
              if (!Number.isNaN(createdAtDate.getTime())) {
                readyAt = new Date(createdAtDate.getTime() + totalSec * 1000);
              }
            }
            return { ...item, readyAt };
          });

          // Slet stale tilmeldinger (ældre end 3 timer)
          if (staleIds.length > 0) {
            await Promise.all(
              staleIds.map((id) =>
                fetch(`${cleanedBase}/karaokeSignups/${id}.json`, {
                  method: "DELETE",
                }).catch(() => null)
              )
            );
          }
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

      <main className="min-h-screen pt-4 pb-2">
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
              className="w-full flex items-center justify-center gap-3 bg-[#E5A702] text-black font-light py-7 rounded-lg text-3xl tracking-[0.1em] uppercase"
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
                    <div className="flex flex-col min-w-0">
                      <span className="text-xl text-[#E5A702] font-semibold">
                        {item.name}
                      </span>
                      <span className="text-sm truncate">{item.song}</span>
                    </div>
                    {/* Estimeret starttid (samme logik som confirmed); fallback til tilmeldingstid */}
                    <span className="text-sm text-right text-[#FFF5D6]/80">
                      {item.readyAt
                        ? (() => {
                            const d = new Date(item.readyAt);
                            return Number.isNaN(d.getTime())
                              ? item.time
                              : timeFormatter.format(d);
                          })()
                        : item.time}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Karaoke schedule */}
          <section className="mb-2 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#E5A702] mb-8 tracking-[0.12em]">
              Karaokedays
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-2xl md:text-3xl text-[#FFF5D6]">
                  Every <span className="font-bold">Thursday</span> at
                </p>
                <p className="text-2xl md:text-3xl text-[#FFF5D6]">
                  23:00-03:00
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl text-[#FFF5D6]">
                  Every <span className="font-bold">Friday</span> at 23:00-03:00
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl text-[#FFF5D6]">
                  Every <span className="font-bold">Saturday</span> at
                </p>
                <p className="text-2xl md:text-3xl text-[#FFF5D6]">
                  23:00-03:00
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
