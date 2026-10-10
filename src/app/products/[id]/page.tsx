import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { arrow, badgeClass, formatPct, formatPrice, formatUnit } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await getProduct(id).catch(() => null);
  return { title: p ? `${p.nameBn} এর আজকের দাম | বাজার দর` : "বাজার দর" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // Next 15+. On Next 14 use { id: string } and remove "await" below.
}) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();

  const history = [
    { label: "আজ", value: p.today },
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];

  // cheapest market first
  const markets = [...p.markets].sort((a, b) => a.min - b.min);

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/products" className="btn btn-ghost btn-sm">
          ← সব পণ্য
        </Link>
        <Link href={`/category/${p.category}`} className="btn btn-ghost btn-sm">
          {p.categoryNameBn}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {p.image}
        </div>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{p.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {p.categoryNameBn} · {formatUnit(p.unit)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold">{formatPrice(p.today)}</span>
        <span className={`badge badge-soft font-semibold ${badgeClass[p.change.dir]}`}>
          {arrow[p.change.dir]} {formatPct(p.change.dir === "flat" ? 0 : p.change.pct)}
        </span>
      </div>

      <div className="stats stats-vertical sm:stats-horizontal mt-6 w-full border border-base-300 shadow-sm">
        {history.map((h) => (
          <div key={h.label} className="stat">
            <div className="stat-title">{h.label}</div>
            <div className="stat-value text-xl">{formatPrice(h.value)}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-bold">বাজারভিত্তিক দাম</h2>
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>বাজার</th>
              <th>বিভাগ</th>
              <th className="text-right">সর্বনিম্ন</th>
              <th className="text-right">সর্বোচ্চ</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m) => (
              <tr key={m.market}>
                <td>{m.market}</td>
                <td>{m.division}</td>
                <td className="text-right">{formatPrice(m.min)}</td>
                <td className="text-right">{formatPrice(m.max)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}