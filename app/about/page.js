import Image from "next/image";
import Link from "next/link";
import staff from "@/public/images/Staffinbar.svg";
import barbillede from "@/public/images/bartender.svg";
import kontrolrapport from "@/public/images/kontrolrapport.png";

export default function About() {
  return (
    <div>
      <section className="bg-linear-to-b from-transparent to-black/95">
        <Image
          width={400}
          height={300}
          src={barbillede}
          alt="bartender in bar"
          className="w-dvh h-auto -z-10 relative border-b-4"
        ></Image>
      </section>
      <div className="min-h-screen pt-8 pb-10 px-5 flex items-center justify-center ">
        <main className="text-center max-w-[600px]">
          <h1 className="text-5xl font-heading text-center font-semibold mb-4 tracking-tight text-[#E5A702]">
            ABOUT US
          </h1>
          <p className="text-4xl font-heading text-center text-[#E5A702] mb-8 leading-tight">
            The cosiest little pub in town
          </p>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            The Golden Lion is probably the cosiest and most authentic British
            pub in town.
          </p>

          <Image
            width={600}
            height={600}
            src={staff}
            alt="Pub Quiz"
            className="mb-8 w-dvh h-auto"
          ></Image>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            Come and enjoy the friendly relaxed atmosphere.
          </p>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            The Golden Lion epitomises the spirit of a traditional British pub.
            A meeting place for people from all walks of life. Friends old and
            new.
          </p>
          <p className="text-2xl font-body text-center text-[#FFF5D6] mb-8">
            A place where your character and ethos are more important than the
            brand of shirt you are wearing or the car you drive.
          </p>
          <h1 className="text-2xl font-heading text-center font-semibold mb-4 mt-22 tracking-tight text-[#FFF5D6]">
            Smiley Report
          </h1>
          <Link href="/kontrolrapport" className="inline-block">
            <Image
              width={200}
              height={200}
              src={kontrolrapport}
              alt="kontrolrapport"
              className="mb-8 w-6/12 h-auto mx-auto transition-transform duration-150 hover:scale-105 focus:scale-105"
            ></Image>
          </Link>
        </main>
      </div>
    </div>
  );
}
