"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-12 relative overflow-hidden">
        {/* Blurred background */}
        <div 
          className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://thumbs.dreamstime.com/b/e-commerce-online-shopping-digital-marketing-sales-business-technology-concept-137074336.jpg')`,
            filter: 'blur(12px) brightness(0.4)',
            transform: 'scale(1.08)',
          }}
        />
        {/* Dark overlay */}
        <div className="fixed inset-0 bg-black/70 z-[-1]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-8 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-white/10" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Blurred e-commerce background */}
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://thumbs.dreamstime.com/b/e-commerce-online-shopping-digital-marketing-sales-business-technology-concept-137074336.jpg')`,
          filter: 'blur(12px) brightness(0.4)',
          transform: 'scale(1.08)',
        }}
      />

      {/* Dark overlay for better readability on table/glass cards */}
      <div className="fixed inset-0 bg-black/70 z-[-1]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <p className="mt-1 text-[var(--text-muted)]">View and manage all your products.</p>
          </div>
          <Link href="/dashboard/add-product" className="btn-accent inline-flex rounded-xl px-4 py-2 font-semibold text-white">
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl glass-card p-12 text-center bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-[var(--text-muted)]">No products yet. Add your first product to get started.</p>
            <Link href="/dashboard/add-product" className="mt-4 inline-block font-medium text-[var(--accent-start)] hover:underline">Add Product</Link>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl glass-card bg-black/40 backdrop-blur-md border border-white/10">
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full divide-y divide-[var(--border)]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[var(--text-muted)]">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[var(--text-muted)]">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[var(--text-muted)]">Priority</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-[var(--text-muted)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {products.map((p) => (
                    <tr key={p._id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image || PLACEHOLDER_IMAGE} alt="" className="h-12 w-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium">{p.title}</p>
                            <p className="text-sm text-[var(--text-muted)] line-clamp-1">{p.shortDescription}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[var(--accent-start)]">${p.price ?? "0.00"}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{p.priority || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/products/${p._id}`} className="mr-2 inline-block rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--accent-start)]">View</Link>
                        <button onClick={() => handleDelete(p._id, p.title)} className="inline-block rounded-lg border border-red-500/30 px-3 py-1.5 text-sm font-medium text-[var(--danger)] hover:bg-red-500/10">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[var(--border)] md:hidden">
              {products.map((p) => (
                <div key={p._id} className="flex items-center justify-between gap-4 p-4">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <img src={p.image || PLACEHOLDER_IMAGE} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{p.title}</p>
                      <p className="text-sm text-[var(--accent-start)]">${p.price ?? "0.00"}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link href={`/products/${p._id}`} className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium">View</Link>
                    <button onClick={() => handleDelete(p._id, p.title)} className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-[var(--danger)]">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}