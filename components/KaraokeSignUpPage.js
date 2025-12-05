"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// "Sign Up" side til karaoke som matcher mockup
export default function KaraokeSignUpPage() {
  const [phone, setPhone] = useState("");
  const searchParams = useSearchParams();

  const artist = searchParams.get("artist");
  const title = searchParams.get("title");
  const length = searchParams.get("length");

  const hasSong = artist || title || length;

  return (
    <div className="bg-[#000000] text-[#FFF5D6] min-h-screen">
      {/* Hero-billede */}
      <section className="relative w-full h-[260px] mt-0">
        <Image
          src="/images/karaoke-new.png"
          alt="Karaoke at The Golden Lion"
          fill
          priority
          sizes="200vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </section>

      <main className="pt-6 pb-16">
        <div className="max-w-sm mx-auto px-6">
          {/* Overskrift */}
          <section className="mt-2 mb-8 text-center">
            <h1 className="font-heading text-[#E5A702] text-4xl leading-tight">
              <span className="block tracking-[0.16em]">Sign Up for</span>
              <span className="block tracking-[0.16em]">karaoke</span>
            </h1>
          </section>

          {/* Valgt sang */}
          <section className="mb-8">
            <p className="font-heading text-[#E5A702] text-2xl mb-2">
              Chosen song
            </p>
            <div className="bg-[#FFF5D6] text-black rounded-lg px-4 py-3 flex items-center justify-between text-sm">
              <span className="font-body">
                {hasSong
                  ? `${artist ?? ""}${artist && title ? " — " : ""}${
                      title ?? ""
                    }`
                  : "No song selected"}
              </span>
              <span className="ml-4 shrink-0 font-body">
                {hasSong ? length : ""}
              </span>
            </div>
          </section>

          {/* Formular til navn og telefonnummer */}
          <form className="flex flex-col gap-4">
            <div>
              <label
                className="font-heading text-[#E5A702] text-2xl block mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                aria-label="name"
                placeholder="Write here..."
                className="bg-[#FFF5D6] w-full p-4 text-lg rounded-md"
              />
            </div>

            <div>
              <label
                className="font-heading text-[#E5A702] text-2xl block mb-2"
                htmlFor="phone"
              >
                Phone Number:
              </label>
              <div className="flex w-full">
                <div className="bg-[#FFF5D6] text-black rounded-l-md px-4 flex items-center text-lg border-r border-black/10">
                  +45
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  aria-label="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=""
                  className="bg-[#FFF5D6] text-gray-950 text-lg mt-0 block rounded-r-md p-4 w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#E5A702] text-black font-heading text-xl tracking-[0.16em] py-4 rounded-xl"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
