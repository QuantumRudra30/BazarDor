import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { safeNext } from "@/lib/safe-next";
import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = { title: "অ্যাকাউন্ট তৈরি করুন | বাজার দর" };

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNext((await searchParams).next);

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect(next);

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে দামের বিস্তারিত দেখে নিন।"
    >
      <SignUpForm next={next} />
    </AuthShell>
  );
}