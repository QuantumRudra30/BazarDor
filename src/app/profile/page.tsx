import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileView from "@/components/auth/ProfileView";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const { name, email, image } = session.user;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8">
      <h1 className="text-xl font-bold sm:text-2xl">আমার প্রোফাইল</h1>
      <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
        আপনার অ্যাকাউন্টের তথ্য দেখুন ও বদলান।
      </p>
      <ProfileView name={name} email={email} image={image ?? null} />
    </main>
  );
}