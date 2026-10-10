"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "./Field";
import SocialButtons from "./SocialButtons";

export default function SignUpForm({ next = "/" }: { next?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));

    if (password !== String(f.get("confirm"))) {
      return toast.error("পাসওয়ার্ড দুটি মেলেনি");
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(f.get("name")),
      email: String(f.get("email")),
      password,
    });
    setLoading(false);

    if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-3">
        <Field label="নাম" name="name" placeholder="আপনার নাম" required />
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" required />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required />
        <Field label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" placeholder="আবার লিখুন" minLength={8} required />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sm h-10 w-full rounded-lg border-none bg-green-600 font-semibold text-white hover:bg-green-700"
        >
          {loading ? <span className="loading loading-spinner loading-xs" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <SocialButtons next={next} />

      <p className="mt-4 text-center text-xs text-base-content/60">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href={`/signin?next=${encodeURIComponent(next)}`}
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}