import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        className="mb-8"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={37}
        priority
      />
      <h1 className="text-4xl font-bold">Next.js Post App</h1>
      <p className="text-lg text-center max-w-2xl">
        A modern post app built with Next.js 16, featuring Server Components,
        Server Actions, and Firebase integration.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/posts"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          View Posts
        </Link>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Documentation
        </a>
      </div>
    </main>
  );
}
