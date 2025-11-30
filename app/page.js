import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/navigation/Logo";

//import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden overscroll-none">
      <div
        className="h-full overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        {/* full-bleed hero image (pulled up underneath the sticky nav) */}
        <div className="w-full relative h-[50vh] sm:h-[90vh] -mt-20 z-0">
          <Image
            src="/images/facade.jpg"
            alt="Golden Lion"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="min-h-screen pb-10 px-5 flex justify-center relative z-0">
          <main className="text-center max-w-max">
            <Logo
              imgClassName="h-30 w-30 m-3 -top-32"
              size={32}
              linkClassName="inline-block"
            />
            {/* decorative circle behind content */}
            <div
              className="absolute left-1/2 -top-32 -translate-x-1/2
                       w-110 h-110 sm:w-96 sm:h-96 md:w-[520px] md:h-[520px]
                       rounded-full bg-black pointer-events-none -z-10"
            />

            <div className="relative z-10">
              <h1 className="text-[32px] font-semibold tracking-tight text-[#ffffff]">
                More than just a bar
              </h1>
              <p className="text-base text-gray-400 mb-8 leading-relaxed">
                A modern post app built with Next.js 16, featuring Server
                Components, Server Actions, and Firebase integration.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-lg font-medium bg-[#ededed] text-black transition-all hover:opacity-85 hover:-translate-y-0.5"
                >
                  About Us
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
