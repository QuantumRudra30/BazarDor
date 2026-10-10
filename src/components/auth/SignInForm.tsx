"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ next = "/" }: { next?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });

    setLoading(false);
    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" required />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm h-10 w-full rounded-lg border-none bg-green-600 font-semibold text-white hover:bg-green-700"
        >
          {loading ? <span className="loading loading-spinner loading-xs" /> : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons next={next} />

      <p className="mt-4 text-center text-xs text-base-content/60">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={`/signup?next=${encodeURIComponent(next)}`}
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}