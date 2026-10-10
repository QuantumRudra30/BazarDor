import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSelection";
import { getProducts } from "@/types/api";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      <Hero />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <ProductSection title="▲ আজ দাম বেড়েছে" products={risers} accent="up" />
        <ProductSection title="▼ আজ দাম কমেছে" products={fallers} accent="down" />
        <ProductSection
          title="সব পণ্য"
          subtitle="গতকালের তুলনায় আজকের দামের পরিবর্তন"
          products={products}
        />
      </main>
    </div>
  );
}