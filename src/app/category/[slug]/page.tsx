import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/types/api";
import { formatCount } from "@/types/format";
import ProductGrid from "@/components/ProductGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getProductsByCategory(slug).catch(() => []);
  return {
    title: items[0]
      ? `${items[0].categoryNameBn} এর আজকের দাম | বাজার দর`
      : "বাজার দর",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  if (products.length === 0) notFound();

  const { categoryNameBn, categoryIcon } = products[0];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
      {/* Category header */}
      <section className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-base-200 text-2xl sm:size-14 sm:text-3xl">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{categoryNameBn}</h1>
          <p className="text-xs text-base-content/60 sm:text-sm">
            {formatCount(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <ProductGrid products={products} />
    </main>
  );
}