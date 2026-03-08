"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-10">

      <div className="max-w-3xl">

        <h1 className="text-3xl font-semibold">
          Welcome to StudyFlow Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
          This is your dashboard where you can manage study sessions,
          generate AI notes, track progress, and organize your learning.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}