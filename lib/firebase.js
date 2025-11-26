// Firebase Realtime Database URL helper
export function getDatabaseUrl() {
  const url = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_DATABASE_URL is not set in environment variables"
    );
  }
  // Remove trailing slash if present
  return url.replace(/\/$/, "");
}
