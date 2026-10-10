"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "./Field";

type Props = { name: string; email: string; image: string | null };

export default function ProfileView({ name, email, image }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newName = String(new FormData(e.currentTarget).get("name")).trim();
    if (!newName) return toast.error("নাম খালি রাখা যাবে না");

    setSaving(true);
    const { error } = await authClient.updateUser({ name: newName });
    setSaving(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.refresh();
  }

  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <div className="mt-5 space-y-4">
      {/* Identity card */}
      <section className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-4">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            className="size-14 rounded-xl object-cover"
          />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
            {name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{name}</p>
          <p className="truncate text-xs text-base-content/60 sm:text-sm">{email}</p>
        </div>

        <button
          onClick={logout}
          className="btn btn-sm btn-outline btn-error rounded-lg font-semibold"
        >
          সাইন আউট
        </button>
      </section>

      {/* Edit card */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-4">
        <h2 className="mb-3 text-sm font-bold">তথ্য</h2>
        <form onSubmit={save} className="space-y-3">
          <Field label="নাম" name="name" defaultValue={name} required />
          <button
            type="submit"
            disabled={saving}
            className="btn btn-sm h-10 w-full rounded-lg border-none bg-green-600 font-semibold text-white hover:bg-green-700"
          >
            {saving ? <span className="loading loading-spinner loading-xs" /> : "আপডেট করুন"}
          </button>
        </form>
      </section>
    </div>
  );
}