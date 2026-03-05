"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    });

    setLoading(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    if (data?.user?.identities?.length === 0) {
      setMessage({
        type: "error",
        text: "An account with this email already exists.",
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Signed up! Check your email to confirm your account.",
    });
    setEmail("");
    setPassword("");
    setFullName("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow-sm dark:bg-zinc-900 dark:shadow-none sm:px-10">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Sign up
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Create an account with your email.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name (optional)
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {message.text && (
            <p
              className={`text-sm ${
                message.type === "error"
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "Signing up…" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
          >
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
