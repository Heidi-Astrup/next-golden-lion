import KaraokeInfoButton from "@/components/KaraokeInfoButton";
import playDart from "@/public/images/playDart.svg";
import Image from "next/image";
import Link from "next/link";

export default function Dart() {
  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={400}
          src={playDart}
          alt="beer keg"
          className="w-dvh h-auto -z-10 relative"
        />
      </section>

      <div className="min-h-screen pb-10 px-5 flex justify-between">
        <main className="max-w-[600px]">
          <h1 className="font-heading mt-10 text-[#e5a702] text-5xl text-center font-semibold tracking-tight m-auto mb-8">
            Dart
          </h1>
          <h3 className="font-heading text-2xl text-[#e5a702] text-center mb-8">
            Play Dart for FREE at The Golden Lion!
          </h3>
          <p className="text-lg font-body text-[#FFF5D6] text-center mb-8">
            Aarhus is a great city with plenty of entertainment, from mini-golf
            to dice games. But after buying drinks, snacks, or paying an
            entrance fee, you often still have to pay extra to play. Fair
            enough—but who wouldn’t want it for free?
          </p>
          <p className="text-lg font-body text-[#FFF5D6] text-center mb-16">
            At the Golden Lion, you get everything: drinks, snacks, good vibes,
            and FREE darts.
          </p>
          {/* Divider og Sign Up-knap med spørgsmålstegn-popup */}
          <section className="text-center mb-12">
            <div className="h-px w-full bg-[#FFF5D6] mb-8" />

            <Link
              href="/dart/reserve"
              className="w-full flex items-center justify-center gap-3 bg-[#E5A702] text-black font-light py-7 rounded-lg text-3xl tracking-[0.1em] uppercase"
            >
              RESERVE A SPOT
              <KaraokeInfoButton />
            </Link>

            <div className="h-px w-full bg-[#FFF5D6] mt-10" />
          </section>
        </main>
      </div>
    </div>
  );
}
