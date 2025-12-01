import Image from "next/image";
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
    <main className="bg-[#000000] text-[#FFF5D6] min-h-screen pt-24 pb-20">
      {/* Fuld-bredde hero billede under navigationen – kun let gradient i bunden */}
      <section className="relative w-full h-[320px]">
        <Image
          src="/images/karaoke.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Kun en lille gradient nederst så overgangen til baggrunden bliver blød */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
      </section>

      {/* Indhold i smal kolonne ligesom på screenshot */}
      <div className="max-w-sm mx-auto px-6">
        {/* Overskrift og tekst */}
        <section className="text-center mt-8 mb-10">
          <h1 className="text-5xl font-bold text-[#E5A702] tracking-[0.18em] mb-3">
            KARAOKE
          </h1>
          <p className="text-xl mb-5">Karaoke Nights at The Golden Lion!</p>
          <p className="text-lg leading-relaxed">
            Grab the mic and shine! Join us for fun-filled karaoke nights where
            everyone can sing along, laugh, and enjoy the vibe. Whether
            you&apos;re a superstar or a first-timer, The Golden Lion is the
            perfect place to let your voice be heard.
          </p>
        </section>

        {/* Divider and sign-up button */}
        <section className="text-center mb-12">
          <div className="h-px w-full bg-[#FFF5D6] mb-10" />

          {/* Sign-up button */}
          <button className="w-full flex items-center justify-center gap-5 bg-[#E5A702] text-black font-semibold py-6 rounded-full text-lg tracking-[0.28em] uppercase">
            Sign Up
            <KaraokeInfoButton />
          </button>

          <div className="h-px w-full bg-[#FFF5D6] mt-10" />
        </section>

        {/* Karaoke queue */}
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
  );
}
