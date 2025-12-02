import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/navigation/Logo";

//import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden overscroll-none">
      <div
        className="h-full overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        {/* full-bleed hero image (pulled up underneath the sticky nav) */}
        <div className="w-full relative h-[50vh] sm:h-[90vh] -mt-20 z-0">
          <Image
            src="/images/facade.jpg"
            alt="Golden Lion Pub Front"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="pb-10 flex justify-center relative z-0">
          <main className="text-center w-full max-w-md">
            <div className="-mt-10">
              <Logo
                imgClassName="h-38 w-38 mx-auto"
                size={40}
                linkClassName="inline-block"
              />
            </div>

            {/* decorative circle behind content */}
            <div
              className="absolute left-1/2 -top-30 -translate-x-1/2
                       w-110 h-110 sm:w-96 sm:h-96 md:w-[520px] md:h-[520px]
                       rounded-full bg-black pointer-events-none -z-10"
            />

            <div className="relative z-10 my-8">
              <h1 className="text-2xl font-heading tracking-tight text-[#ffffff]">
                MORE THAN <br /> JUST A BAR
              </h1>
            </div>
            <div className="px-6">
              <div className="h-px w-full bg-[#E5A702] my-8" />
            </div>

            {/* Weekly schedule carousel */}
            <section className="mt-4">
              <h2 className="text-yellow-400 font-heading text-4xl mb-6 mx-10">
                WEEKLY SCHEDULE
              </h2>

              <div
                role="region"
                aria-label="Weekly schedule carousel"
                className="flex gap-3 overflow-x-auto pl-4 pb-10"
              >
                {[
                  {
                    day: "Monday",
                    title: "Darts",
                    time: "all day",
                    img: "/images/dart.svg",
                  },
                  {
                    day: "Tuesday",
                    title: "Darts",
                    time: "all day",
                    img: "/images/dart.svg",
                  },
                  {
                    day: "Wednesday",
                    title: "Darts",
                    time: "all day",
                    img: "/images/dart.svg",
                  },
                  {
                    day: "Thursday",
                    title: "Karaoke",
                    time: "23:00-03:00",
                    img: "/images/dart.svg",
                  },
                  {
                    day: "Friday",
                    title: "Karaoke",
                    time: "23:00-03:00",
                    img: "/images/karaokeGirls.png",
                  },
                  {
                    day: "Saturday",
                    title: "Karaoke",
                    time: "23:00-03:00",
                    img: "/images/karaokeGirls.png",
                  },
                  {
                    day: "Sunday",
                    title: "Darts",
                    time: "all day",
                    img: "/images/dart.svg",
                  },
                ].map((slot) => (
                  <article key={slot.day} className="min-w-40 snap-start">
                    <div>
                      <div className="text-2xl text-yellow-400 font-heading">
                        {slot.day}
                      </div>
                      <div className="p-3 text-left bg-black/80 rounded-lg overflow-hidden border-2 border-yellow-600">
                        <div className="h-28 relative">
                          <Image
                            src={slot.img}
                            alt={slot.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium mt-3 text-white">
                          {slot.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Time: {slot.time}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Links / sections below schedule */}
            <section>
              {[
                {
                  href: "/karaoke",
                  title: "KARAOKE",
                  desc: "Sing your heart out at our karaoke nights.",
                  img: "/images/karaoke1.webp",
                },
                {
                  href: "/football",
                  title: "FOOTBALL",
                  desc: "Catch live matches on our big screens.",
                  img: "/images/fodbold1.webp",
                },
                {
                  href: "/pubQuiz",
                  title: "PUB QUIZ",
                  desc: "Test your knowledge in our weekly quiz.",
                  img: "/images/question-solid-full.svg",
                },
                {
                  href: "/menu",
                  title: "DART",
                  desc: "Darts in bar — bring your friends.",
                  img: "/images/dart1.webp",
                },
              ].map((card, idx) => {
                const isBlack = idx % 2 === 0;

                // The DART section doesn't have a link; render as a non-linked block
                const isDarts = card.title === "DART" || card.href === "/menu";

                const content = (
                  <div
                    className={`py-6 text-center ${
                      isBlack
                        ? "bg-[#e5a702] text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <div className="w-16 h-16 relative sm:h-[90vh] z-0 mx-auto">
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        className="mx-auto"
                        priority
                      />
                    </div>
                    <div className="font-heading text-4xl mt-4">
                      {card.title}
                    </div>
                    <div className="mb-4 font-body text-2xl">{card.desc}</div>
                    <div
                      className={
                        isBlack
                          ? "inline-block px-8 py-2 bg-black text-white rounded font-heading text-2xl"
                          : "inline-block px-8 py-2 bg-[#e5a702] text-black rounded font-heading text-2xl"
                      }
                    >
                      {isDarts ? "DARTS IN BAR" : "READ MORE"}
                    </div>
                  </div>
                );

                return isDarts ? (
                  <div
                    key={card.title}
                    className="block w-screen overflow-hidden "
                  >
                    {content}
                  </div>
                ) : (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="block w-screen overflow-hidden"
                  >
                    {content}
                  </Link>
                );
              })}
            </section>

            {/* About us */}
            <section className="text-center">
              <div>
                <Image
                  src="/images/pyntIBar.png"
                  alt="Golden Lion Pub Front"
                  width={120}
                  height={80}
                  className="w-screen object-cover mx-auto my-6"
                  priority
                />
              </div>
              <h3 className="text-yellow-400 font-heading text-4xl mb-2">
                ABOUT US
              </h3>
              <p className=" text-gray-300 mb-4 font-body text-2xl">
                The Golden Lion is probably the cosiest and most authentic
                British pub in town. Located in the heart of the city!
              </p>
              <div className="inline-block px-8 py-2 bg-[#e5a702] text-black rounded font-heading text-2xl">
                READ MORE
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
