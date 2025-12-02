import Image from "next/image";

export default function KaraokeFindSongPage() {
  return (
    <div className="bg-[#000000] text-[#FFF5D6]">
      {/* Samme header-billede som på karaoke-siden */}
      <section className="relative w-full h-[300px] mt-0">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="min-h-screen pt-4 pb-16">
        <div className="max-w-sm mx-auto px-6">
          {/* Overskrift */}
          <section className="mt-4 mb-8">
            <h1 className="text-4xl font-heading font-bold text-[#E5A702] tracking-[0.18em]">
              FIND A SONG
            </h1>
          </section>

          {/* Søgefelt */}
          <section className="mb-20">
            <div className="w-full bg-[#FFF5D6] rounded-full px-7 py-6 flex items-center">
              <input
                type="text"
                placeholder="Search for a song"
                className="w-full bg-transparent outline-none text-base font-body text-black placeholder:text-black/50"
              />
            </div>
          </section>

          {/* Shuffle-tekst og knapper */}
          <section className="text-center space-y-6">
            <p className="text-base font-body">
              Don&apos;t know what to sing?
              <br />
              Try the shuffle button!
            </p>

            <button className="w-full bg-[#E5A702] text-black font-heading font-semibold py-3 rounded-full text-xl tracking-[0.1em]">
              SHUFFLE
            </button>

            <button className="w-full bg-[#E5A702] text-black font-heading font-semibold py-3 rounded-full text-xl tracking-[0.1em]">
              PICK SONG
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
