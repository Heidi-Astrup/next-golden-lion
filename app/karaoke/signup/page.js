import Link from "next/link";

export default function KaraokeSignupPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#FFF5D6] pt-24 pb-16 px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-heading font-bold text-[#E5A702] tracking-[0.18em] mb-6">
          KARAOKE SIGN UP
        </h1>

        <p className="text-lg font-body mb-6">
          Her kan du senere tilmelde dig karaoke, vælge din sang og komme i køen.
        </p>

        <p className="text-sm font-body text-[#FFF5D6]/70 mb-8">
          (Denne side er klar til at blive koblet på dit rigtige tilmeldingssystem.)
        </p>

        <Link
          href="/karaoke"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#E5A702] text-[#E5A702] font-body font-medium"
        >
          Tilbage til Karaoke
        </Link>
      </div>
    </main>
  );
}


