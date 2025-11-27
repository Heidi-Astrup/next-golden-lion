// Football page - viser fodbold information og match schedule
import MatchSchedule from "@/components/MatchSchedule";

export default function Football() {
  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Header sektion med titel og beskrivelse */}
      <section className="w-full bg-[#000000] pt-20 pb-8 px-5">
        <div className="max-w-[260px] mx-auto text-center text-[#FFF5D6]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E5A702] mb-3 tracking-[0.18em] text-left -ml-4 md:-ml-5">
            FOOTBALL
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[#E5A702] mb-4 leading-snug">
            Watch Football at The Golden Lion!
          </p>
          <p className="text-base md:text-lg mb-2 leading-snug">
            Catch all the big matches with us!
          </p>
          <p className="text-base md:text-lg mb-2 leading-snug">
            Great atmosphere, cold drinks, and screens ready for every kick.
          </p>
          <p className="text-base md:text-lg leading-snug mb-2">
            Whether you&apos;re cheering for your favorite team or just enjoying
            a good game, The Golden Lion is the place to be.
          </p>
        </div>
      </section>

      {/* Match schedule komponent - viser alle kampe */}
      <MatchSchedule />
    </div>
  );
}
