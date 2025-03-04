"use client";

import supabase from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsClient(true);

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {user ? `Welcome, ${user.user_metadata?.userName}` : ""}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
