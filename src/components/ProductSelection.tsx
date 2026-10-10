import type { Product } from "@/types/types";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
  accent?: "up" | "down";
}

export default function ProductSection({ title, subtitle, products, accent }: Props) {
  if (!products.length) return null;
  const color =
    accent === "up" ? "text-error" : accent === "down" ? "text-success" : "";

  return (
    <section className="mb-10">
      <h2 className={`text-lg font-bold sm:text-xl ${color}`}>{title}</h2>
      {subtitle && (
        <p className="mt-1 text-xs text-base-content/60 sm:text-sm">{subtitle}</p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}