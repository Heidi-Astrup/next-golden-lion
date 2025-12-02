import Image from "next/image";
import Link from "next/link";
import KaraokeInfoButton from "@/components/KaraokeInfoButton";

const demoQueue = [
  { id: 1, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
  { id: 2, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
  { id: 3, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
  { id: 4, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
  { id: 5, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
  { id: 6, name: "Mia", song: "Girl On Fire - Alicia Keys", time: "23:00" },
];

export default function KaraokePage() {
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

      <main className="min-h-screen pt-4 pb-16">
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
              className="w-full flex items-center justify-center gap-5 bg-[#E5A702] text-black font-light py-7 rounded-full text-3xl tracking-[0.1em] uppercase"
            >
              SIGN UP
              <KaraokeInfoButton />
            </Link>

            <div className="h-px w-full bg-[#FFF5D6] mt-10" />
          </section>

          {/* Karaoke Queue liste */}
          <section className="mb-10">
            <h2 className="text-4xl font-bold text-[#E5A702] mb-6 tracking-[0.12em]">
              Karaoke Queue
            </h2>

            <div className="space-y-4">
              {demoQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-4 rounded-full border border-[#3A3A3A] bg-[#0C0C0C]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full border border-[#E5A702] flex items-center justify-center text-xs font-semibold text-[#E5A702]">
                      {item.name}
                    </div>
                    <span className="text-sm truncate">{item.song}</span>
                  </div>
                  <span className="text-sm text-right text-[#FFF5D6]/80">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
