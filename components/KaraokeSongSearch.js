"use client";

import {
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRef } from "react";
import Image from "next/image";

// Søge-komponent til karaoke-sange
// forwardRef gør det muligt for forælder-komponenten
// (findsong/page.js) at kalde funktioner inde i denne komponent
const KaraokeSongSearch = forwardRef(function KaraokeSongSearch(
  { onSelectSong },
  ref
) {
  // Alle sange hentet fra Firebase
  const [songs, setSongs] = useState([]);
  // Det brugeren skriver i søgefeltet
  const [query, setQuery] = useState("");
  // Viser om vi er i gang med at hente data
  const [loading, setLoading] = useState(false);
  // Gemmer evt. fejlbesked hvis noget går galt
  const [error, setError] = useState(null);
  // Styrer om listen med sange er åben/lukket
  const [isOpen, setIsOpen] = useState(false);
  // Ref til selve kortet, så vi kan se om der klikkes udenfor
  const containerRef = useRef(null);

  // Hent karaoke-sange fra Firebase når komponenten loader første gang
  useEffect(() => {
    async function loadSongs() {
      const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
      if (!baseUrl) {
        setError("NEXT_PUBLIC_FIREBASE_DATABASE_URL mangler i .env.local");
        return;
      }

      // fjerner kun evt. sidste "/" og bygger stien til /songs.json
      const cleanedBase = baseUrl.replace(/\/$/, "");
      const url = `${cleanedBase}/songs.json`;

      try {
        // Fortæl UI'et at vi er i gang med at hente data
        setLoading(true);

        // Hent data fra Firebase (ingen cache, så vi altid får friske data)
        const res = await fetch(url, { cache: "no-store" });

        // Hvis svaret ikke er OK (fx 404 eller 500), laver vi en fejl
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        // Lav svaret om til JavaScript-objekt
        const data = await res.json();

        if (data && typeof data === "object") {
          // data ligner fx: { "31": {...}, "32": {...} }
          // Vi laver det om til en liste/array vi kan mappe over
          const list = Object.entries(data).map(([id, value]) => ({
            // id'et fra Firebase (31, 32, 33, ...)
            id,
            // Brug feltet fra databasen eller en tom streng hvis det mangler
            artist: value.artist || "",
            title: value.title || "",
            // længde-felt som i din database
            length: value.length || "",
            // albumfeltet indeholder URL til albumbillede
            album: value.album || "",
          }));
          // Gem den færdige liste i state
          setSongs(list);
        } else {
          // Hvis vi ikke fik et objekt tilbage, sætter vi en tom liste
          setSongs([]);
        }
      } catch (err) {
        // Hvis noget går galt (netværk, forkert URL osv.), log fejlen
        console.error("Error loading karaoke songs", err);
        // Gem fejlbeskeden så vi kan vise den i UI'et
        setError(err.message);
      } finally {
        // Uanset om det gik godt eller skidt, er vi færdige med at loade
        setLoading(false);
      }
    }

    loadSongs();
  }, []);

  // Luk og nulstil, når man klikker uden for kortet
  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Gør det muligt for forælder-komponenten at trigge "shuffle"
  useImperativeHandle(ref, () => ({
    // Metoder som forælderen må kalde udefra
    shuffle() {
      // Beskyt mod at kalde shuffle før der er sange
      if (!songs || songs.length === 0) return;
      // Vælg en tilfældig sang i listen
      const randomIndex = Math.floor(Math.random() * songs.length);
      const song = songs[randomIndex];
      // Sæt sangen ind i søgefeltet
      setQuery(`${song.artist} - ${song.title}`);
      // Luk listen, så man kun ser den valgte
      setIsOpen(false);
    },
  }));

  // Beregn en filtreret liste af sange ud fra det brugeren skriver
  const filteredSongs = useMemo(() => {
    // Hvis der ikke er skrevet noget, vis hele listen
    if (!query) return songs;
    const q = query.toLowerCase();
    return songs.filter((s) =>
      `${s.artist} ${s.title}`.toLowerCase().includes(q)
    );
  }, [songs, query]);

  return (
    <section className="mb-8">
      {/* Søgefelt + liste i et kort som på designet */}
      <div
        ref={containerRef}
        className="w-full bg-[#FFF5D6] rounded-[32px] px-6 pt-5 pb-4"
      >
        {/* Søgefelt */}
        <div className="flex items-center mb-4 gap-3">
          <Image
            src="/images/sooge.png"
            alt="Search"
            width={24}
            height={24}
            className="opacity-70"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true); // når man skriver, åbner vi listen
            }}
            // klik i feltet åbner listen og nulstiller søgeteksten,
            // så hele listen vises igen
            onClick={() => {
              setIsOpen(true);
              setQuery("");
            }}
            // fokus (fx ved tab) åbner også listen, men nulstiller ikke automatisk teksten
            onFocus={() => setIsOpen(true)}
            placeholder="Search for a song"
            className="w-full bg-transparent outline-none text-xl font-body text-black placeholder:text-black/50"
          />
        </div>

        {/* Loading / fejl */}
        {loading && (
          <p className="text-sm font-body text-black/60 py-2">Loading songs…</p>
        )}
        {error && !loading && (
          <p className="text-sm font-body text-red-700 py-2">{error}</p>
        )}

        {/* Liste med resultater – begrænset højde så man kan rulle inde i boksen */}
        {!loading && filteredSongs.length > 0 && isOpen && (
          <div className="mt-3 max-h-80 overflow-y-auto pr-2 space-y-4">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center justify-between border-t border-black/15 pt-4 first:border-t-0 first:pt-0 cursor-pointer"
                onClick={() => {
                  // Når man vælger en sang, sætter vi den ind i søgefeltet og lukker listen
                  setQuery(`${song.artist} - ${song.title}`);
                  setIsOpen(false);
                  // Giv sangen tilbage til forælder-komponenten hvis callback findes
                  if (onSelectSong) {
                    onSelectSong(song);
                  }
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Albumbillede fra Firebase (album-feltet) */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-black/10 flex-shrink-0">
                    {song.album ? (
                      <Image
                        src={song.album}
                        alt={`${song.title} album cover`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-body text-base text-black truncate">
                      {song.artist || "Artist"}
                    </span>
                    <span className="font-body text-base text-black truncate">
                      {song.title || "Song title"}
                    </span>
                  </div>
                </div>
                {/* Højre kolonne: vis sangens varighed fra Firebase */}
                <div className="text-right text-base font-body text-black">
                  <div>{song.length || ""}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default KaraokeSongSearch;
