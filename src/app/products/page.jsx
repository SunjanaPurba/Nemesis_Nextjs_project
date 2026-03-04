import { Suspense } from "react";
import { getBaseUrl } from "@/lib/api";
import ProductsClient from "./ProductsClient";

async function getProducts() {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const text = await res.text();
    if (!text) throw new Error("Empty response");
    const products = JSON.parse(text);
    if (Array.isArray(products) && products.length > 0) return products;
    // Fallback: fetch demo products from public API
    const demoRes = await fetch(`${base}/api/products/demo`, { cache: "no-store" });
    if (!demoRes.ok) return [];
    const demo = await demoRes.json();
    return Array.isArray(demo) ? demo : [];
  } catch {
    try {
      const base = await getBaseUrl();
      const demoRes = await fetch(`${base}/api/products/demo`, { cache: "no-store" });
      if (!demoRes.ok) return [];
      const demo = await demoRes.json();
      return Array.isArray(demo) ? demo : [];
    } catch {
      return [];
    }
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Browse our product catalog. Use search or filters to find what you need.
        </p>

        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsClient initialProducts={products} />
        </Suspense>
      </div>
    </main>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-80 animate-pulse rounded-2xl bg-white/10" />
      ))}
    </div>
  );
}
