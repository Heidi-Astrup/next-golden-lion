// Footer komponent - viser kontaktinformation, åbningstider og social media links
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-12 px-5">
      <div className="max-w-md mx-auto text-center">
        {/* Top divider line */}
        <div className="h-px w-full bg-[#E5A702] mb-8" />

        {/* Name and Address */}
        <div className="text-[#E5A702] mb-6 space-y-1">
          <p className="text-xl md:text-2xl font-semibold">
            The Golden Lion Pub,
          </p>
          <p className="text-lg md:text-xl">Frederiksgade 76</p>
          <p className="text-lg md:text-xl">8000 Århus C</p>
        </div>

        {/* Contact Information */}
        <div className="text-[#E5A702] mb-6 space-y-2">
          <p className="text-base">Tlf. 86 12 60 35</p>
          <p className="text-base">thegoldenliondk@gmail.com</p>
        </div>

        {/* Opening Hours */}
        <div className="text-[#E5A702] mb-8 space-y-1">
          <p className="text-base">Sunday-Thursday: 12.30-00.00</p>
          <p className="text-base">Friday-Saturday: 12.30-03.00</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.facebook.com/search/top?q=the%20golden%20lion"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <Image
              src="/images/facesort.png"
              alt="Facebook"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
          <Link
            href="https://www.instagram.com/thegoldenliondk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <Image
              src="/images/instasort.png"
              alt="Instagram"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
