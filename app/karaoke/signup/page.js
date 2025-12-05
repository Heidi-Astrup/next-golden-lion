import { Suspense } from "react";
import KaraokeSignUpPage from "@/components/KaraokeSignUpPage";

export default function SignUpPage() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <KaraokeSignUpPage />
    </Suspense>
  );
}
