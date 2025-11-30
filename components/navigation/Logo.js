"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo({
  href = "/",
  size = 32,
  linkClassName = "",
  imgClassName = "",
  onClick,
}) {
  return (
    <Link href={href} onClick={onClick} className={linkClassName}>
      <Image
        src="/images/GoldenlionLogo.png"
        alt="Golden Lion"
        width={size}
        height={size}
        className={imgClassName}
      />
    </Link>
  );
}
