import MarqueeClient from "./MarqueeClient";

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result)
      ? result
      : Array.isArray(result.products)
        ? result.products
        : Array.isArray(result.data)
          ? result.data
          : [];
  } catch (error) {
    console.error("Marquee API Error:", error);
    return [];
  }
}

export default async function MarqueeComponent() {
  const products = await getProducts();
  return <MarqueeClient products={products} />;
}