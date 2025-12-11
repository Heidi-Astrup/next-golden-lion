import Image from "next/image";
import Link from "next/link";
import kontrolrapport from "@/public/images/kontrolrapport.png";

export default function KontrolrapportPage() {
  return (
    <div className="min-h-screen bg-black text-[#FFF5D6] px-6 pb-12 pt-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.18em] text-[#E5A702]/80">
            Smiley Report
          </p>
          <h1 className="text-4xl font-heading font-semibold text-[#E5A702]">
            Kontrolrapport
          </h1>
          <p className="text-base font-body text-[#FFF5D6]/80">
            Se den seneste fødevarekontrol for The Golden Lion.
          </p>
        </header>

        <div className="bg-[#0C0C0C] border border-[#3A3A3A] rounded-3xl p-4 shadow-lg">
          <Image
            src={kontrolrapport}
            alt="Kontrolrapport for The Golden Lion"
            className="w-full h-auto rounded-2xl"
            priority
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={kontrolrapport.src}
            download
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E5A702] text-black font-heading tracking-[0.12em] text-lg hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A702]"
          >
            Download
          </Link>
          <Link
            href="/pubQuiz"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#E5A702] text-[#E5A702] font-heading tracking-[0.12em] text-lg hover:bg-[#E5A702] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A702]"
          >
            Tilbage til Pub Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
