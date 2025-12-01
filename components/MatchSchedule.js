// MatchSchedule komponent - henter og viser fodboldkampe fra Firebase Realtime Database
import Image from "next/image";

// Async Server Component – henter kampene fra Firebase Realtime Database
export default async function MatchSchedule() {
  // Hent Firebase database URL fra environment variabler
  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  // Tjek om environment variablen er sat
  if (!baseUrl) {
    return (
      <section className="bg-[#000000] py-10 px-4">
        <div className="max-w-xs mx-auto text-center text-red-400 text-sm">
          NEXT_PUBLIC_FIREBASE_DATABASE_URL mangler i .env.local
        </div>
      </section>
    );
  }

  // Fjern eventuelle whitespace og tjekker at det er en gyldig URL
  const cleanUrl = baseUrl.trim();
  // Valider at URL'en starter med http/https
  if (!cleanUrl.startsWith("http")) {
    return (
      <section className="bg-[#000000] py-10 px-4">
        <div className="max-w-xs mx-auto text-center text-red-400 text-sm">
          Ugyldig URL format i .env.local: {cleanUrl.substring(0, 50)}...
        </div>
      </section>
    );
  }

  // Byg URL til Firebase endpoint
  // Fjern trailing slash hvis den findes
  const cleanedBase = cleanUrl.endsWith("/") ? cleanUrl.slice(0, -1) : cleanUrl;
  // Konstruer fuld URL til footballmatch node i Firebase
  const url = `${cleanedBase}/footballmatch.json`;

  // Initialiser matches array og error message
  let matches = [];
  let errorMessage = null;

  // Hent kampe fra Firebase
  try {
    // Fetch data fra Firebase (no-store for at undgå caching)
    const response = await fetch(url, { cache: "no-store" });

    // Tjek om fetch var succesfuld
    if (!response.ok) {
      errorMessage = `HTTP error! status: ${response.status}`;
      console.error("Fetch error:", errorMessage);
    } else {
      // Parse JSON response
      const dataObject = await response.json();

      // Tjek om data er et objekt (Firebase returnerer objekter med keys)
      if (dataObject && typeof dataObject === "object") {
        // Hent alle keys fra Firebase objektet
        const keys = Object.keys(dataObject);

        // Konverter Firebase data til match objekter
        matches = keys.map((key) => {
          const match = dataObject[key];

          // Formatér dato fra "2025-12-01" til "DEC 1, 2025"
          const dateObj = match.date ? new Date(match.date) : null;
          // Månedsnavne array til dato formatering
          const months = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ];
          // Formatér dato til "MONTH DAY, YEAR" format
          const formattedDate = dateObj
            ? `${
                months[dateObj.getMonth()]
              } ${dateObj.getDate()}, ${dateObj.getFullYear()}`
            : match.date || "";

          // Returner match objekt med standardiseret struktur
          return {
            id: key, // Firebase key som unik ID
            day: match.weekday || "", // Ugedag
            date: formattedDate, // Formateret dato
            time: match.time || "", // Kamp tid
            team1Name: match.team_home || "", // Hjemmehold navn
            team1Logo: match.home_logo || "", // Hjemmehold logo URL
            team2Name: match.team_away || "", // Udehold navn
            team2Logo: match.away_logo || "", // Udehold logo URL
          };
        });
      } else {
        // Hvis data ikke er et objekt, vis fejl
        errorMessage = "Data er null eller ikke et objekt";
        console.error("Data error:", dataObject);
      }
    }
  } catch (error) {
    // Håndter fejl ved fetch eller parsing
    errorMessage = error.message;
    console.error("Error fetching football matches:", error);
  }

  // Render match schedule UI
  return (
    <section className="bg-[#000000] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Divider linje */}
        <div className="h-px bg-[#FFF5D6] mb-8" />

        {/* Overskrift */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#E5A702] mb-8 text-center tracking-[0.18em]">
          MATCH SCHEDULE
        </h2>

        {/* Match liste */}
        <div className="space-y-10">
          {matches.length > 0 ? (
            // Render hver kamp
            matches.map((match) => (
              <div key={match.id} className="space-y-4">
                {/* Dato og tid header */}
                <div className="flex items-center justify-center text-[#FFF5D6] text-sm md:text-base font-semibold tracking-[0.18em] uppercase">
                  <span>{(match.day || "").toUpperCase()}</span>
                  <span className="mx-3 h-5 w-px bg-white" />
                  <span>{match.date}</span>
                  <span className="mx-3 h-5 w-px bg-white" />
                  <span>{match.time}</span>
                </div>

                {/* Match banner container */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[600px] aspect-[9/2]">
                    {/* Banner baggrundsbillede */}
                    <Image
                      src="/images/matchsch.png"
                      alt="Match banner"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-contain"
                    />

                    {/* Overlay med hold information */}
                    <div className="absolute inset-0 flex items-center justify-between px-1.5 md:px-4 text-sm md:text-base">
                      {/* Venstre hold: Logo først, derefter navn */}
                      <div className="flex items-center gap-1 md:gap-1.5 min-w-0 flex-1 max-w-[42%]">
                        {/* Vis logo hvis den findes */}
                        {match.team1Logo && (
                          <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center -my-1 z-10">
                            <Image
                              src={match.team1Logo}
                              alt={match.team1Name}
                              fill
                              sizes="48px"
                              className="object-contain p-1.5"
                            />
                          </div>
                        )}
                        {/* Vis flag emoji hvis logo ikke findes */}
                        {match.team1Flag && !match.team1Logo && (
                          <span className="text-2xl md:text-3xl flex-shrink-0">
                            {match.team1Flag}
                          </span>
                        )}
                        {/* Holdnavn */}
                        <span className="font-bold truncate text-white text-[10px] md:text-xs leading-tight">
                          {match.team1Name}
                        </span>
                      </div>

                      {/* Højre hold: Navn først, derefter logo */}
                      <div className="flex items-center gap-1 md:gap-1.5 min-w-0 flex-1 justify-end max-w-[42%]">
                        {/* Holdnavn */}
                        <span className="font-bold truncate text-white text-right text-[10px] md:text-xs leading-tight">
                          {match.team2Name}
                        </span>
                        {/* Vis logo hvis den findes */}
                        {match.team2Logo && (
                          <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center -my-1 z-10">
                            <Image
                              src={match.team2Logo}
                              alt={match.team2Name}
                              fill
                              sizes="48px"
                              className="object-contain p-1.5"
                            />
                          </div>
                        )}
                        {/* Vis flag emoji hvis logo ikke findes */}
                        {match.team2Flag && !match.team2Logo && (
                          <span className="text-2xl md:text-3xl flex-shrink-0">
                            {match.team2Flag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Vis fejlbesked hvis ingen kampe findes
            <div className="text-center py-8">
              <p className="text-[#FFF5D6] text-sm mb-2">
                Ingen kampe fundet i Firebase
              </p>
              <p className="text-[#FFF5D6] text-xs opacity-70 mb-2">
                Tjek at der er data under &quot;footballmatch&quot; i din
                Realtime Database
              </p>
              {/* Vis fejlbesked hvis der er en fejl */}
              {errorMessage && (
                <p className="text-red-400 text-xs mt-2">
                  Fejl: {errorMessage}
                </p>
              )}
              {/* Vis URL for debugging */}
              <p className="text-[#FFF5D6] text-xs opacity-50 mt-2">
                URL: {url}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
