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
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute top-7 left-6 p-2 flex items-center justify-center text-4xl font-bold shadow-lg text-white m-2"
          >
            &larr;
          </button>
        </div>

        <div className="login-page">
          <LogIn />
        </div>
      </div>
    </div>
  );
}
