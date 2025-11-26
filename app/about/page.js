export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-5 flex items-center justify-center">
      <main className="text-center max-w-[600px]">
        <h1 className="text-[32px] font-semibold mb-4 tracking-tight text-[#ffffff]">
          About os page
        </h1>
        <p className="text-base text-gray-400 mb-8 leading-relaxed">
          A modern post app built with Next.js 16, featuring Server Components,
          Server Actions, and Firebase integration.
        </p>
      </main>
    </div>
  );
}
