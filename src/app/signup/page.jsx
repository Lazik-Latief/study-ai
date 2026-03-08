"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">

      <div className="w-[380px] bg-[#111827] border border-white/10 rounded-xl p-8 space-y-6">

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join StudyFlow AI
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-2 text-white text-sm font-medium"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        {message && (
          <p className="text-center text-sm text-gray-400">
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </a>
        </p>

      </div>

    </div>
  );
}