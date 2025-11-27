import MatchSchedule from "@/components/MatchSchedule";

export default function Football() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <section className="w-full bg-[#000000] pt-20 pb-8 px-5">
        <div className="max-w-[260px] mx-auto text-center text-[#FFF5D6]">
          <h1 className="text-[28px] font-bold text-[#E5A702] mb-3 tracking-[0.18em]">
            FOOTBALL
          </h1>
          <p className="text-[18px] font-semibold text-[#E5A702] mb-4 leading-snug">
            Watch Football at The Golden Lion!
          </p>
          <p className="text-[13px] mb-2 leading-snug">
            Catch all the big matches with us!
          </p>
          <p className="text-[13px] mb-2 leading-snug">
            Great atmosphere, cold drinks, and screens ready for every kick.
          </p>
          <p className="text-[13px] leading-snug mb-2">
            Whether you&apos;re cheering for your favorite team or just enjoying
            a good game, The Golden Lion is the place to be.
          </p>
          <div className="h-px w-full bg-[#FFF5D6] mt-4" />
        </div>
      </section>

      <MatchSchedule />
    </div>
  );
}
import Image from "next/image";
import { getDatabaseUrl } from "@/lib/firebase";

// Async Server Component – henter kampene fra Realtime Database
export default async function MatchSchedule() {
  const url = `${getDatabaseUrl()}/footballmatch.json`;
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
          {matches.map((match) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
