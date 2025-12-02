"use client";

import { useEffect, useMemo, useState } from "react";

export default function KaraokeSongSearch() {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSongs() {
      const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
      if (!baseUrl) {
        setError("NEXT_PUBLIC_FIREBASE_DATABASE_URL mangler i .env.local");
        return;
      }

      const cleanUrl = baseUrl.trim();
      if (!cleanUrl.startsWith("http")) {
        setError("Ugyldig Firebase URL");
        return;
      }

      const cleanedBase = cleanUrl.endsWith("/")
        ? cleanUrl.slice(0, -1)
        : cleanUrl;
      const url = `${cleanedBase}/karaokesongs.json`;

      try {
        setLoading(true);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data && typeof data === "object") {
          const list = Object.entries(data).map(([id, value]) => ({
            id,
            artist: value.artist || "",
            title: value.title || "",
            album: value.album || "",
          }));
          setSongs(list);
        } else {
          setSongs([]);
        }
      } catch (err) {
        console.error("Error loading karaoke songs", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSongs();
  }, []);

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
      <div className="w-full bg-[#FFF5D6] rounded-[32px] px-6 pt-5 pb-4">
        {/* Søgefelt */}
        <div className="flex items-center mb-4 gap-3">
          <span className="text-2xl text-black/60">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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

        {/* Liste med resultater */}
        {!loading && filteredSongs.length > 0 && (
          <div className="mt-3 space-y-4">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center justify-between border-t border-black/15 pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Placeholder cirkel til billede */}
                  <div className="w-12 h-12 rounded-full bg-black/10" />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="font-body text-base text-black truncate">
                      {song.artist || "Artist"}
                    </span>
                    <span className="font-body text-base text-black truncate">
                      {song.title || "Song title"}
                    </span>
                  </div>
                </div>
                {/* Lille højre kolonne som i designet – her blot rækkenummer */}
                <div className="text-right text-base font-body text-black">
                  <div>{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


