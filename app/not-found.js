import Image from "next/image";
import Link from "next/link";
import lion from "@/public/images/drunklion.png";

export default function NotFound() {
  return (
    // Custom 404 page 
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-14 font-heading">
      <div className="w-full max-w-3xl text-center space-y-8">
        <div className="flex justify-center mt-12">
          <Image
            src={lion}
            alt="The Golden Lion mascot after a few pints"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="space-y-6">
          <p className="text-9xl font-semibold text-[#E5A702]">404</p>
          <p className="text-4xl leading-tight">
            Looks like you&apos;ve had one pint too many. This page can&apos;t
            be found.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full bg-[#E5A702] px-12 py-5 text-black text-3xl font-normal shadow-lg hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A702]"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
