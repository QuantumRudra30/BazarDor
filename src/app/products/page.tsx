import { getProducts } from "@/types/api";
import { formatCount } from "@/types/format";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic"; // fetch at request time, not during build

export const metadata = {
  title: "সব পণ্যের আজকের দাম | বাজার দর",
  description: "সব পণ্যের আজকের দাম ও আগের তুলনায় পরিবর্তন",
};

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-6">
        <h1 className="text-xl font-bold sm:text-2xl">সব পণ্যের দাম</h1>
        <p className="text-xs text-base-content/60 sm:text-sm">
          মোট {formatCount(products.length)}টি পণ্য · যেকোনো পণ্যে ক্লিক করে বিস্তারিত দেখুন
        </p>
      </section>
      <ProductGrid products={products} />
    </main>
  );
}