"use client";

import Link from "next/link";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop";

export default function ProductCard({ product }) {
  const imageUrl = product.image || PLACEHOLDER_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl glass-card transition hover:border-[var(--accent-start)]/30 hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.3)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={imageUrl} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-semibold text-[var(--text-primary)] line-clamp-1">{product.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
          {product.shortDescription || product.fullDescription || "No description."}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-[var(--accent-start)]">${product.price ?? "0.00"}</span>
          {product.priority && (
            <span className="rounded-full border border-[var(--border)] bg-white/5 px-2.5 py-0.5 text-xs text-[var(--text-muted)]">
              {product.priority}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product._id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-[var(--accent-start)]/50 bg-[var(--accent-start)]/10 px-4 py-2.5 text-sm font-medium text-[var(--accent-start)] transition hover:bg-[var(--accent-start)]/20"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
