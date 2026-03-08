"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">

      <div className="w-[380px] bg-[#111827] border border-white/10 rounded-xl p-8 space-y-6">

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Login to StudyFlow AI
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-2 text-white font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {errorMsg && (
          <p className="text-red-400 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>

      </div>

    </div>
  );
}