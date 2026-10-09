import type { Product } from "./types";

const BASE = "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE}/products/${id}`, { next: { revalidate: 300 } });
  if (res.ok) return res.json();

  // fallback: look it up in the full list
  const all = await getProducts();
  return all.find((p) => String(p.id) === id) ?? null;
}