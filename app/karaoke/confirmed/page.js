import Image from "next/image";

// Hjælpefunktion: parse længde ("3:45" eller "03:45") til sekunder
function parseLengthToSeconds(lengthStr) {
  if (!lengthStr || typeof lengthStr !== "string") return 0;
  const parts = lengthStr.split(":").map((p) => parseInt(p, 10));
  if (parts.length === 2 && !parts.some(Number.isNaN)) {
    const [m, s] = parts;
    return m * 60 + s;
  }
  return 0;
}

// Hjælpefunktion: format sekunder til MM:SS
function formatSeconds(sec) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Simpel bekræftelsesside efter karaoke signup – med estimeret ventetid
export default async function KaraokeConfirmedPage({ searchParams }) {
  const params =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const currentId = params?.id || "";

  let estimatedSeconds = null;

  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (baseUrl) {
    try {
      const cleanedBase = baseUrl.replace(/\/$/, "");
      const url = `${cleanedBase}/karaokeSignups.json`;
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === "object") {
          const twelveHoursMs = 12 * 60 * 60 * 1000;
          const cutoff = Date.now() - twelveHoursMs;

          // Lav liste og sorter efter createdAt (ældste først)
          const queue = Object.entries(data)
            .map(([id, signup]) => ({
              id,
              createdAt: signup.createdAt || "",
              lengthStr: signup.length || "",
              lengthSec: parseLengthToSeconds(signup.length || ""),
            }))
            // Filtrer tilmeldinger der er nyere end 12 timer
            .filter((item) => {
              if (!item.createdAt) return false;
              const d = new Date(item.createdAt);
              if (Number.isNaN(d.getTime())) return false;
              return d.getTime() >= cutoff;
            })
            .sort((a, b) => {
              if (!a.createdAt || !b.createdAt) return 0;
              return new Date(a.createdAt) - new Date(b.createdAt);
            });

          // Find nuværende bruger i køen
          const index = queue.findIndex((item) => item.id === currentId);

          if (index >= 0) {
            // Summér længderne for alle foran i køen
            const before = queue.slice(0, index);
            const totalSec = before.reduce(
              (sum, item) => sum + (item.lengthSec || 0),
              0
            );
            estimatedSeconds = totalSec;
          }
        }
      }
    } catch (error) {
      console.error("Error calculating estimated time:", error);
      estimatedSeconds = null;
    }
  }

  const estimateLabel =
    estimatedSeconds !== null ? formatSeconds(estimatedSeconds) : "--:--";

  return (
    <div className="bg-[#000000] text-[#FFF5D6] min-h-screen">
      {/* Hero-billede – samme som på de andre karaoke-sider */}
      <section className="relative w-full h-[260px] mt-4">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        {/* Gradient i bunden af billedet – gjort lidt lavere så mere af billedet ses */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      {/* Mindre bottom-padding så footeren kommer lidt højere op på skærmen */}
      <main className="pt-0 pb-10">
        <div className="max-w-sm mx-auto px-6 text-center">
          <section className="mt-0 mb-14">
            <p className="text-5xl font-heading font-bold text-[#E5A702] leading-snug">
              Great you are
              <br />
              now on the
              <br />
              karaoke list!
            </p>
          </section>

          <section className="mb-6">
            <p className="text-4xl font-heading mb-4">
              Your estimated time
              <br />
              to sing is
            </p>
            <p className="text-[120px] leading-none font-heading text-[#E5A702]">
              {estimateLabel}
            </p>
          </section>

          <section className="-mt-2">
            <p className="text-2xl font-body font-bold leading-relaxed">
              We&apos;ll call your name when it&apos;s
              <br />
              your turn on stage!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
