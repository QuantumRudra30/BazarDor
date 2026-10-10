"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-8 w-28 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (!session) {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Link
          href="/signin"
          className="btn btn-ghost btn-xs font-semibold text-gray-800 hover:bg-gray-100 sm:btn-sm"
        >
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-xs rounded-lg border-none bg-green-600 px-3 font-semibold text-white shadow-md shadow-green-600/30 hover:bg-green-700 sm:btn-sm sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            className="size-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm text-white">
            {name.charAt(0)}
          </span>
        )}

        {/* full name: no truncate, wraps to 2 lines if the screen is narrow */}
        <span className="hidden text-sm font-semibold leading-tight sm:block">
          {name}
        </span>
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 mt-2 w-56 rounded-xl border border-base-300 bg-base-100 p-1 shadow-md"
      >
        {/* full name and email also shown inside the menu (works on mobile too) */}
        <li className="pointer-events-none px-3 py-2">
          <span className="block p-0 font-semibold">{name}</span>
          <span className="block p-0 text-xs text-base-content/60 break-all">
            {email}
          </span>
        </li>
        <li>
          <Link href="/profile">আমার প্রোফাইল</Link>
        </li>
        <li>
          <button
            className="text-error"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("সাইন আউট হয়েছে");
                    router.push("/");
                    router.refresh();
                  },
                },
              })
            }
          >
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}