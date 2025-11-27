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
        </div>
      </section>

      <MatchSchedule />
    </div>
  );
}
