"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import KaraokeSongSearch from "@/components/KaraokeSongSearch";

// Denne side viser karaoke "find song" flowet
// Her vælger brugeren en sang, som vi sender videre til signup-siden
export default function KaraokeFindSongPage() {
  // Ref til søge-komponenten, så vi kan kalde dens shuffle()-funktion udefra
  const searchRef = useRef(null);
  // Gemmer aktuelt valgt sang-objekt (artist, title, length, album ...)
  // Når denne er sat, aktiveres PICK SONG-knappen og vi kan sende sangen videre
  const [selectedSong, setSelectedSong] = useState(null);

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
          <section className="mt-4 mb-6">
            <h1 className="text-4xl font-heading font-bold text-[#E5A702] tracking-[0.18em]">
              FIND A SONG
            </h1>
          </section>

          {/* Søgefelt + resultatliste fra Firebase
              onSelectSong kaldes fra KaraokeSongSearch, når brugeren klikker på en sang */}
          <KaraokeSongSearch
            ref={searchRef}
            onSelectSong={(song) => setSelectedSong(song)}
          />

          {/* Shuffle-tekst og knapper – SHUFFLE vælger en tilfældig sang i søge-komponenten */}
          <section className="text-center space-y-6 mt-24">
            <p className="text-xl font-body">
              Don&apos;t know what to sing?
              <br />
              Try the shuffle button!
            </p>

            <button
              className="w-full bg-[#E5A702] text-black font-heading font-light py-3 rounded-lg text-2xl tracking-[0.1em]"
              onClick={() => searchRef.current?.shuffle()}
            >
              SHUFFLE
            </button>

            {/* Hvis der ER valgt en sang, pakker vi knappen ind i et Link med sangen i query-params
                Så signup-siden kan læse den og vise den under "Chosen song" */}
            {selectedSong ? (
              <Link
                href={{
                  pathname: "/karaoke/signup",
                  query: {
                    artist: selectedSong.artist,
                    title: selectedSong.title,
                    length: selectedSong.length,
                  },
                }}
              >
                <button
                  className="w-full bg-[#E5A702] text-black font-heading font-light py-3 rounded-lg text-2xl tracking-[0.1em]"
                >
                  PICK SONG
                </button>
              </Link>
            ) : (
              // Hvis INGEN sang er valgt endnu, viser vi en deaktiveret knap
              // (så brugeren tydeligt skal vælge en sang først)
              <button
                className="w-full bg-[#E5A702] text-black/50 font-heading font-light py-3 rounded-lg text-2xl tracking-[0.1em] cursor-not-allowed"
                disabled
              >
                PICK SONG
              </button>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
