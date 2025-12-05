"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/navigation/Logo";
import LogIn from "@/components/LogIn";

export default function SignInPage() {
  const router = useRouter();
  const onClose = () => router.back();

  return (
    <div className="login-page">
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {/* logo in top-left (reuse shared Logo component) */}
        <div className="absolute inset-x-0 top-0 mx-auto px-7 py-4 flex items-center justify-between">
          <Logo
            href="/"
            imgClassName="h-15 w-15 m-2"
            size={32}
            linkClassName="inline-block"
          />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute top-7 right-6 p-2 flex items-center justify-center text-3xl font-bold shadow-lg text-white"
          >
            ✕
          </button>
        </div>

        <div className="login-page">
          <LogIn />
        </div>
      </div>
    </div>
  );
}
