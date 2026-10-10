"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/types";
import { formatCount } from "@/types/format";
import ProductCard from "./ProductCard";

type SortKey = "default" | "priceAsc" | "priceDesc" | "rise" | "fall" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "default", label: "ডিফল্ট" },
  { key: "priceAsc", label: "দাম: কম থেকে বেশি" },
  { key: "priceDesc", label: "দাম: বেশি থেকে কম" },
  { key: "rise", label: "বেশি বেড়েছে" },
  { key: "fall", label: "বেশি কমেছে" },
  { key: "name", label: "নাম অনুযায়ী" },
];

// signed change: up = +pct, down = -pct, flat = 0
const signed = (p: Product) =>
  p.change.dir === "up" ? p.change.pct : p.change.dir === "down" ? -p.change.pct : 0;

export default function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "priceAsc":
        return list.sort((a, b) => a.today - b.today);
      case "priceDesc":
        return list.sort((a, b) => b.today - a.today);
      case "rise":
        return list.sort((a, b) => signed(b) - signed(a));
      case "fall":
        return list.sort((a, b) => signed(a) - signed(b));
      case "name":
        return list.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <>
      {/* Sort bar */}
      <section className="mt-4 flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 p-3 sm:p-4">
        <label htmlFor="sort" className="text-sm text-base-content/60">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-sm w-auto rounded-lg text-sm"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </section>

      <p className="mt-4 text-sm text-base-content/60">
        মোট {formatCount(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Cards (same grid as ProductSection) */}
      <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}