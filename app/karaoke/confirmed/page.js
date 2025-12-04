import Image from "next/image";

// Simpel bekræftelsesside efter karaoke signup
export default function KaraokeConfirmedPage() {
  return (
    <div className="bg-[#000000] text-[#FFF5D6] min-h-screen">
      {/* Hero-billede – samme som på de andre karaoke-sider */}
      <section className="relative w-full h-[260px] mt-4">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        {/* Gradient i bunden af billedet – gjort lidt lavere så mere af billedet ses */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      {/* Mindre bottom-padding så footeren kommer lidt højere op på skærmen */}
      <main className="pt-0 pb-10">
        <div className="max-w-sm mx-auto px-6 text-center">
          <section className="mt-0 mb-14">
            <p className="text-5xl font-heading font-bold text-[#E5A702] leading-snug">
              Great you are
              <br />
              now on the
              <br />
              karaoke list!
            </p>
          </section>

          <section className="mb-6">
            <p className="text-4xl font-heading mb-4">
              Your estimated time
              <br />
              to sing is
            </p>
            <p className="text-[120px] leading-none font-heading text-[#E5A702]">
              00:00
            </p>
          </section>

          <section className="-mt-2">
            <p className="text-2xl font-body font-bold leading-relaxed">
              We&apos;ll call your name when it&apos;s
              <br />
              your turn on stage!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
