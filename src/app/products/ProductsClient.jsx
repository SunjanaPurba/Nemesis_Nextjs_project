"use client";

import { useMemo, useState } from "react";
import ProductCard from "../../../components/ProductCard";

const CATEGORIES = ["All", "High", "Medium", "Low"];

export default function ProductsClient({ initialProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = initialProducts || [];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }
    if (category !== "All" && category) {
      list = list.filter((p) => (p.priority || "").toLowerCase() === category.toLowerCase());
    }
    return list;
  }, [initialProducts, search, category]);

  const inputClass = "block w-full rounded-xl border border-[var(--border)] bg-white/5 px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-start)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-start)]";

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            id="search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
        </div>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${inputClass} sm:w-40`}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full py-16 text-center text-[var(--text-muted)]">
            No products found. Try adjusting your search or filter.
          </p>
        ) : (
          filtered.map((p) => <ProductCard key={p._id} product={p} />)
        )}
      </div>
    </>
  );
}
