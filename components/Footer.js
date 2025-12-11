// Footer komponent - viser kontaktinformation, åbningstider og social media links
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer data-app-footer className="bg-[#000000] py-14 px-6">
      <div className="max-w-md mx-auto text-center">
        {/* Top divider line */}
        <div className="h-px w-full bg-[#E5A702] mb-8" />

        {/* Name and Address */}
        <div className="text-[#E5A702] mb-7 space-y-2">
          <p className="text-2xl md:text-3xl font-semibold">
            The Golden Lion Pub,
          </p>
          <p className="text-xl md:text-2xl">Frederiksgade 76</p>
          <p className="text-xl md:text-2xl">8000 Århus C</p>
        </div>

        {/* Contact Information */}
        <div className="text-[#E5A702] mb-6 space-y-2">
          <p className="text-lg">Tlf. 86 12 60 35</p>
          <p className="text-lg">thegoldenliondk@gmail.com</p>
        </div>

        {/* Opening Hours */}
        <div className="text-[#E5A702] mb-8 space-y-1">
          <p className="text-lg">Sunday-Thursday: 12.30-00.00</p>
          <p className="text-lg">Friday-Saturday: 12.30-03.00</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6">
          <Link
            href="https://www.facebook.com/thegoldenliondk/"
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
              sizes="48px"
              className="object-contain w-12 h-12"
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
              sizes="48px"
              className="object-contain w-12 h-12"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
