"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Try to load the user's profile from the realtime DB (by uid)
      let profile = null;
      const firebaseDbUrlBase = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
      if (firebaseDbUrlBase && user?.uid) {
        try {
          const url = `${firebaseDbUrlBase}/users/${user.uid}.json`;
          const resp = await fetch(url);
          if (resp.ok) {
            const data = await resp.json();
            if (data) profile = data;
          }
        } catch (e) {
          console.warn("Could not load user profile from DB", e);
        }
      }

      let currentUser;
      if (profile) {
        currentUser = {
          uid: user.uid,
          mail: user.email,
          profile: {
            ...profile,
            hid: profile.hid?.value || profile.hid,
            kid: profile.kid?.value || profile.kid,
          },
        };

        // Update Firebase DB to ensure hid and kid are stored as primitives
        if (firebaseDbUrlBase && user?.uid) {
          const url = `${firebaseDbUrlBase}/users/${user.uid}.json`;
          try {
            await fetch(url, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                hid: currentUser.profile.hid,
                kid: currentUser.profile.kid,
              }),
            });
          } catch (err) {
            console.warn(
              "Failed to update Firebase database during login:",
              err
            );
          }
        }
      } else {
        // fallback: store minimal info so UI still reacts
        currentUser = { uid: user.uid, mail: user.email };
      }

      // store in localStorage so other parts of app can read it
      try {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } catch (err) {
        console.warn("Could not write currentUser to localStorage", err);
      }

      // navigate to home on success
      router.push("/");
    } catch (err) {
      let code = err.code || err.message || "Login failed";
      if (typeof code === "string") {
        code = code.replaceAll("-", " ").replaceAll("auth/", "");
      }
      if (code === "invalid credential" || code === "wrong password") {
        code = "Forkert adgangskode eller email. Prøv igen.";
      } else if (code === "user not found") {
        code = "Brugeren blev ikke fundet. Tjek din email.";
      }
      setError(code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-start justify-center py-20 w-screen bg-black text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-transparent text-center"
      >
        <div className="mb-6">
          {/* Example logo - reuse public image */}
          <Image
            src="/images/GoldenlionLogo.png"
            alt="Logo"
            width={96}
            height={96}
            className="mx-auto"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-yellow-400 mb-6">STAFF LOGIN</h1>

        <label className="block mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full px-4 py-3 text-white"
          />
        </label>

        <label className="block mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-full px-4 py-3 text-white"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full px-6 py-3 bg-[#f8efdc] text-black font-medium mb-2"
          disabled={loading}
        >
          {loading ? "Logging in…" : "Log på"}
        </button>

        {error && <div className="text-sm text-red-400 mt-3">{error}</div>}

        <p className="text-xs text-gray-400 mt-6">
          Har du glemt din adgangskode?
        </p>
      </form>
    </div>
  );
}
