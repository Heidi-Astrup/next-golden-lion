import DartInfoButton from "@/components/DartInfoButton";
import playDart from "@/public/images/playDart.svg";
import Image from "next/image";
import Link from "next/link";

export default function Dart() {
  return (
    <div className="bg-[#000000] text-[#FFF5D6]">
      <section className="relative w-full h-[300px] mt-0">
        <Image
          src={playDart}
          alt="Dart at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="pt-4 pb-0">
        <div className="max-w-sm mx-auto px-6 text-center">
          <h1 className="font-heading text-[#E5A702] text-6xl md:text-7xl font-semibold tracking-tight mb-8">
            Dart
          </h1>

          <h2 className="font-heading text-3xl md:text-4xl text-[#E5A702] mb-8">
            Play Dart for FREE at The Golden Lion!
          </h2>

          <p className="text-2xl md:text-3xl font-body text-[#FFF5D6] mb-8 leading-relaxed">
            Aarhus is a great city with plenty of entertainment, from mini-golf
            to dice games. But after buying drinks, snacks, or paying an
            entrance fee, you often still have to pay extra to play. Fair
            enough—but who wouldn&apos;t want it for free?
          </p>

          <p className="text-2xl md:text-3xl font-body text-[#FFF5D6] mb-12 leading-relaxed">
            At the Golden Lion, you get everything: drinks, snacks, good vibes,
            and FREE darts.
          </p>

          <div className="h-px w-full bg-[#FFF5D6] mb-8" />

          <Link
            href="/dart/reserve"
            className="w-full flex items-center justify-center gap-3 bg-[#E5A702] text-black font-light py-7 rounded-lg text-3xl tracking-[0.1em] uppercase"
          >
            RESERVE A SPOT
            <DartInfoButton />
          </Link>
        </div>
      </main>
    </div>
  );
}
