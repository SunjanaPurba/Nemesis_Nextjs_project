import Link from "next/link";
import { getBaseUrl } from "@/lib/api";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop";

async function getProduct(id) {
  try {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/products" className="mt-4 inline-block text-[var(--accent-start)] hover:underline">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = product.image || PLACEHOLDER_IMAGE;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent-start)]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="overflow-hidden rounded-2xl glass-card">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img src={imageUrl} alt={product.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--accent-start)]">${product.price ?? "0.00"}</span>
              {product.priority && (
                <span className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1">{product.priority}</span>
              )}
              {product.createdAt && (
                <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-[var(--text-muted)]">Description</h2>
              <p className="mt-2 whitespace-pre-wrap text-[var(--text-primary)]">
                {product.fullDescription || product.shortDescription || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
