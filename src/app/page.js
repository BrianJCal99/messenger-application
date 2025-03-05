"use client";

import supabase from "@/lib/supabase";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/chat");
      }
      if(error){
        console.log(error)
      }
    }
    fetchSession();
    setIsClient(true);
  }, [router]);

  if (!isClient) {
    return null;
  }

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
            href="signin"
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
