// Firebase client initializer (modular SDK)
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Reads config from NEXT_PUBLIC_ environment variables (exposed to client)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function isLikelyValidApiKey(key) {
  return typeof key === "string" && key.length > 10 && !key.includes("YOUR_");
}

if (!isLikelyValidApiKey(firebaseConfig.apiKey)) {
  console.error("Firebase config looks invalid:", {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  });

  throw new Error(
    "Missing or invalid NEXT_PUBLIC_FIREBASE_API_KEY. Add a .env.local with your Firebase Web app config (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, etc.) and restart dev server."
  );
}

let app;
if (!getApps() || getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
