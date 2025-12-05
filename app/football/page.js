// Football-siden – viser information om fodbold og en liste med kommende kampe
import Image from "next/image";
import MatchSchedule from "@/components/MatchSchedule";

// Fortæl Next.js at denne route skal være dynamisk (server-rendered),
// fordi vi henter live data fra Firebase med no-store.
//export const dynamic = "force-dynamic";

// Selve React-komponenten for football-siden
export default function Football() {
  return (
    <div className="bg-[#000000] text-[#FFF5D6]">
      {/* Football-billede i headeren – længere nede og med mindre gradient */}
      <section className="relative w-full h-[300px] -mt-4">
        <Image
          src="/images/football.png"
          alt="Football at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        {/* Gradient i bunden af billedet */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="min-h-screen pt-4 pb-16">
        {/* Header sektion med titel og beskrivelse */}
        <section className="w-full px-5 pb-8">
          <div className="max-w-[260px] mx-auto text-center text-[#FFF5D6]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#E5A702] mb-3 tracking-[0.18em] text-left -ml-4 md:-ml-5">
              FOOTBALL
            </h1>
            <p className="text-xl md:text-2xl font-heading font-semibold text-[#E5A702] mb-4 leading-snug">
              Watch Football at The Golden Lion!
            </p>
            <p className="text-base md:text-lg font-body mb-2 leading-snug">
              Catch all the big matches with us!
            </p>
            <p className="text-base md:text-lg font-body mb-2 leading-snug">
              Great atmosphere, cold drinks, and screens ready for every kick.
            </p>
            <p className="text-base md:text-lg font-body leading-snug mb-2">
              Whether you&apos;re cheering for your favorite team or just
              enjoying a good game, The Golden Lion is the place to be.
            </p>
          </div>
        </section>

        {/* Match schedule komponent - viser alle kampe */}
        <MatchSchedule />
      </main>
    </div>
  );
}
