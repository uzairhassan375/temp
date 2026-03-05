"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        age: age.trim() === "" ? null : Number(age),
        class_name: className.trim(),
      }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMessage({ type: "error", text: data.error || "Failed to save" });
      return;
    }

    setMessage({ type: "success", text: "Saved successfully." });
    setName("");
    setAge("");
    setClassName("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow-sm dark:bg-zinc-900 dark:shadow-none sm:px-10">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Add student
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Enter name, age and class. Data is stored in Supabase.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              required
              min={1}
              max={149}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Class
            </label>
            <input
              id="class"
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              placeholder="e.g. 10th Grade"
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
            {loading ? "Saving…" : "Save"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
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
