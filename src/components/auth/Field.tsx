import type { InputHTMLAttributes } from "react";

export default function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-base-content/80">
        {label}
      </span>
      <input
        {...props}
        className="input input-sm h-10 w-full rounded-lg border-base-300 bg-base-100 text-sm focus:border-green-600 focus:outline-green-600"
      />
    </label>
  );
}