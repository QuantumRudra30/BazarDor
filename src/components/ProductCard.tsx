import Link from "next/link";
import type { Product } from "@/types/types";
import { arrow, badgeClass, formatPct, formatPrice, formatUnit } from "@/types/format";

export default function ProductCard({ product: p }: { product: Product }) {
  const { dir, pct } = p.change;

  return (
    <Link
      href={`/products/${p.id}`}
      className="card card-border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="card-body gap-3 p-3 sm:p-4">
        {/* emoji + name + unit */}
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl sm:size-12 sm:text-3xl">
            {p.image}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold sm:text-base">{p.nameBn}</h3>
            <p className="text-xs text-base-content/60">{formatUnit(p.unit)}</p>
          </div>
        </div>

        {/* price row */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-base-content/60">আজকের দাম</p>
            <p className="text-base font-bold sm:text-lg">{formatPrice(p.today)}</p>
          </div>
          <span
            className={`badge badge-soft badge-sm whitespace-nowrap font-semibold ${badgeClass[dir]}`}
          >
            {arrow[dir]} {dir === "flat" ? formatPct(0) : formatPct(pct)}
          </span>
        </div>
      </div>
    </Link>
  );
}