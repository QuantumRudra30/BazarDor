"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import type { Product } from "./Marquee";

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// 48 -> ৪৮, 2.1 -> ২.১
const toBn = (value: number, maxFractionDigits = 1) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: maxFractionDigits,
    useGrouping: false,
  }).format(value);

const CHANGE_STYLE = {
  up: { color: "text-red-600", arrow: "▲" },
  down: { color: "text-green-600", arrow: "▼" },
  flat: { color: "text-gray-400", arrow: "—" },
} as const;

export default function MarqueeClient({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="w-full bg-yellow-300 py-3 sm:py-5">
        <Marquee speed={40} gradient={false}>
          <span className="mx-6 text-sm font-bold text-black sm:mx-10 sm:text-lg">
            BazarDor — বাজারদরের সর্বশেষ আপডেট
          </span>
        </Marquee>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* pauseOnClick removed so a click opens the product instead of pausing */}
      <Marquee speed={40} pauseOnHover gradient={false} direction="left">
        {products.map((product) => {
          const dir = product.change?.dir ?? "flat";
          const style = CHANGE_STYLE[dir];
          const pct = Math.abs(product.change?.pct ?? 0);

          return (
            <div key={product.id} className="flex items-center whitespace-nowrap">
              <Link
                href={`/products/${product.id}`}
                title={`${product.nameBn} এর বিস্তারিত দেখুন`}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-600 sm:gap-2 sm:px-6 sm:py-3 sm:text-[13px]"
              >
                {/* round emoji icon */}
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-[10px] leading-none sm:h-[22px] sm:w-[22px] sm:text-[12px]">
                  {product.image || product.categoryIcon || "🛒"}
                </span>

                <span className="font-semibold text-gray-700">
                  {product.nameBn}
                </span>

                <span className="font-bold text-gray-900">
                  {toBn(product.today, 2)} টাকা/
                  {UNIT_BN[product.unit] ?? product.unit}
                </span>

                <span
                  className={`flex items-center gap-0.5 font-bold ${style.color}`}
                >
                  <span className="text-[9px] sm:text-[10px]">
                    {style.arrow}
                  </span>
                  {dir !== "flat" && <>{toBn(pct)}%</>}
                </span>
              </Link>

              {/* short vertical divider */}
              <span
                className="h-4 w-px bg-gray-300 sm:h-5"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}