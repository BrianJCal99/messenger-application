"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
          <Link
            href="sigin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signin
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
