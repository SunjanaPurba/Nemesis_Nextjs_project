import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Products fetch error:", err);
    return [];
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
        <div
          key={i}
          className="h-80 animate-pulse rounded-2xl bg-white/10"
        />
      ))}
    </div>
  );
}