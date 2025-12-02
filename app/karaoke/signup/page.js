"use client";

import Image from "next/image";
import Link from "next/link";
import KaraokeSongSearch from "@/components/KaraokeSongSearch";

// Simpel "Sign Up" side til karaoke
export default function KaraokeSignUpPage() {
  return (
    <div className="bg-[#000000] text-[#FFF5D6] min-h-screen">
      {/* Samme header-billede som de andre karaoke-sider */}
      <section className="relative w-full h-[260px] mt-0">
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

      <main className="pt-6 pb-16">
        <div className="max-w-sm mx-auto px-6">
          {/* Overskrift */}
          <section className="mt-2 mb-4 text-center">
            <h1 className="text-4xl font-heading font-bold text-[#E5A702] tracking-[0.18em]">
              SIGN UP
            </h1>
            <p className="mt-3 text-base font-body">
              Choose your song and get ready to join the karaoke queue.
            </p>
          </section>

          {/* Genbrug sang-søgning til at vælge sang */}
          <KaraokeSongSearch />

          {/* Tilbage-knap */}
          <section className="mt-10 text-center">
            <Link
              href="/karaoke"
              className="inline-block bg-transparent border border-[#E5A702] text-[#E5A702] font-heading font-semibold py-2 px-6 rounded-full tracking-[0.1em] text-sm"
            >
              BACK TO KARAOKE
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}


