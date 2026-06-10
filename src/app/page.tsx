export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Production frontend foundation
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Sara Milan
          </h1>
          <p className="max-w-xl text-base leading-7 text-neutral-600">
            This Next.js foundation is ready for the next implementation steps: theme, architecture,
            and API client setup.
          </p>
        </div>
      </section>
    </main>
  );
}
