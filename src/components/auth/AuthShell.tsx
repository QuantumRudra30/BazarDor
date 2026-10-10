import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 py-10">
      <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
      <p className="mt-1 text-center text-xs text-base-content/60 sm:text-sm">
        {subtitle}
      </p>

      <div className="mt-6 w-full rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
        {children}
      </div>

      <Link
        href="/"
        className="mt-5 text-xs text-base-content/60 hover:text-green-700"
      >
        ← হোমে ফিরে যান
      </Link>
    </main>
  );
}