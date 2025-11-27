import Image from "next/image";

// Async Server Component – henter kampene fra Firebase Realtime Database
export default async function MatchSchedule() {
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  // Hvis env-variablen ikke er sat, vis en simpel fejltekst i UI'et
  if (!baseUrl) {
    return (
      <section className="bg-[#000000] py-10 px-4">
        <div className="max-w-xs mx-auto text-center text-red-400 text-sm">
          NEXT_PUBLIC_FIREBASE_DATABASE_URL mangler i .env.local
        </div>
      </section>
    );
  }

  const cleanedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const url = `${cleanedBase}/footballmatch.json`;

  let matches = [];

  try {
    const response = await fetch(url, { cache: "no-store" });
    const dataObject = await response.json();

    if (dataObject) {
      matches = Object.keys(dataObject).map((key) => ({
        id: key,
        ...dataObject[key],
      }));
    }
  } catch (error) {
    console.error("Error fetching football matches:", error);
  }

  return (
    <section className="bg-[#000000] py-10 px-4">
      <div className="max-w-xs mx-auto">
        {/* Divider */}
        <div className="h-px bg-[#FFF5D6] mb-6" />

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#E5A702] mb-6 text-center tracking-[0.18em]">
          MATCH SCHEDULE
        </h2>

        {/* Matches List - Vertical Stack */}
        <div className="space-y-8">
          {matches.length > 0 ? (
            matches.map((match) => (
              <div key={match.id} className="space-y-3">
                {/* Date / Time header */}
                <div className="flex items-center justify-center text-[#FFF5D6] text-[11px] font-semibold tracking-[0.18em] uppercase">
                  <span>{(match.day || "").toUpperCase()}</span>
                  <span className="mx-2 h-4 w-px bg-white" />
                  <span>{match.date}</span>
                  <span className="mx-2 h-4 w-px bg-white" />
                  <span>{match.time}</span>
                </div>

                {/* Match ribbon with background image */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[230px] aspect-[9/1]">
                    {/* Baggrundsbillede med VS-grafik */}
                    <Image
                      src="/Images/matchsch.png"
                      alt="Match banner"
                      fill
                      className="object-contain"
                    />

                    {/* Indhold ovenpå banneret */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs">
                      {/* Venstre hold */}
                      <div className="flex items-center gap-2 min-w-0">
                        {match.team1Logo && (
                          <div className="relative w-7 h-7 flex-shrink-0 rounded-sm overflow-hidden bg-white">
                            <Image
                              src={match.team1Logo}
                              alt={match.team1Name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="font-semibold truncate text-[#000000]">
                          {match.team1Name}
                        </span>
                      </div>

                      {/* Højre hold */}
                      <div className="flex items-center gap-2 min-w-0 justify-end">
                        <span className="font-semibold truncate text-[#000000] text-right">
                          {match.team2Name}
                        </span>
                        {match.team2Logo && (
                          <div className="relative w-7 h-7 flex-shrink-0 rounded-sm overflow-hidden bg-white">
                            <Image
                              src={match.team2Logo}
                              alt={match.team2Name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-[#FFF5D6] text-center py-8 text-sm">
              <p>No matches scheduled yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
