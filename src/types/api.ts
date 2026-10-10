import type { Product } from "./types";

const BASE = "https://api.abcz.workers.dev/api/bazardor";

// retries when the API is rate limited (429) or temporarily failing (5xx)
async function fetchWithRetry(url: string, retries = 4): Promise<Response> {
  let res!: Response;

  for (let i = 0; i <= retries; i++) {
    res = await fetch(url, { next: { revalidate: 300 } });
    if (res.status !== 429 && res.status < 500) return res;

    const retryAfter = Number(res.headers.get("retry-after")) * 1000;
    const wait = Math.min(retryAfter || 500 * 2 ** i, 8000);
    await new Promise((r) => setTimeout(r, wait));
  }

  return res;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetchWithRetry(`${BASE}/products`);
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  return res.json();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === slug);
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetchWithRetry(`${BASE}/products/${id}`);
  if (res.ok) return res.json();

  // fallback: look it up in the full list
  const all = await getProducts();
  return all.find((p) => String(p.id) === id) ?? null;
}